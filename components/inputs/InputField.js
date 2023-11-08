import { Text, View, TextInput, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

function InputField({ inputStyle, placeholder, onChangeText, value, text }) {
  return (
    <>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={inputStyle}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
        />
      </View>
    </>
  );
}

export default InputField;

const styles = StyleSheet.create({
  text: {
    color: Colors.primary2,
    fontSize: 15,
    fontWeight: 500,
    alignSelf: "flex-end",
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
});
