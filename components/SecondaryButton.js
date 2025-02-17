import { View, Text, StyleSheet, Pressable } from "react-native";

import Colors from "../constants/colors.js";
function SecondaryButton({ title, onPress }) {
    return (
        <View style={styles.container}>
            <Pressable onPress={onPress}>
                <Text style={styles.text}>{title}</Text>
            </Pressable>
        </View>
    );
}

export default SecondaryButton;

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderRadius: 27.5,
        borderColor: Colors.primary1,
        borderWidth: 2,
        width: 141,
        fontFamily: "RalewayMedium",
    },
    text: {
        textAlign: "center",
        color: Colors.primary1,
        // font-family: Raleway;
        fontSize: 20,
        fontWeight: "500",
        // lineHeight: "150%",
        // letterSpacing: -0.38,
    },
});
