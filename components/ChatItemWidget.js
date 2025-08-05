import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useGroupWardrobe } from "../hooks/useGroupWardrobe";
import { useUser } from "../hooks/auth/useUser";

function ChatItemWidget({ itemId }) {
    const navigation = useNavigation();
    const { user } = useUser();
    const { groupWardrobe } = useGroupWardrobe();

    const item = groupWardrobe.find(item => item.id === itemId);
    const isOwner = user.user.id === item.userId ? true : false;
    const { userName, avatar, email, userId } = item || {};
    const itemOwner = { userName, avatar, email, userId };

    return (
        item && (
            <TouchableOpacity onPress={() => navigation.navigate("ProfileItem", { itemData: item, isOwner, itemOwner })}>
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