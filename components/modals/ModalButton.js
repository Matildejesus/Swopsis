import { View, Text, StyleSheet, Pressable } from "react-native";
import Colors from "../../constants/colors";

function ModalButton({ title, onPress, style, removeContainer }) {
    return (
        <Pressable onPress={onPress}>
            <View
                style={ !removeContainer ? [styles.container, style] : removeContainer}
            >
                <Text style={styles.text}>{title}</Text>
            </View>
        </Pressable>
    );
}

export default ModalButton;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 14,
        paddingHorizontal: 52,
        borderRadius: 27,
        borderColor: Colors.primary2,
        borderWidth: 2,
        backgroundColor: Colors.popup,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: Colors.primary2,
        fontSize: 14,
        fontFamily: "Raleway_700Bold",
    },
});
