import { Text, View, StyleSheet, Image, ScrollView } from "react-native";

import ImpactWidget from "../components/ImpactWidget";
import { useUser } from "../components/authentication/useUser";
import { useState } from "react";

function ImpactScreen() {

    const { user } = useUser();
    const { coins, itemsSwapped, totalCarbon, totalLitres, totalWeight } = user.user_metadata 
 
    return (
        <ScrollView bounces={false}>
            <View style={styles.container}>
                <Image
                    source={require("../assets/images/swap.png")}
                    style={styles.mainImage}
                />
                <Text style={styles.mainText}>
                    EVERY LITTLE BIT COUNTS WHEN IT COMES TO HELPING THE PLANET
                    AND YOUR COMMUNITY! THATS WHY WE GIVE TOU METRICS ON YOUR
                    POSITIVE IMPACT.
                </Text>
                <View style={styles.swappedContainer}>
                    <Text style={styles.numberText}>{user.user_metadata.itemsSwapped}</Text>
                    <Text style={styles.itemText}>ITEM SWAPPED</Text>
                </View>
                <View style={styles.widget}>
                    <ImpactWidget
                        number={parseFloat(user.user_metadata.totalWeight.toFixed(2))}
                        label={"KG OF TEXTILE OUT OF LANDFILL"}
                        source={require("../assets/images/garb.png")}
                        color={"#00CCCB"}
                        count={1}
                    />
                    <ImpactWidget
                        number={user.user_metadata.totalLitres}
                        label={"L OF FRESH WATER SAVE"}
                        source={require("../assets/images/water.png")}
                        color={"#0080FB"}
                        count={2}
                    />
                    <ImpactWidget
                        number={user.user_metadata.totalCarbon}
                        label={"TONNES OF CO2 EMMISSIONS SAVED"}
                        source={require("../assets/images/gas.png")}
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
        fontFamily: "RalewayBold",
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
        fontFamily: "RalewayRegular",
    },
    numberText: {
        fontSize: 20,
        fontFamily: "RalewayRegular",
        paddingBottom: 10,
    },
    widget: {
        marginBottom: 37,
        marginTop: 33,
        // backgroundColor: "#00CCCB",
    },
});
