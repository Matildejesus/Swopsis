import PostItem from "../components/PostItem";
import { View, StyleSheet } from "react-native";

function BeYouScreen() {
  return (
    <View style={styles.container}>
      <PostItem />
      <PostItem />
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
