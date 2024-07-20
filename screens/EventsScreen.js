import { View, StyleSheet, Text } from "react-native";

function EventsScreen() {
  return (
    <View style={styles.container}>
        <Text>This is events screen.</Text>
    </View>
  );
}

export default EventsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});