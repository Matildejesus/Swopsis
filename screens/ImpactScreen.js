import { Text, View, StyleSheet } from "react-native";

function ImpactScreen() {
  return (
    <View style={styles.container}>
      <Text>This is the impact screen</Text>
    </View>
  );
}

export default ImpactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE6EA",
  },
});
