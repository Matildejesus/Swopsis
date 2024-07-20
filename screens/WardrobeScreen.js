import { View, StyleSheet, Text } from "react-native";

function WardrobeScreen() {
  return (
    <View style={styles.container}>
        <Text>This is wardrobe screen.</Text>
    </View>
  );
}

export default WardrobeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "white",
  },
});