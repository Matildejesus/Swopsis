import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useGroupWardrobe } from "../../hooks/useGroupWardrobe";
import { useUser } from "../../hooks/auth/useUser";
import { useBlocked } from "../../hooks/useBlocked";
import FilledHeartIcon from "../../components/icons/FilledHeartIcon";
import HeartIcon from "../../components/icons/HeartIcon";
import WardrobeitemWidget from "../../components/WardrobeItemWidget";

function WardrobeScreen() {
    const [showWishlist, setShowWishlist] = useState(false);
    const navigation = useNavigation();
    const { groupWardrobe, refetchNew } = useGroupWardrobe();
    const { user } = useUser();
    const { blocked, beingBlocked } = useBlocked();

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

    const visibleItems = useMemo(() => {
        const myId = user?.user?.id;
        const blockedSet = new Set([...(blocked || []), ...(beingBlocked || [])]);

        return (groupWardrobe || [])
            .filter(item => item.userId !== myId)
            .filter(item => item.available === true)
            .filter(item => !blockedSet.has(item.userId));
    }, [groupWardrobe, user?.user?.id, blocked, beingBlocked]);


    const toggleWishlist = useCallback(() => {
        setShowWishlist(prev => !prev);
    }, []); 


    const filteredItems = showWishlist
        ? visibleItems.filter(item => item.wishlist)
        : visibleItems;
    
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
                renderItem={({ item }) => <WardrobeitemWidget item={item}/>}
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