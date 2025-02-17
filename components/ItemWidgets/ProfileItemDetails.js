import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Divider } from "@rneui/themed";
import HeartSwitch from "../HeartSwitch";
import PinkNextArrow from "../icons/PinkNextArrow";
import DescriptionDisplay from "../DescriptionDisplay";
import { useUser } from "../authentication/useUser";
import Colors from "../../constants/colors";
import dateFormatting from "../dateFormatting";
import { getItemsInfo } from "../../services/apiItems";

function ProfileItemDetails({ itemData, user }) {
    const { user: currentUser } = useUser();

    const [userName, setUserName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [email, setEmail] = useState("");

    console.log("ITEM DATA: ", itemData);
    useEffect(() => {
        if (!user) user = currentUser; // Use authenticated user if none is passed

        if (user) {
            setUserName(user.user_metadata.userName);
            setAvatar(user.user_metadata.avatar);
            setEmail(user.email);
        }
    }, [user]);

    const [itemDetails, setItemDetails] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const displayModal = () => setIsModalVisible(true);
    const date = dateFormatting(itemData.created_at);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const details = await getItemsInfo({
                    category: itemData.category,
                    itemId: itemData.id,
                });
                setItemDetails(details);
                console.log("Details: ", details);
            } catch (error) {
                console.error("Error fetching item details:", error);
            }
        };

        fetchData();
    }, [itemData]);

    console.log(itemData.image);

    return (
        <View style={styles.container}>
            <Image source={{ uri: itemData.image }} style={styles.image} />
            <View style={styles.header}>
                <Text style={styles.itemName}>{itemData.title}</Text>
                <HeartSwitch />
            </View>
            <Divider style={styles.divider} />
            <View style={styles.row3}>
                <Image
                    style={styles.avatar}
                    source={avatar ? { uri: avatar } : null}
                />
                <View style={styles.column}>
                    <Text style={styles.userName}>{userName}</Text>
                    <Text style={styles.userEmail}>{email}</Text>
                </View>
                <Text style={styles.text4}>{date}</Text>
            </View>
            <View style={styles.row4}>
                <Text style={styles.description}>Description</Text>
                <PinkNextArrow onPress={displayModal} />
            </View>
            <Text style={styles.text6}>{itemData.description}</Text>
            {itemDetails && (
                <DescriptionDisplay
                    visible={isModalVisible}
                    onRequestClose={() => setIsModalVisible(false)}
                    data={itemDetails}
                    category={itemData.category}
                />
            )}
        </View>
    );
}

export default ProfileItemDetails;

const styles = StyleSheet.create({
    container: {
        // justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
        padding: 16,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
    },
    column: {
        flex: 1,
        marginTop: 6,
        marginRight: 4,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 19,
    },
    row3: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 15,
    },
    row4: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    itemName: {
        color: Colors.primary2,
        fontSize: 20,
        fontWeight: "bold",
        width: 271,
    },
    userName: {
        color: Colors.primary2,
        fontSize: 15,
        fontWeight: "bold",
    },
    userEmail: {
        color: Colors.primary2,
        fontSize: 12,
    },
    text4: {
        color: "#004A0E",
        fontSize: 12,
    },
    description: {
        color: Colors.primary2,
        fontSize: 18,
        fontWeight: "bold",
        width: 275,
    },
    text6: {
        color: "#004A0E",
        fontSize: 15,
        width: "90%",
        height: 130,
        width: 300,
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 20,
    },
    divider: {
        height: 2,
        backgroundColor: "#efeeee",
        width: "80%",
        marginVertical: 10,
    },
});
