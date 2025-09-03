import { Text, View, StyleSheet, Image, ScrollView, ActivityIndicator } from "react-native";

import ImpactWidget from "../components/ImpactWidget";
import { useUser } from "../hooks/auth/useUser";


function ImpactScreen() {

    const { user } = useUser();
    console.log("User Data on Impact screen: ", user.user);
    console.log("UserMeTADATA on Impact screen: ", user.user.user_metadata);
    
    // const { itemsSwapped, totalCarbon, totalLitres, totalWeight } = user.user.user_metadata;
    if (user?.user?.user_metadata) { 
        console.log("there is metadata: ", user.user.user_metadata); 
    }
    const metadata = user?.user?.user_metadata || {};
    
     // 1. Handle loading state
    if (!user?.user) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#00CCCB" />
            </View>
        );
    }
    // Destructure with default values
    let {
        itemsSwapped = 0,
        totalCarbon = 0,
        totalLitres = 0,
        totalWeight = 0
    } = metadata;

    return (
        <ScrollView bounces={false}>
            <View style={styles.container}>
                <Image
                    source={{ uri: "https://ojtjdcpqkljyiralrflf.supabase.co/storage/v1/object/public/public%20assets/swap.png" }}
                    style={styles.mainImage}
                />
                <Text style={styles.mainText}>
                    EVERY LITTLE BIT COUNTS WHEN IT COMES TO HELPING THE PLANET
                    AND YOUR COMMUNITY! THATS WHY WE GIVE TOU METRICS ON YOUR
                    POSITIVE IMPACT.
                </Text>
                <View style={styles.swappedContainer}>
                    <Text style={styles.numberText}>{itemsSwapped}</Text>
                    <Text style={styles.itemText}>ITEM SWAPPED</Text>
                </View>
                <View style={styles.widget}>
                    <ImpactWidget
                        number={parseFloat(totalWeight.toFixed(2))}
                        label={"KG OF TEXTILE OUT OF LANDFILL"}
                        source={{ uri: "https://ojtjdcpqkljyiralrflf.supabase.co/storage/v1/object/public/public%20assets/garb.png"}}
                        color={"#00CCCB"}
                        count={1}
                    />
                    <ImpactWidget
                        number={totalLitres}
                        label={"L OF FRESH WATER SAVE"}
                        source={{ uri: "https://ojtjdcpqkljyiralrflf.supabase.co/storage/v1/object/public/public%20assets/water.png"}}
                        color={"#0080FB"}
                        count={2}
                    />
                    <ImpactWidget
                        number={totalCarbon.toFixed(2)}
                        label={"TONNES OF CO2 EMMISSIONS SAVED"}
                        source={{ uri: "https://ojtjdcpqkljyiralrflf.supabase.co/storage/v1/object/public/public%20assets/gas.png"}}
                        color={"#FFA330"}
                        count={3}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

export default ImpactScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFE6EA",
    },
    mainImage: {
        alignSelf: "flex-end",
        marginRight: 45,
        marginTop: 5,
        width: 222,
        height: 222,
    },
    mainText: {
        marginHorizontal: 23,
        marginTop: 13,
        fontSize: 20,
        color: "#FF6780",
        fontWeight: "700",
        fontFamily: "Raleway_700Bold",
    },
    swappedContainer: {
        flexDirection: "row",
        width: 328,
        height: 74,
        backgroundColor: "#FF6780",
        padding: 22,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 23,
        gap: 11,
        marginTop: 22,
    },
    itemText: {
        fontSize: 20,
        fontFamily: "Raleway_400Regular",
    },
    numberText: {
        fontSize: 20,
        fontFamily: "Raleway_400Regular",
        // paddingBottom: 10,
    },
    widget: {
        marginBottom: 37,
        marginTop: 33,
        // backgroundColor: "#00CCCB",
    },
});
