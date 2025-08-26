import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { RefreshControl, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";

import WardrobeitemWidget from "../../components/WardrobeItemWidget";
import FilledHeartIcon from "../../components/icons/FilledHeartIcon";
import HeartIcon from "../../components/icons/HeartIcon";
import { useNavigation } from "@react-navigation/native";
import { useGroupWardrobe } from "../../hooks/useGroupWardrobe";
import { useUser } from "../../hooks/auth/useUser";

function WardrobeScreen() {
    const [showWishlist, setShowWishlist] = useState(false);
    const navigation = useNavigation();
    const [ groupItems, setGroupItems] = useState([]);
    const { groupWardrobe, isLoading, refetchNew } = useGroupWardrobe();
    const { user } = useUser();

    console.log(groupWardrobe[0])
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
        // console.log("Group Wardrobe: ", groupWardrobe);
        const filteredWardrobe = groupWardrobe?.filter((item) => item.userId != user.user.id);
        setGroupItems(filteredWardrobe?.filter((item) => item.available === true) );
            // console.log("Filtered wardrobeee: ", filteredWardrobe);
       
    }, [groupWardrobe]);

    const toggleWishlist = useCallback(() => {
        setShowWishlist(prev => !prev);
    }, []); 


    const filteredItems = showWishlist
        ? groupItems.filter(item => item.wishlist)
        : groupItems; 

    
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetchNew(); 
    } catch (err) {
      console.warn("Refresh failed:", err);
    } finally {
      setRefreshing(false);
    }
  }, [refetchNew]);

    return (
        <View style={styles.container}>
            <FlatList
                data={filteredItems}
                numColumns={2}
                renderItem={({ item }) => <WardrobeitemWidget item={item} />}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                bounce={false}
                refreshing={refreshing}
                onRefresh={onRefresh}

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