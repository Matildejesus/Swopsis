import { View, Text, StyleSheet, Pressable } from "react-native";

import Colors from "../constants/colors";

function MainButton({ title, onPress, style, textStyle, variant}) {
    console.log(variant);
    return (
        <View style={[variant === "primary" ? styles.container : styles.secondaryContainer, style]}>
            <Pressable onPress={onPress}>
                <Text style={[variant === "primary" ? styles.text : styles.secondaryText, textStyle]}>{title}</Text>
            </Pressable>
        </View>
    );
}

export default MainButton;

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderRadius: 27.5,
        paddingHorizontal: 15,
        backgroundColor: Colors.primary1,
        // width: 141,
        fontFamily: "RalewayMedium",
    },
    text: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "500",
    },
    secondaryContainer: {
        padding: 15,
        borderRadius: 27.5,
        borderColor: Colors.primary1,
        borderWidth: 2,
        // width: 141,
        fontFamily: "RalewayMedium",
    },
    secondaryText: {
        color: Colors.primary1,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "500",
    },
});
