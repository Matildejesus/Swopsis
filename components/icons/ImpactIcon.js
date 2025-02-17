import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

function ImpactIcon() {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Impact")}>
            <View style={styles.container}>
                <Image
                    source={require("../../assets/images/impact.png")}
                    style={styles.image}
                />
                <Text style={styles.text}>Impact</Text>
            </View>
        </TouchableOpacity>
    );
}

export default ImpactIcon;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        gap: 4,
    },
    text: {
        paddingTop: 13,
        color: "#004A0E",
        // font-family: Raleway;
        fontSize: 12,
        fontWeight: "600",
    },
    image: {
        width: 28,
        height: 28,
    },
});
