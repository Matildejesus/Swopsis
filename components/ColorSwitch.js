import { TouchableOpacity, StyleSheet, View } from "react-native";
import { useState } from "react";
import Colors from "../constants/colors";
import ColorCircle from "./icons/ColorCircle";

function ColorSwitch({ color, onPress, isSelected }) {
    return (
        <TouchableOpacity onPress={() => onPress(color)}>
            <View style={styles.container}>
                <ColorCircle
                    color={color}
                    style={isSelected ? styles.clicked : undefined}
                />
            </View>
        </TouchableOpacity>
    );
}

export default ColorSwitch;

const styles = StyleSheet.create({
    clicked: {
        borderRadius: 3,
        borderColor: Colors.primary2,
        borderWidth: 2,
    },
    container: {
        margin: 10,
    },
});
