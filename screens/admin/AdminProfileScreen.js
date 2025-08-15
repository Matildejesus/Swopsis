import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "../../constants/colors";
import Line from "../../components/Line";
import { useEffect } from "react";
import RectangleButton from "../../components/RectangleButton";
import ItemIcon from "../../components/icons/adminicons/ItemIcon";
import MemberIcon from "../../components/icons/adminicons/MemberIcon";
import GroupIcon from "../../components/icons/adminicons/GroupIcon";
import FeedbackIcon from "../../components/icons/adminicons/FeedbackIcon";
import LmsIcon from "../../components/icons/adminicons/LmsIcon";
import RequestStatistic from "../../components/RequestStatistic";
import DashboardIcon from "../../components/icons/DashboardIcon";
import { getAllJoinRequests, getJoinRequests } from "../../services/apiJoinRequests";
import CoinIcon from "../../components/icons/adminicons/CoinIcon";
import NewsIcon from "../../components/icons/adminicons/NewsIcon";
import { useLogout } from "../../hooks/auth/useLogout";
import MainButton from "../../components/MainButton";
import { useUser } from "../../hooks/auth/useUser";
import { useAllGroups } from "../../hooks/useAllGroups";
import { useAllMembers } from "../../hooks/useAllMembers";
import { useAllItems } from "../../hooks/useAllItems";
import { useRequests } from "../../hooks/useRequests";

function AdminProfileScreen({ navigation }) {

    const { user } = useUser();
    const [userName, setUsername] = useState("");
    const [avatar, setAvatar] = useState("");
    const [ambassador, setAmbassador] = useState(null);
    const [group, setGroup] = useState("");
    const [email, setEmail] = useState("");
    const { logout, isLoading } = useLogout();
    const [ hasNotification, setHasNotification ] = useState(false);
    const { groups, isLoading: groupsLoading } = useAllGroups();
    const { members, isLoading: membersLoading } = useAllMembers();
    const { items, isLoading: itemsLoading } = useAllItems();
    const { accepted: acceptedReq, pending: pendingReq, rejected: rejectedReq, isLoading: requestsLoading } = useRequests();
    console.log("Accepted: ",acceptedReq);
    console.log("Pending: ",pendingReq);
    console.log("Rejected: ", rejectedReq);

    useEffect(() => {
        if (!user || !items ) return;

        if (user.user.app_metadata.role == "super-admin") {
            console.log("USER: ", user);
            setUsername("Super Admin");

        } else {
            setUsername(user.user.user_metadata.userName);
            setAvatar(user.user.user_metadata.avatar);
            setGroup(user.user.user_metadata.group);
            setAmbassador(user.user.user_metadata.ambassador);
        }
        setEmail(user.user.email);

    }, [user, items]);

    const handleAddIconPress = () => {
        setModalVisible(true);
    };

    if (itemsLoading || membersLoading || groupsLoading || requestsLoading) {
        return <Text>Loading admin data...</Text>
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image
                    style={styles.image}
                    source={avatar ? { uri: avatar } : null}
                />
                <View style={styles.userInfo}>
                    <Text style={styles.userName}>{userName}</Text>
                    <Text style={styles.userEmail}>{email}</Text>
                </View>
            </View>
            <View style={styles.iconsContainer}>
                {ambassador && (
                    <DashboardIcon
                        text="Profile"
                        location={{
                            stack: "InApp",
                        }}
                    />
                )}

                <MainButton
                    title="LOG OUT"
                    onPress={logout}
                    styleContainer={styles.logoutButton}
                    textStyle={styles.logoutText}
                    variant="secon"
                />
            </View>
            <Line style={styles.line} />
            {hasNotification && (
                <View style={styles.notificationBadge}>
                    <Text style={styles.notificationText}>!</Text>
                </View>
            )}
            <View>
                <Text style={styles.title}>Overall Statistics</Text>
                <Text style={styles.subtitle}>
                    Daily information about statistics in system
                </Text>
                <View style={styles.layout}>
                    <RequestStatistic
                        number={acceptedReq.length}
                        text="Accepted Requests"
                    />
                    <RequestStatistic
                        number={pendingReq.length}
                        text="Pending Requests"
                    />
                    <RequestStatistic
                        number={rejectedReq.length}
                        text="Rejected Requests"
                    />
                </View>
                <Line style={styles.line} />
            </View>
            <View style={styles.iconContainer}>
               <RectangleButton
                    icon={<ItemIcon />}
                    text="Total Items"
                    color="#FB5099"
                    number={items.length ?? 0}
                    location="Items"
                    data={items}
                />
                <RectangleButton
                    icon={<MemberIcon />}
                    text="Members"
                    color="#31CE36"
                    number={!membersLoading && members.length}
                    location="Members"
                    data={members}
                    requests={pendingReq}
                />
                {/* <RectangleButton
                    icon={<FeedbackIcon />}
                    text="Feedback"
                    color="#F25961"
                    number="0"
                    location="Feedback"
                /> */}
                {ambassador ? (
                    <>
                        {/* <RectangleButton
                            icon={<NewsIcon />}
                            text="News"
                            color="#FFAD46"
                            number="0"
                            location="News"
                        /> */}
                    </>
                ) : (
                    <>
                        <RectangleButton
                            icon={<GroupIcon />}
                            text="Groups"
                            color="#FFAD46"
                            number={!groupsLoading && groups.length}
                            location="Groups"
                            // data={groups}
                        />
                        {/* <RectangleButton
                            icon={<LmsIcon />}
                            text="LMS"
                            color="#357738"
                            number="0"
                            location="Lms"
                        /> */}
                    </>
                )}
            </View>
            
        </View>
    );
}



export default AdminProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        // paddingTop: 24,
        // alignItems: "center",
        // justifyContent: "center",
    },
    headerContainer: {
        flexDirection: "row",
        marginTop: 77,
        marginLeft: 44
    },
    userInfo: {
        marginLeft: 16,
    },
    image: {
        width: 85,
        height: 87,
        backgroundColor: Colors.impact,
        borderRadius: 21,
    },
    userName: {
        color: Colors.primary2,
        fontFamily: "Raleway_700Bold",
        fontSize: 20,
        fontWeight: "700",
    },
    userEmail: {
        color: Colors.primary2,
        fontFamily: "Raleway_500Medium",
        fontSize: 15,
        fontWeight: "500",
        marginBottom: 11,
    },
    coins: {
        flexDirection: "row",
        gap: 11,
    },
    iconsContainer: {
        marginHorizontal: 50,
        gap: 30,
        marginTop: 15,
        marginBottom: 17,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    line: {
        width: 327,
        height: 1,
        backgroundColor: Colors.primary2,
        marginLeft: 25,
    },
    iconContainer: {
        // alignItems: "center",
        gap: 10,
        marginTop: 23,
        marginLeft: 44,
    },
    title: {
        fontFamily: "Raleway_700Bold",
        fontSize: 18,
        color: Colors.primary2,
        marginBottom: 10,
        marginTop: 33,
        marginLeft: 23,
    },
    subtitle: {
        fontFamily: "Raleway_400Regular",
        fontSize: 15,
        color: Colors.primary2,
        marginBottom: 15,
        marginLeft: 23,
    },
    layout: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
        gap: 40,
        marginTop: 20,
        marginBottom: 20,
    },
    logoutButton: {
        width: 100,
        height: 30,
        paddingTop: 5,
        padding: 0
    },
    logoutText: {
        fontSize: 15,
    }
});
