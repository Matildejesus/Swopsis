import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Colors from "../constants/colors";
import HeartSwitch from "./HeartSwitch";
import ContactIcon from "./icons/ContactIcon";
import dateFormatting from "./dateFormatting";
import { useEffect, useState } from "react";
import { findUserById } from "../services/apiAdmin";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "./authentication/useUser";
import { getItemById } from "../services/apiItems";
import { getWishListItem } from "../services/apiWishlist";

function WardrobeitemWidget({ item: initialItem, wishlistItem }) {
    const [user, setUser] = useState();
    const { user: currentUser } = useUser();
    const navigation = useNavigation();
    const [ owner, setOwner ] = useState(false);
    const [ itemData, setItemData ] = useState([]);
    const [ itemWishlist, setItemWishlist ] = useState(null);
    const [ item, setItem ] = useState(initialItem);
    const [ date, setDate ] = useState();


    const fetchWishlist = async () => {
        try {
            const wishlist = await getWishListItem({ userId: currentUser.id, itemId: item.id });
            setItemWishlist(wishlist.length > 0 ? wishlist[0] : null);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    };

    useEffect(() => {
        let isMounted = true; 
        const fetchInfo = async () => {
            try {
                let newItem = item;
                if (wishlistItem) {
                    newItem = await getItemById({ id: wishlistItem.itemId });
                    if (isMounted) setItem(newItem);
                }
    
                const fetchedUser = await findUserById({ id: newItem.userId });
                if (fetchedUser?.id !== user?.id && isMounted) {
                    setUser(fetchedUser);
                }
    
                if (isMounted) {
                    setOwner(currentUser?.id === newItem.userId);
                    setDate((prev) => (prev !== dateFormatting(newItem.created_at) ? dateFormatting(newItem.created_at) : prev));
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        if ((wishlistItem || item) && currentUser) {
            fetchInfo();
        }
        
        return () => {
            isMounted = false; 
        };
    }, [wishlistItem, item, currentUser]);
    
    return (
        <>
        {console.log("Item:", item)}
        {console.log("User:", user)}

         {item.available && user && (
            <View style={styles.itemContainer}>
                <View style={styles.row3}>
                    <Image style={styles.avatar} source={null} />
                    <View style={styles.column}>
                        <Text style={styles.userName}>
                            {user.user_metadata.userName}
                        </Text>
                        <Text style={styles.date}>{date}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("ProfileItem", {
                            itemData: item,
                            owner,
                            user,
                        })
                    }
                >
                    <View style={styles.view}>
                        <Image
                            style={styles.itemImage}
                            source={{ uri: item.image }}
                        />
                    </View>
                </TouchableOpacity>
                <Text style={[styles.userName, { paddingLeft: 15 }]}>
                    {item.title}
                </Text>
                <View style={styles.iconContainer}>
                  {currentUser && <HeartSwitch itemId={item.id} userId={currentUser.id} wishList={itemWishlist} refreshWishlist={fetchWishlist}/>}
                    <ContactIcon width={26} height={26} />
                </View>
            </View>
         )}
        </>
    );
}

export default WardrobeitemWidget;

const styles = StyleSheet.create({
    itemContainer: {
        width: 149,
        height: 300,
        backgroundColor: "white",
        borderColor: Colors.primary2,
        borderRadius: 15,
        borderWidth: 1,
        paddingVertical: 9,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
        backgroundColor: Colors.secondary2,
        marginLeft: 5,
    },
    userName: {
        color: Colors.primary2,
        fontSize: 15,
        fontFamily: "RalewayBold",
    },
    date: {
        color: Colors.primary2,
        fontSize: 12,
        fontFamily: "RalewayMedium",
    },
    row3: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 15,
    },
    itemImage: {
        width: 147,
        height: 160,
        marginBottom: 10,
    },
    iconContainer: {
        flexDirection: "row",
        alignSelf: "center",
        paddingTop: 5,
        gap: 20,
    },
    column: {
        marginTop: 3,
    },
    view: {
        borderRadius: 4,
        borderColor: "black",
    },
});
