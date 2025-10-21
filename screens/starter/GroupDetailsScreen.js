import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import Colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import MemberIcon from "../../components/icons/MemberIcon";
import SmallPinIcon from "../../components/icons/SmallPinIcon";
import { updateGroup, updateUser } from "../../services/apiAuth";
import { useEffect, useMemo, useState } from "react";
import MessageModal from "../../components/MessageModal";
import { addJoinRequest } from "../../services/apiJoinRequests";
import { useUser } from "../../hooks/auth/useUser";
import { findUserById, updateUserMetadata } from "../../services/apiAdmin";
import MainButton from "../../components/MainButton";
import { useUpdateGroupStatus } from "../../hooks/admin/useUpdateGroupStatus";
import { useAllMembers } from "../../hooks/useAllMembers";
import { updateMemberCount } from "../../services/apiGroups";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateUser } from "../../hooks/auth/useUpdateUser";
import { useUpdateUserGroup } from "../../hooks/auth/useUpdateUserGroup";
import { useResponsive } from "../../utils/responsive";
import { TouchableOpacity, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PinkBackArrow from "../../components/icons/PinkBackArrow"; // adjust path if needed


function GroupDetailsScreen({ route }) {
    const insets = useSafeAreaInsets(); // near top, after hooks

    const { width, height, isTablet, isWeb, horizontalScale: hs, verticalScale: vs, moderateScale: ms, scaleFont } = useResponsive();

    const dynamicStyles = useMemo(() => {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: "white",
            },
            title: {
                fontWeight: "bold",
                textTransform: "uppercase",
                alignSelf: "center",
                fontFamily: "Raleway_700Bold",
                fontSize: 24,
                color: Colors.primary1,
                marginTop: vs(10),
                // marginBottom: vs(80),
            },
            image: {
                height: isWeb ? Math.round(height * 0.5) : vs(350),
                width: isWeb ? Math.round(width * 0.7) : Math.round(width),
                resizeMode: "cover",
                alignSelf: "center"
            },
            header: {
                fontFamily: "Raleway_700Bold",
                fontSize: scaleFont(18),
                color: Colors.primary2,
                marginLeft: hs(23),
            },
            content: {
                fontFamily: "Raleway_400Regular",
                fontSize: 15,
                color: Colors.primary2,
                paddingTop: vs(14),
                marginLeft: hs(33),
                marginRight: hs(4),
            },
            buttonContainer: {
                alignSelf: "flex-end",
                marginRight: hs(33),
                flexDirection: "row",
                gap: hs(10),
                paddingBottom: vs(10),
            },
            infoContainer: {
                flexDirection: "row",
                // position: "absolute",
                // top: 320,
                // left: 227,
                // width: 108,
                gap: hs(50),
                paddingLeft: hs(10)
            },
            ambassadorContainer: {
                // position: "absolute",
                // top: 320,
                // left: 30,
                flexDirection: "row",
                paddingTop: 5,
                gap: 5,
                paddingLeft: hs(10)
            },
            info: {
                fontFamily: "Raleway_400Regular",
                fontSize: 15,
                color: Colors.primary2,
                alignSelf: "center"
            },
            name: {
                fontFamily: "Raleway_700Bold",
                fontSize: 15, 
                color: Colors.primary2,
                paddingLeft: 10,
                paddingTop: 5,
            },
            row: {
                flexDirection: "row",
                gap: 20,
            },
            profileImage: {
                width: 40,
                height: 40,
                backgroundColor: Colors.primary1,
                borderRadius: 21,
            }
        }, [width, height, isTablet, hs, vs, ms, scaleFont]);
    })

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [ ambassadorData, setAmbassadorData ] = useState();
    const navigation = useNavigation();
    const { group } = route.params;
    const { updateGroupStatus, isLoading } = useUpdateGroupStatus();
    const { members, isLoading: membersLoading } = useAllMembers();

    const { user } = useUser();
    const { updateGroup } = useUpdateUserGroup();
    useEffect(() => {
        const fetchAmbassador = async () => {
            try {
                const data = await findUserById({ id: group.ambassadorId });
                setAmbassadorData(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        // FIRST check if members exists and has data
        if (members && members.length > 0) {
            const ambassador = members.find(member => member.id === group.ambassadorId);
            if (ambassador) {
                setAmbassadorData(ambassador);
            } else {
                // ONLY fetch if ambassador not found in existing members
                fetchAmbassador();
            }
        } else {
            // If no members data exists at all, then fetch
            fetchAmbassador();
        }
    }, [members, group.ambassadorId]);

    const submitHandler = async () => {
        // if (!message) {
        //     setErrorMessage("Please write a message to introduce yourself.");
        //     return;
        // }

        try {
            // setErrorMessage("");
            // setIsModalVisible(false);
            // do not delete this code this is the actual logic, that i want to skip for now
            // await updateGroup({ group: "Pending" });
            // const data = await addJoinRequest({
            //     userId: user.user.id,
            //     groupId: group.id,
            //     message,
            // });

            // here we need to update group and user data
            await updateUserMetadata({ id: user.user.id, groupId: group.id, ambassador: false });

            updateGroup({ group: group.id, userId: user.user.id });

            await updateMemberCount({ id: group.id, count: group.numberOfMem + 1 });

            navigation.reset({
                index: 0,
                routes: [
                    {
                        name: "InApp",
                    },
                ],
            });
        } catch (error) {
            setErrorMessage("Something went wrong. Please try again later.");
        }
    };
    
    const handlePress = async (action) => {
        try {
            if (action == "approve") {
                const data = await updateUserMetadata({ id: ambassadorData.id, groupId: group.id, ambassador: true});
                // await updateStatus({ id: group.id, status: action });
                updateGroupStatus({ id: group.id, status: action });
                navigation.goBack();
                
            } else if (action == "reject") {
                updateGroupStatus({ id: group.id, status: action });
                const data = await updateUserMetadata({ id: ambassadorData.id, groupId: null, ambassador: false});
                navigation.goBack();
            }
        } catch(error) {
            console.error("Erron handling press: ", error);
        }
    }
    
    const closeModal = () => {
        setIsModalVisible(false); 
    };

    return (
        <ScrollView style={dynamicStyles.container}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                hitSlop={{ top: 12, left: 12, right: 12, bottom: 12 }}
                style={{
                    position: "absolute",
                    left: 12,
                    top: Platform.OS === "android" ? 12 + insets.top : 12 + insets.top, // safe for web/ios/android
                    zIndex: 20,
                    padding: 6,
                }}
            >
                <PinkBackArrow />
            </TouchableOpacity>
            <Image style={dynamicStyles.image} source={{ uri: group.avatar }} />
            <Text style={dynamicStyles.title}>{group.name}</Text>
            {ambassadorData && 
                <View style={dynamicStyles.ambassadorContainer}>
                    <Image source={{ uri: ambassadorData.user_metadata.avatar }} style={dynamicStyles.profileImage}/>
                    <View>
                        <Text style={dynamicStyles.name}>{ambassadorData.user_metadata.userName}</Text>
                        
                    </View>
                    
                </View>
            }
            <View style={dynamicStyles.infoContainer}>
                <View style={dynamicStyles.row}>
                    <View style={{ marginTop: 10 }}>
                        <SmallPinIcon />
                    </View>
                    <Text style={dynamicStyles.info}>{group.location}</Text>
                </View>
                <View style={dynamicStyles.row}>
                    <MemberIcon />
                    <Text style={dynamicStyles.info}>{group.numberOfMem}</Text>
                </View>
            </View>
             <View>
                <Text style={dynamicStyles.content}>{group.description}</Text>
                {/* <Text style={[styles.header, { marginTop: 10 }]}>Rules</Text> */}
                <ScrollView>
                    {group.rules.map((rule, index) => (
                        <Text key={index} style={[dynamicStyles.content]}>
                            • {rule}
                        </Text>
                    ))}
                </ScrollView>
            </View>
            <View style={dynamicStyles.buttonContainer}>
                {group.status == "pending" &&
                    (
                        <>
                        <MainButton
                            title="APPROVE"
                            onPress={() => handlePress("approve")}
                              disabled={isLoading}
                            variant="primary"
                        />
                        <MainButton
                            title="REJECT"
                            onPress={() => handlePress("reject")}
                            variant="primary"
                        />
                        </>
                    )
                }
                {user.user.app_metadata.role != "super-admin" && (
                        <MainButton
                            title="JOIN"
                            // title="REQUEST TO JOIN"
                            onPress={submitHandler}
                            // onPress={() => setIsModalVisible(true)}
                            variant="primary"
                        />
                    )
                }
            </View> 
    
            {/* <MessageModal
                visible={isModalVisible}
                onRequestClose={submitHandler}
                errorMessage={errorMessage}
                onBackdropPress={closeModal}
                onMessageChange={setMessage}
                joinRequest={true}
            /> */}
        </ScrollView>
    );
}

export default GroupDetailsScreen;