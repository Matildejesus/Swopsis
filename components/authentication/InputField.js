import { Text, View, TextInput, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import ErrorMessage from "../ErrorMessage";

function InputField({
    inputStyle,
    placeholder,
    onChangeText,
    value,
    text,
    secureTextEntry,
    containerStyle,
    multiline,
    textStyle,
    numberOfLines,
    maxLength,
    error
}) {

    // const inputStyle = value ? styles.changedText : styles.inputText;
    return (
        <>
        <View style={styles.container}>
            {text && (
                <Text style={textStyle ? textStyle : styles.text}>{text}</Text>
            )}
            <View
                style={containerStyle ? containerStyle : styles.inputContainer}
            >
                <TextInput
                    style={inputStyle}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    value={value}
                    secureTextEntry={secureTextEntry}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    maxLength={maxLength}
                    scrollEnabled={false}
                />
            </View>
        </View>
        <ErrorMessage error={error} />
        </>
    );
}

export default InputField;

const styles = StyleSheet.create({
    text: {
        color: Colors.primary2,
        fontSize: 15,
        // alignSelf: "flex-end",
        marginRight: 20,
        fontFamily: "RalewayMedium",
    },
    inputContainer: {
        marginHorizontal: 20,
        borderRadius: 10,
        borderColor: Colors.primary2,
        borderWidth: 1,
        width: 243,
        backgroundColor: "white",
        opacity: 0.76,
        paddingHorizontal: 13,
        paddingVertical: 16,
    },
     container: {
        //flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
        marginBottom: 13,
    },
    changedText: {
        color: Colors.primary2,
        opacity: 1,
        fontFamily: "RalewayRegular",
    },
    inputText: {
        color: Colors.primary2,
        opacity: 0.6,
        fontFamily: "RalewayRegular",
    },
});
