import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
} from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../../constants/colors";
import CoinIcon from "../../components/icons/CoinIcon";
import SettingsIcon from "../../components/icons/SettingsIcon";
import CalendarIcon from "../../components/icons/CalendarIcon";
import ImpactIcon from "../../components/icons/ImpactIcon";
import AddIcon from "../../components/icons/AddIcon";
import { useUser } from "../../components/authentication/useUser";
import Line from "../../components/Line";
import ProfileItemWidget from "../../components/ProfileItemWidget";
import { getItems } from "../../services/apiItems";
import AnimatedEnvelope from "../../components/AnimatedEnvelope";
import { useFocusEffect } from "@react-navigation/native";
import DashboardIcon from "../../components/icons/DashboardIcon";

function ProfileScreen({ navigation }) {
    const dispatch = useDispatch();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState();
    const { user } = useUser();

    const [modalVisible, setModalVisible] = useState(false);

    const fetchItems = useCallback(async () => {
        if (!user || !user.id) return;
        setLoading(true);
        try {
            const fetchedItems = await getItems({ userId: user.id });
            setItems(fetchedItems);
        } catch (error) {
            console.error("Error fetching items: ", error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                await fetchItems();
            };

            fetchData();
        }, [fetchItems]),
    );

    if (!user || !user.user_metadata) {
        return <Text>Loading user data...</Text>;
    }

    const { userName, avatar, coins, group } = user.user_metadata;
    const email = user.email;

    const handleAddIconPress = () => {
        setModalVisible(true);
    };

    console.log("PROFILE IMAGE: ", avatar);

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
                    <View style={styles.coins}>
                        <CoinIcon />
                        <Text style={styles.userName}>{coins}</Text>
                        {user.user_metadata.ambassador && (
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
                    <ProfileItemWidget items={items} />
                    <TouchableOpacity
                        onPress={handleAddIconPress}
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
        fontFamily: "RalewayBold",
        fontSize: 20,
        fontWeight: "700",
        marginRight: 70,
    },
    userEmail: {
        color: Colors.primary2,
        fontFamily: "RalewayMedium",
        fontSize: 15,
        fontWeight: "500",
        marginBottom: 11,
    },
    coins: {
        flexDirection: "row",
        gap: 11,
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
    addIconContainer: {
        position: "absolute",
        bottom: 30,
        alignSelf: "center",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "white",
        width: "80%",
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    modalButton: {
        backgroundColor: Colors.primary1,
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        alignItems: "center",
    },
    modalButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    closeButton: {
        marginTop: 10,
        alignItems: "center",
    },
    closeButtonText: {
        color: Colors.primary1,
        fontWeight: "bold",
    },
    textPendingContainer: {
        marginLeft: 50,
    },
});
