import { View, Text, TextInput, StyleSheet } from "react-native";
import { useState } from "react";

import Colors from "../constants/colors";

function SettingsInputField({
    text,
    placeholder,
    onChangeText,
    value,
    editable,
    secureTextEntry,
}) {
    const [enteredUserDetail, setEnteredUserDetail] = useState("");

    const inputStyle = value ? styles.changedText : styles.inputText;

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{text}</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={inputStyle}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    value={value}
                    editable={editable}
                    secureTextEntry={secureTextEntry}
                />
            </View>
        </View>
    );
}
export default SettingsInputField;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 13,
    },
    text: {
        color: Colors.primary2,
        fontSize: 15,
        fontWeight: "500",
        alignSelf: "flex-start",
        marginRight: 20,
        fontFamily: "RalewayMedium",
    },
    changedText: {
        color: Colors.primary2,
        opacity: 1,
        fontFamily: "RalewayRegular",
        paddingLeft: 17,
    },
    textContainer: {
        width: 95,
    },
    inputContainer: {
        marginHorizontal: 20,
        borderRadius: 10,
        borderColor: Colors.primary2,
        borderWidth: 1,
        width: 223,
        backgroundColor: "white",
        // opacity: 0.76,
        // paddingHorizontal: 13,
        paddingVertical: 16,
    },
    inputText: {
        color: Colors.primary2,
        // opacity: 0.6,
        fontFamily: "RalewayRegular",
        paddingLeft: 17,
    },
});
