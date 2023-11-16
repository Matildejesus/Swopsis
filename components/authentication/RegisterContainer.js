import { View, Text, TextInput, StyleSheet } from "react-native";
import { useState } from "react";

import Colors from "../../constants/colors";
import InputField from "./InputField";

function RegisterContainer({
  text,
  placeholder,
  onChangeText,
  value,
  secureTextEntry,
}) {
  const inputStyle = value ? styles.changedText : styles.inputText;

  return (
    <View style={styles.container}>
      <InputField
        inputStyle={inputStyle}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        text={text}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}
export default RegisterContainer;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
