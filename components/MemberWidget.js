import { Image, StyleSheet, View, Text } from "react-native";

import CoinIcon from "./icons/CoinIcon";
import EditIcon from "./icons/EditIcon";
import TrashIcon from "./icons/TrashIcon";
import { useRoute } from "@react-navigation/native";
import Colors from "../constants/colors";
import { findUserById, updateUserMetadata } from "../services/apiAdmin";
import { useEffect, useState } from "react";
import RequestModal from "./RequestModal";
import { updateStatus } from "../services/apiJoinRequests";
import { useAllGroups } from "../hooks/useAllGroups";

function MemberWidget({ user, requests }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [group, setGroup] = useState();
    const [status, setStatus] = useState();
    const {groups, isLoading} = useAllGroups();
    const [groupName, setGroupName] = useState("");
    if (user?.app_metadata?.role == "super-admin") return;
    console.log(user.created_at);
    useEffect(() => {
        const groupData = groups.find((group) => group.id === user.user_metadata.group);
        setGroupName(groupData?.name);
    }, [groups]);

    handleDelete = async () => {

    }

    // useEffect(() => {
    //     if (user) {
    //         setCurrentUser(user);
    //     }
    //     if (requests) {
    //         const fetchUser = async () => {
    //             try {
    //                 const pendingUser = await findUserById({
    //                     id: requests.userId,
    //                 });
    //                 setCurrentUser(pendingUser);
    //             } catch (error) {
    //                 console.error("Error fetching requests: ", error);
    //             }
    //         };
    //         fetchUser();
    //     }
    // }, [user, requests]);

    // if (!currentUser) return null;

    // const onModalClose = async (action) => {
    //     if (!action) {
    //         setIsModalVisible(false);
    //         return;
    //     }
    //     let newStatus = "";
    //     let newGroup = "";
    //     if (action === "Accept") {
    //         newStatus = "Accepted";
    //         newGroup = requests.groupId;
    //     } else {
    //         newStatus = "Rejected";
    //     }

    //     console.log("status of joining: ", newStatus);
        
    //     try {
    //         console.log("status: ", newStatus);
    //         console.log("id: ", requests.id);
    //         console.log("currentuser: ", currentUser.id);
    //         await updateStatus({ newStatus: newStatus, id: requests.id });
    //         await updateUserMetadata({ id: currentUser.id, groupId: newGroup, ambassador: false });
    //         await updateMemberCount
    //         setStatus(newStatus);
    //         setGroup(newGroup);
    //     } catch (error) {
    //         console.error("Error updating user metadata: ", error);
    //     }

    //     setIsModalVisible(false); // Ensure modal closes for all cases
    // };

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={
                    user.user_metadata.avatar
                        ? { uri: user.user_metadata.avatar }
                        : null
                }
            />
            <View style={styles.textContainer}>
                <Text style={styles.name}>
                    {user.user_metadata.userName}
                </Text>
                <Text style={styles.middleText}>{user.email}</Text>
                <Text style={styles.middleText}>
                    Group: {!isLoading && groupName}
                </Text>
                {user.user_metadata.ambassador && <Text style={styles.year}>Ambassador</Text> }
            </View>
            <View style={styles.icons}>
                <EditIcon onPress={() => setIsModalVisible(true)} />
                <TrashIcon width="18" height="20" onPress={handleDelete}/>
            </View>
            {/* <RequestModal
                visible={isModalVisible}
                onRequestClose={onModalClose}
                name={user.user_metadata.userName}
                message={requests.message}
            /> */}
        </View>
    );
}

export default MemberWidget;

const styles = StyleSheet.create({
    container: {
        width: 284,
        height: 74,
        backgroundColor: "#FFFFFF",
        //marginTop: 43,
        marginBottom: 16,
        marginLeft: 47,
        marginRight: 44.5,
        borderRadius: 10,
        shadowColor: "#00000040",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
        flexDirection: "row",
    },
    textContainer: {
        flexDirection: "column",
        width: 140,
        gap: 3,
    },
    image: {
        width: 60,
        height: 60,
        backgroundColor: Colors.impact,
        borderRadius: 21,
        marginRight: 10,
        alignSelf: "center",
    },
    icons: {
        alignSelf: "center",
        flex: 1,
        flexDirection: "row",
        gap: 20,
    },
    name: {
        fontFamily: "RalewayBold",
        fontSize: 15,
        color: Colors.primary1,
    },
    middleText: {
        fontFamily: "RalewayMedium",
        fontSize: 13,
        color: Colors.primary1,
    },
    year: {
        fontFamily: "RalewayLight",
        fontSize: 12,
        color: Colors.primary1,
    },
});
