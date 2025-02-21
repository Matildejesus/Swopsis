import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Divider } from "@rneui/themed";
import HeartSwitch from "../HeartSwitch";
import PinkNextArrow from "../icons/PinkNextArrow";
import DescriptionDisplay from "../DescriptionDisplay";
import { useUser } from "../authentication/useUser";
import Colors from "../../constants/colors";
import dateFormatting from "../dateFormatting";
import { deleteItems, getItemsInfo } from "../../services/apiItems";
import TrashIcon from "../icons/TrashIcon";
import { getSubcategoryDetails } from "../../services/apiItemConvert";
import { useNavigation } from "@react-navigation/native";
import { updateUserData } from "../../services/apiAuth";

function ProfileItemDetails({ itemData, user, owner }) {
    const { user: currentUser } = useUser();

    const [userName, setUserName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");

    const navigation = useNavigation();

    useEffect(() => {
        if (!user) user = currentUser; // Use authenticated user if none is passed

        if (user) {
            setUserName(user.user_metadata.userName);
            setAvatar(user.user_metadata.avatar);
            setEmail(user.email);
            setId(user.id);
        }
    }, [user]);

    const [itemDetails, setItemDetails] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

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

    const handleDeletion = async () => {
        console.log("Deleting");
        let { totalLitres, totalCarbon, totalWeight, itemsSwapped, coins } = currentUser.user_metadata;
        console.log("0");
        try {
            console.log("1");
            if (itemData.tradeCount == 0) {
                console.log("2");
               // const [ subcategoryDetails, setSubcategoryDetails ] = useState();
                itemsSwapped -= 1;
                try {
                    console.log("3");
                    const itemConversion = await getSubcategoryDetails({
                        item: itemDetails.subcategory,
                    });
                    console.log("ITEMCONVERSION: ", itemConversion);
                    totalLitres -= itemConversion.litres;
                    if (itemConversion.scalable === "true") {
                        totalCarbon -= itemConversion.carbon * itemDetails.weight;
                    } else {
                        totalCarbon -= itemConversion.carbon;
                    }
                    coins -= 1;
                    totalWeight -= itemDetails.weight;
                    console.log("4");
                    console.log(coins, totalLitres, totalCarbon, totalWeight, itemsSwapped);
                    await updateUserData({ newCoins: coins, totalLitres, totalCarbon, totalWeight, itemsSwapped});
                } catch (error) {
                    console.error("Error fetching conversion details: ", error);
                }

            }
            console.log("5");
            await deleteItems({ itemId: itemData.id });
            navigation.reset({
            index: 0,
            routes: [
                {
                    name: "InApp",
                },
            ],
        });
        } catch (error) {
            console.error("Error deleting item: ", error);
        }
 
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: itemData.image }} style={styles.image} />
            <View style={styles.header}>
                <Text style={styles.itemName}>{itemData.title}</Text>
                { !owner ? <HeartSwitch /> :  
                    <TouchableOpacity onPress={handleDeletion}>
                        <TrashIcon width={26} height={33}/>
                    </TouchableOpacity>
                }
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
                <PinkNextArrow onPress={() => setIsModalVisible(true)} />
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
