import { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { getFilteredGroupMember } from "../services/apiAdmin";
import { useUser } from "../components/authentication/useUser";
import { getGroupItems } from "../services/apiItems";
import { getWishlist } from "../services/apiWishlist"; // Import wishlist API
import Colors from "../constants/colors";
import WardrobeitemWidget from "../components/WardrobeItemWidget";
import FilledHeartIcon from "../components/icons/FilledHeartIcon";
import HeartIcon from "../components/icons/HeartIcon"; // Add an outlined heart icon

function WardrobeScreen() {
    const { user } = useUser();
    const [group, setGroup] = useState();
    const [groupItems, setGroupItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [showWishlist, setShowWishlist] = useState(false);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ paddingRight: 30 }}>
                    <TouchableOpacity onPress={toggleWishlist}>
                        {showWishlist ? <FilledHeartIcon /> : <HeartIcon />}
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [showWishlist]);

    useEffect(() => {
        if (user) {
            setGroup(user.user_metadata.group);
            const fetchUsers = async () => {
                try {
                    const users = await getFilteredGroupMember({ groupId: user.user_metadata.group });
                    const userIds = users.map((user) => user.userId);
                    const usersItems = await getGroupItems({ users: userIds });
                    setGroupItems(usersItems);
                } catch (error) {
                    console.error("Error fetching requests: ", error);
                }
            };
            fetchUsers();
        }
    }, [group]);

    // Fetch wishlist items
    const fetchWishlist = async () => {
        try {
            const wishlist = await getWishlist({ userId: user.id });
            setWishlistItems(wishlist.map(item => item.itemId)); // Store only item IDs
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    };

    // Toggle wishlist view
    const toggleWishlist = async () => {
        if (!showWishlist) {
            await fetchWishlist();
        }
        setShowWishlist(!showWishlist);
    };

    const filteredItems = showWishlist
        ? groupItems.filter((item) => wishlistItems.includes(item.id)) // Only show wishlist items
        : groupItems; // Show all items

    return (
        <View style={styles.container}>
            <View style={styles.flatlistContainer}>
                <FlatList
                    data={filteredItems}
                    numColumns={2}
                    renderItem={({ item }) => <WardrobeitemWidget item={item} />}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    bounce={false}
                    columnWrapperStyle={{
                        justifyContent: "space-between",
                        marginBottom: 20,
                        gap: 20,
                    }}
                />
            </View>
        </View>
    );
}

export default WardrobeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        backgroundColor: "white",
        //gap: 10,
        // alignSelf: "center",
        padding: 20,
        alignItems: "center",
    },
});
