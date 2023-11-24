import { View, Text, StyleSheet } from "react-native";
import UserInfoBar from "../components/UserInfoBar";

function WardrobeScreen() {
  return (
    <View style={styles.container}>
      <UserInfoBar screen={"wardrobe"} />
    </View>
  );
}

export default WardrobeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
