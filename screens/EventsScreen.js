import { View, StyleSheet } from "react-native";
import PostItem from "../components/PostItem";

function EventsScreen() {
  return (
    <View style={styles.container}>
      <PostItem type="events" />
      <PostItem type="events" />
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
