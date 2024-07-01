import React from "react";
import { StyleSheet, View, Text } from "react-native";

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text>This is profile scree.</Text>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
