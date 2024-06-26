import React from "react";
import {StyleSheet, Text, View} from "react-native";

function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text>This is login screen.</Text>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    fontSize: 50,
    justifyContent: "center",
    marginTop: 70,
  },
});