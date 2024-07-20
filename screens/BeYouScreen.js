import { View, StyleSheet, Text } from "react-native";

function BeYouScreen() {
  return (
    <View style={styles.container}>
      <Text>This is Be You screen.</Text>
    </View>
  );
}

export default BeYouScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});