import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import Colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import MemberIcon from "../../components/icons/MemberIcon";
import SmallPinIcon from "../../components/icons/SmallPinIcon";
import { updateGroup } from "../../services/apiAuth";
import { useEffect, useState } from "react";
import MessageModal from "../../components/MessageModal";
import { addJoinRequest } from "../../services/apiJoinRequests";
import { useUser } from "../../hooks/auth/useUser";
import { findUserByEmail, findUserById, updateUserMetadata } from "../../services/apiAdmin";
import { updateStatus } from "../../services/apiGroups";
import MainButton from "../../components/MainButton";

function GroupDetailsScreen({ route }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [ ambassadorData, setAmbassadorData ] = useState();
    const navigation = useNavigation();
    const { group } = route.params;

    console.log("Group:", group);
    const { user } = useUser();

      useEffect(() => {
            const fetchAmbassador = async () => {
                try {
                    const data = await findUserById({ id: group.ambassadorId });
                    setAmbassadorData(data);
                    console.log("Full Data: ", data);
                    console.log("Data: ", data.user.user_metadata.userName);
                } catch (error) {
                    console.error("Error fetching data: ", error);
                }
            };
    
            fetchAmbassador();

        }, []);

    const submitHandler = async () => {
        if (!message) {
            setErrorMessage("Please write a message to introduce yourself.");
            return;
        }

        try {
            setErrorMessage("");
            setIsModalVisible(false);
            await updateGroup({ group: "Pending" });
            console.log(user.user.id, group.id, message);
            const data = await addJoinRequest({
                userId: user.user.id,
                groupId: group.id,
                message,
            });
            console.log("yes");
            console.log("DATA: ", data);
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
                console.log(ambassadorData.id);
                const data = await updateUserMetadata({ id: ambassadorData.id, groupId: group.id, ambassador: true});
                console.log("group data: ", data);
                await updateStatus({ id: group.id, status: action });
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
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: group.avatar }} />
            <Text style={styles.title}>{group.name}</Text>
            <Text style={styles.header}>Description</Text>
            <View style={{ height: 270 }}>
                <Text style={styles.content}>{group.description}</Text>
                <Text style={[styles.header, { marginTop: 10 }]}>Rules</Text>
                <ScrollView>
                    {group.rules.map((rule, index) => (
                        <Text key={index} style={[styles.content]}>
                            • {rule}
                        </Text>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.buttonContainer}>
                {group.status == "pending" ? 
                    (
                        <>
                        <MainButton
                            title="APPROVE"
                            onPress={() => handlePress("approve")}
                            variant="primary"
                        />
                        <MainButton
                            title="REJECT"
                            onPress={() => handlePress("reject")}
                            variant="primary"
                        />
                        </>
                    ) : (
                        <MainButton
                            title="REQUEST TO JOIN"
                            onPress={() => setIsModalVisible(true)}
                            variant="primary"
                        />
                    )
                }
            </View> 
            {ambassadorData && 
                <View style={styles.ambassadorContainer}>
                    <Image source={{ uri: ambassadorData.user_metadata.avatar }} style={styles.profileImage}/>
                    <View>
                        <Text style={styles.name}>{ambassadorData.user_metadata.userName}</Text>
                        <Text style={styles.info}>{ambassadorData.email}</Text>
                    </View>
                    
                </View>
            }
            <View style={styles.infoContainer}>
                <View style={styles.row}>
                    <View style={{ marginTop: 10 }}>
                        <SmallPinIcon />
                    </View>
                    <Text style={styles.info}>{group.location}</Text>
                </View>
                <View style={styles.row}>
                    <MemberIcon />
                    <Text style={styles.info}>{group.numberOfMem}</Text>
                </View>
            </View>
            <MessageModal
                visible={isModalVisible}
                onRequestClose={submitHandler}
                errorMessage={errorMessage}
                onBackdropPress={closeModal}
                onMessageChange={setMessage}
                joinRequest={true}
            />
        </View>
    );
}

export default GroupDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    title: {
        fontWeight: "bold",
        marginBottom: 10,
        textTransform: "uppercase",
        alignSelf: "center",
        fontFamily: "Raleway_700Bold",
        fontSize: 30,
        color: Colors.primary1,
        marginTop: 10,
        marginBottom: 80,
    },
    image: {
        height: "38%",
        width: "100%",
    },
    header: {
        fontFamily: "Raleway_700Bold",
        fontSize: 18,
        color: Colors.primary2,
        marginLeft: 23,
    },
    content: {
        fontFamily: "Raleway_400Regular",
        fontSize: 15,
        color: Colors.primary2,
        paddingTop: 14,
        marginLeft: 33,
        marginRight: 4,
    },
    buttonContainer: {
        alignItems: "flex-end",
        marginRight: 30,
        position: "absolute",
        flexDirection: "row",
        gap: 10,
        bottom: 30,
        right: 0,
    },
    infoContainer: {
        flexDirection: "column",
        position: "absolute",
        top: 340,
        left: 227,
        width: 108,
        // zIndex: 5,
        gap: 10,
    },
    ambassadorContainer: {
        position: "absolute",
        top: 340,
        left: 30,
      //  left: 227,
        flexDirection: "row",
        paddingTop: 5,
        gap: 5,
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
});
