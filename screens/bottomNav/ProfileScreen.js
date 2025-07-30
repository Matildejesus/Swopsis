import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Colors from "../../constants/colors";
import CoinIcon from "../../components/icons/CoinIcon";
import SettingsIcon from "../../components/icons/SettingsIcon";
import CalendarIcon from "../../components/icons/CalendarIcon";
import ImpactIcon from "../../components/icons/ImpactIcon";
import AddIcon from "../../components/icons/AddIcon";
import { useUser } from "../../hooks/auth/useUser";
import Line from "../../components/Line";
import ProfileItemWidget from "../../components/ProfileItemWidget";
import AnimatedEnvelope from "../../components/AnimatedEnvelope";
import DashboardIcon from "../../components/icons/DashboardIcon";
import { useGroupWardrobe } from "../../hooks/useGroupWardrobe";

function ProfileScreen() {
    const { user: userData, isLoading: isUserLoading, error } = useUser();
    const { groupWardrobe, isLoading: isGroupLoading, isFetching } = useGroupWardrobe();
    const [ userItems, setUserItems ] = useState([]);

    const [userName, setUserName] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [coins, setCoins] = useState(0);
    const [group, setGroup] = useState(null);
    const [ambassador, setAmbassador] = useState(false);
    const [email, setEmail] = useState("");

    const user = userData?.user;

    useEffect(() => {
        if (user?.user_metadata) { // Only proceed if metadata exists
            const metadata = user.user_metadata;

            setUserName(metadata.userName);
            setAvatar(metadata.avatar);
            setCoins(metadata.coins);
            setGroup(metadata.group);
            setAmbassador(metadata.ambassador);
            setEmail(user.email);
            console.log("User Metadata: ", metadata);
        }
    }, [user?.user_metadata]); // Only re-run when metadata changes

    useEffect(() => {
        if (!userData?.user?.id || !groupWardrobe) return;
        // console.log("User ID: ", user);
        const items = groupWardrobe.filter(item => item.userId === user.id);
        setUserItems(items);

    }, [groupWardrobe, user]);

    if (isUserLoading || isGroupLoading) {
        return <Text>Loading user data...</Text>;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    if (!user) {
        return <Text>No user data found</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                 {avatar ? (
                    <Image source={{ uri: avatar }} style={styles.image} />
                ) : (
                    <View style={styles.imageContainer} />
                )}
                <View style={styles.userInfo}>
                    <Text style={styles.userName}>{userName}</Text>
                    <Text style={styles.userEmail}>{email}</Text>
                    <View style={styles.coins}>
                        <CoinIcon />
                        <Text style={styles.userName}>{coins}</Text>
                        {ambassador && (
                            <DashboardIcon
                                text="Dashboard"
                                location={{
                                    stack: "AdminApp",
                                }}
                            />
                        )}
                    </View>
                </View>
            </View>
            <View style={styles.iconsContainer}>
                <ImpactIcon />
                <CalendarIcon />
                <SettingsIcon />
            </View>
            <Line style={styles.line} />
            {!group || group === "Pending" ? (
                <View style={styles.pendingContainer}>
                    <AnimatedEnvelope />
                    <View style={styles.textPendingContainer}>
                        <Text style={styles.userName}>
                            WAITING TO BE ACCEPTED...
                        </Text>
                    </View>
                </View>
            ) : (
                <>
                    <ProfileItemWidget items={userItems} />
                    <TouchableOpacity
                        style={styles.addIconContainer}
                    >
                        <AddIcon navigateLocal="CreateItem" />
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    pendingContainer: {
        gap: 56,
        alignItems: "center",
        marginTop: 70,
    },
    headerContainer: {
        flexDirection: "row",
        marginTop: 24,
        marginLeft: 44,
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
        marginRight: 70,
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
        gap:5,
    },
    iconsContainer: {
        marginHorizontal: 30,
        gap: 45,
        marginTop: 15,
        marginBottom: 17,
        flexDirection: "row",
    },
    line: {
        width: 327,
        height: 1,
        backgroundColor: Colors.primary2,
        marginLeft: 25,
    },
    imageContainer: {
        width: 112,
        height: 114,
        backgroundColor: Colors.secondary2,
        borderRadius: 21,
    },
    addIconContainer: {
        position: "absolute",
        bottom: 30,
        alignSelf: "center",
    },
    modalButton: {
        backgroundColor: Colors.primary1,
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        alignItems: "center",
    },
    textPendingContainer: {
        marginLeft: 50,
    },
});
