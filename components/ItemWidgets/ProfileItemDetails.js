import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import HeartSwitch from "../HeartSwitch";
import PinkNextArrow from "../icons/PinkNextArrow";
import DescriptionDisplay from "../DescriptionDisplay";
import { useUser } from "../../hooks/auth/useUser";
import Colors from "../../constants/colors";
import dateFormatting from "../dateFormatting";
import TrashIcon from "../icons/TrashIcon";
import { useNavigation } from "@react-navigation/native";
import CalendarIcon from "../icons/CalendarIcon";
import { useDeleteItem } from "../../hooks/items/useDeleteItem";
import { useUpdateUserMetadata } from "../../hooks/auth/useUpdateUserMetadata";
import { getSubcategoryDetails } from "../../services/apiItemConvert";

function ProfileItemDetails({ itemData }) {
    const { user: currentUser } = useUser();

    const [isOwner, setIsOwner] = useState(false);
    const [ownerData, setOwnerData] = useState({
        userName: "",
        avatar: "",
        email: "",
        id: ""
    });
    console.log("item Data: ", itemData);
    
    const { deleteItem } = useDeleteItem();
    const { updateUserMetadata } = useUpdateUserMetadata();

    const { width: screenWidth, height: screenHeight } = useWindowDimensions();
    const imageHeight = screenHeight * 0.5;

    const imageStyle = {
        width: screenWidth,
        height: imageHeight,
    }

    const navigation = useNavigation();

     useEffect(() => {
        // Check if the current user is the owner of the item
        const owner = currentUser?.user?.id === itemData.userId;
        setIsOwner(owner);

        if (owner) {
            setOwnerData({
                userName: currentUser.user.user_metadata.userName,
                avatar: currentUser.user.user_metadata.avatar,
                email: currentUser.user.email,
                id: currentUser.user.id
            });
        } else {
            setOwnerData({
                userName: itemData.userName || "",
                avatar: itemData.avatar || "",
                email: itemData.email || "",
                id: itemData.userId
            });
        }
    }, [currentUser, itemData]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const date = dateFormatting(itemData.created_at);

    const handleDeletion = async () => {
        let { totalLitres, totalCarbon, totalWeight, itemsSwapped, coins } = currentUser.user.user_metadata;
        try {
            if (itemData.tradeCount == 0) {
                itemsSwapped -= 1;
                try {
                    const itemConversion = await getSubcategoryDetails({
                        item: itemData.extraInfo.subcategory,
                    });
                    console.log("ITEM CONVERSION: ", itemConversion);
                    totalLitres -= itemConversion.litres;
                    if (itemConversion.scalable === "true") {
                        totalCarbon -= itemConversion.carbon * itemData.extraInfo.weight;
                    } else {
                        totalCarbon -= itemConversion.carbon;
                    }
                    coins -= 1;
                    totalWeight -= itemData.extraInfo.weight;
                    await updateUserMetadata({ newCoins: coins, totalLitres, totalCarbon, totalWeight, itemsSwapped});
                    await deleteItem({ itemId: itemData.id });
                } catch (error) {
                    console.error("Error fetching conversion details: ", error);
                }
            }
            // await queryClient.refetchQueries(["user"], { cancelRefetch: false });
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
            <View style={styles.imageContainer}>
                <Image 
                    source={{ uri: itemData.image }} 
                    style={styles.image} 
                    resizeMode="contain"
                />
            </View>
            <View style={styles.header}>
                <Text style={styles.itemName}>{itemData.title}</Text>
                <View style={styles.icon}>
                { itemData.method == "loan"  && isOwner && 
                    (
                    <View style={styles.calendar}>
                        <CalendarIcon 
                            calendarDates={itemData.unavailableDates} 
                            itemId={itemData.id}
                            owner={true}
                        />
                    </View>
                    )
                }
                { !isOwner  && currentUser.user.app_metadata.role != "super-admin" ? <HeartSwitch sWishListItem={itemData.wishlist} itemId={itemData.id}/> :  
                    <TouchableOpacity onPress={handleDeletion}>
                        <TrashIcon width={26} height={33}/>
                    </TouchableOpacity>
                }
                </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.row3}>
                <Image
                    style={styles.avatar}
                    source={ownerData.avatar ? { uri: ownerData.avatar } : null}
                />
                <View style={styles.column}>
                    <Text style={styles.userName}>{ownerData.userName}</Text>
                    <Text style={styles.userEmail}>{ownerData.email}</Text>
                </View>
                <Text style={styles.text4}>{date}</Text>
            </View>
            <View style={styles.row4}>
                <Text style={styles.description}>Description</Text>
                <PinkNextArrow onPress={() => setIsModalVisible(true)} />
            </View>
            <Text style={styles.text6}>{itemData.description}</Text>
            {itemData.extraInfo && (
                <DescriptionDisplay
                    visible={isModalVisible}
                    onRequestClose={() => setIsModalVisible(false)}
                    data={itemData.extraInfo}
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
        paddingHorizontal: 16,
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
        width: "90%",
        aspectRatio: 1,
        marginBottom: 20,
    },
    divider: {
        height: 2,
        backgroundColor: "#efeeee",
        width: "80%",
        marginVertical: 10,
    },
    icon: {
        flexDirection: "row",
        gap: 15,
    },
    calendar: {
        marginTop: 5,
    },
    imageContainer: {
        width: "90%",
        // aspectRatio: 1,
        alignItems: "center"

    },
});
