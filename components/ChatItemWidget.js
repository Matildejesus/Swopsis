import { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { getItemById } from "../services/apiItems";
import { useNavigation } from "@react-navigation/native";
import { findUserById } from "../services/apiAdmin";

function ChatItemWidget({ itemId, currentUser }) {
    const [ item, setItem ] = useState();
    const navigation = useNavigation();
    const [ owner, setOwner ] = useState();
    const [ user, setUser ] = useState();

    console.log(itemId);
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const fetchedItem = await getItemById({ id: itemId });
                setItem(fetchedItem);
                console.log(fetchedItem);
                if (currentUser.id == fetchedItem.userId) {
                    setOwner(true);
                    setUser(currentUser);
                } else {
                    setOwner(false);
                    const ownerOfItem = await findUserById({ id:fetchedItem.userId });
                    setUser(ownerOfItem);
                    
                }
            } catch (error) {
                console.error("Error fetching messages: ", error.message);
            }
        };

        fetchItem();
    }, [itemId]);

    return (
        item && (
            // itemData, owner, user 
            <TouchableOpacity onPress={() => navigation.navigate("ProfileItem", { itemData: item, owner, user })}>
                <View style={styles.container}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                </View>
            </TouchableOpacity>
        )
    )
}

export default ChatItemWidget;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 79,
        height: 73,
        backgroundColor: "#fff", 
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5, 
    },
    image: {
        width: 79,
        height: 73,
        borderRadius: 20,
    }
})