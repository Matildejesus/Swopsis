import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import EditIcon from "./icons/EditIcon";
import TrashIcon from "./icons/TrashIcon";
import { useRoute } from "@react-navigation/native";
import Colors from "../constants/colors";
import { findUserById, updateUserCoin, updateUserMetadata } from "../services/apiAdmin";
import { useEffect, useState } from "react";
import RequestModal from "./RequestModal";
import { updateStatus } from "../services/apiJoinRequests";
import { useAllGroups } from "../hooks/useAllGroups";
import CoinIcon from "./icons/CoinIcon";
import { useUser } from "../hooks/auth/useUser";
import DataDisplayModal from "./adminWidget/modals/DataDIsplayModal";
import { useUpdateUserCoins } from "../hooks/admin/useUpdateUserCoins";
import { updateMemberCount } from "../services/apiGroups";

function MemberWidget({ user, requests, memberCount }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCoinModalVisible, setIsCoinModalVisible] = useState(false); 
    const [currentUser, setCurrentUser] = useState(null);
    const [group, setGroup] = useState();
    const [status, setStatus] = useState();
    const {groups, isLoading} = useAllGroups();
    const [groupName, setGroupName] = useState("");
    const { user: onScreenUser} = useUser();
    const { updateUserCoins, isLoading: coinsLoading, isSuccess} = useUpdateUserCoins();

    if (user?.app_metadata?.role == "super-admin") return;

    useEffect(() => {
        const groupData = groups.find((group) => group.id === user.user_metadata.group);
        setGroupName(groupData?.name);
    }, [groups]);

    useEffect(() => {
        if (user) {
            setCurrentUser(user);
        }
    }, [user, requests]);

    if (!currentUser) return null;

    const onModalClose = async (action) => {
        if (!action) {
            setIsModalVisible(false);
            return;
        }
        let newStatus = "";
        let newGroup = "";
        if (action === "Accept") {
            newStatus = "Accepted";
            newGroup = requests.groupId;
        } else {
            newStatus = "Rejected";
        }

        
        try {
            await updateStatus({ newStatus: newStatus, id: requests.id });
            if (newStatus == "Accepted") {
                await updateUserMetadata({ id: currentUser.id, groupId: newGroup, ambassador: false });
                await updateMemberCount({id: requests.id, count: memberCount});
            } else {
                await updateUserMetadata({ id: currentUser.id, groupId: "", ambassador: false });
            }
            setStatus(newStatus);
            setGroup(newGroup);
        } catch (error) {
            console.error("Error updating user metadata: ", error);
        }

        setIsModalVisible(false); 
    };

    const onCoinModalClose = async (action, newCoins) => {
        setIsCoinModalVisible(false);
        
        if (action === "Update" && newCoins !== undefined) {
            updateUserCoins({ id: user.id , coins: newCoins});
        }
    };

    const handleEditIcon = () => {
        if (onScreenUser.user.app_metadata.role == "super-admin" || onScreenUser.user.user_metadata.ambassador && user.user_metadata.group !== "Pending"){
            setIsCoinModalVisible(true);
        } else {
            setIsModalVisible(true);
        }
    }

    return (
        <>
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
                {onScreenUser.user.app_metadata.role == "super-admin" ? (
                    <Text style={styles.middleText}>
                        Group: {!isLoading && groupName}
                    </Text>) : (<>
                        {/* <Text style={styles.middleText}>{user.user_metadata.totalCarbon} Tonnes of CO2</Text>
                        <Text style={styles.middleText}></Text> */}
                    </>)
                }
                {user.user_metadata.ambassador && <Text style={styles.year}>Ambassador</Text> }
            </View>
            <View style={styles.icons}>
                <View style={styles.coins}>
                    <Text style={styles.middleText}>{user.user_metadata.coins}</Text>
                    <CoinIcon screen="members"/>
                </View>
                <EditIcon onPress={handleEditIcon} />
                <TrashIcon width="18" height="20"/>
            </View>
            {requests && 
                <RequestModal
                    visible={isModalVisible}
                    onRequestClose={onModalClose}
                    name={user.user_metadata.userName}
                    message={requests.message}
                />
            }
            
            <DataDisplayModal
                visible={isCoinModalVisible}
                onRequestClose={onCoinModalClose}
                user={user.user_metadata}
            />
            
        </View>
        {user.user_metadata.group === "Pending" && (
            <Text style={styles.pendingBadge}>Pending</Text>
        )}
        </>
    );
}

export default MemberWidget;

const styles = StyleSheet.create({
    container: {
        width: 310,
        height: 74,
        backgroundColor: "#FFFFFF",
        marginTop: 16,
        // marginBottom: 16,
        marginLeft: 40,
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
        width: 120,
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
        // marginLeft: 20,
    },
    coins: {
        alignSelf: "center",
        flex: 1,
        flexDirection: "row",
        gap: 5,
    },
    name: {
        fontFamily: "Raleway_700Bold",
        fontSize: 15,
        color: Colors.primary1,
    },
    middleText: {
        fontFamily: "Raleway_500Medium",
        fontSize: 13,
        color: Colors.primary1,
    },
    year: {
        fontFamily: "Raleway_300Light",
        fontSize: 12,
        color: Colors.primary1,
    },
    pendingBadge: {
        backgroundColor: Colors.popup,
        color: Colors.primary1,
        borderRadius: 5,
        fontSize: 12,
        width: 110,
        fontSize: 15,
        fontFamily: "Raleway_700Bold",
        opacity: 0.8, 
        width: 310,
        marginLeft: 40,
        marginRight: 44.5,
        borderBottomLeftRadius: 10,
        borderBottomEndRadius: 10,
        shadowColor: "#00000040",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
        height: 40,
        paddingHorizontal: 112,
        paddingTop: 15,

    },
});
