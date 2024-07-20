import { View, StyleSheet, Text } from "react-native";

function InboxScreen() {
  return (
    <View style={styles.container}>
        <Text>This is inbox screen.</Text>
    </View>
  );
}

export default InboxScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "white",
  },
});