import { View, Text, TextInput, StyleSheet } from "react-native";

import Colors from "../constants/colors";

function InputField({ text, placeholder }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputText} placeholder={placeholder} />
      </View>
    </View>
  );
}
export default InputField;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 13,
  },
  text: {
    color: Colors.primary2,
    fontSize: 15,
    fontWeight: 500,
    alignSelf: "flex-end",
    marginRight: 20,
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
  inputText: {
    color: Colors.primary2,
    opacity: 0.6,
  },
});
