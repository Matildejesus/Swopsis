import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";

import WardrobeitemWidget from "../../components/WardrobeItemWidget";
import FilledHeartIcon from "../../components/icons/FilledHeartIcon";
import HeartIcon from "../../components/icons/HeartIcon";
import { useNavigation } from "@react-navigation/native";
import { useGroupWardrobe } from "../../hooks/useGroupWardrobe";

function WardrobeScreen() {
    const [showWishlist, setShowWishlist] = useState(false);
    const navigation = useNavigation();
    const [ groupItems, setGroupItems] = useState([]);
    const { groupWardrobe, isLoading } = useGroupWardrobe();

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
        console.log("Group Wardrobe: ", groupWardrobe);
        setGroupItems(groupWardrobe?.filter((item) => item.available === true) );
       
    }, [groupWardrobe]);

    const toggleWishlist = useCallback(() => {
        setShowWishlist(prev => !prev);
    }, []); 

    const filteredItems = showWishlist
        ? groupItems.filter(item => item.wishlist)
        : groupItems; 

    return (
        <View style={styles.container}>
            <FlatList
                data={filteredItems}
                numColumns={2}
                renderItem={({ item }) => <WardrobeitemWidget item={item} />}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                bounce={false}

            />
    </View>
    );
}

export default WardrobeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center"
    }
});