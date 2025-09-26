import { Text, View, TextInput, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import ErrorMessage from "../ErrorMessage";

function InputField({
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
    error,
    keyboardType, inputMode
}) {
    return (
        <>
        <View style={styles.container}>
            {text && (
                <Text style={textStyle ? textStyle : styles.text}>{text}</Text>
            )}
            <View
                style={[styles.inputContainer, containerStyle]}
            >
                <TextInput
                    style={styles.inputText}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    value={value}
                    secureTextEntry={secureTextEntry}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    maxLength={maxLength}
                    scrollEnabled={false}
                    keyboardType={keyboardType}
                    inputMode={inputMode}
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
        marginRight: 20,
        fontFamily: "Raleway_500Medium",
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
        paddingTop: 13,
        height: 60,
    },
     container: {
        //flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
        marginBottom: 13,
    },
    inputText: {
        color: Colors.primary2,
        paddingTop: 8,
        fontFamily: "RalewayRegular",
    },
});
