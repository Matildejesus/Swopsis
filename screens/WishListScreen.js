import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useUser } from "../hooks/useUser";
import { getWishlist } from "../services/apiWishlist";
import WardrobeitemWidget from "../components/WardrobeItemWidget";

function WishList() {

    const { user } = useUser();
    const [ wishList, setWishList ] = useState();

    useEffect(() => {
        if (user) {
            const fetchWishlist = async () => {
                try {
                    const wishlist = await getWishlist({ userId: user.id });
                    setWishList(wishlist);
                } catch (error) {
                    console.error("Error fetching wishlist: ", error);
                } 
            }
            fetchWishlist();
        };
        
    }, [user]);

    return (
        <View style={styles.container}>
            <View style={styles.flatlistContainer}>
                <FlatList
                    data={wishList}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <>
                        <WardrobeitemWidget wishlistItem={item} heartFilled={true}/></>
                    )}
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

export default WishList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 20,
        alignItems: "center",
    },
});
