import { View, Text, StyleSheet } from "react-native";

function WardrobeScreen() {
  return (
    <View style={styles.container}>
      <Text>WARDROBE</Text>
    </View>
  );
}

export default WardrobeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
