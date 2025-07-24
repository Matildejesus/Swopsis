import { View, Text, StyleSheet, Pressable } from "react-native";

import Colors from "../constants/colors";

function MainButton({ title, onPress, style, textStyle, variant}) {
    return (
        <View style={[variant === "primary" ? {backgroundColor: Colors.primary1} :  {borderColor: Colors.primary1, borderWidth: 2,}, styles.container, style]}>
            <Pressable onPress={onPress}>
                <Text style={[variant === "primary" ? {color: "white"} : {color: Colors.primary1}, styles.text, textStyle]}>{title}</Text>
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
    },
    text: {
        textAlign: "center",
        fontSize: 20,
        fontFamily: "Raleway_500Medium",
    }
});
