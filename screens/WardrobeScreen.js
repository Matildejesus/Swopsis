import { View, Text, StyleSheet, Image } from "react-native";
import UserInfoBar from "../components/UserInfoBar";
import ViewIcon from "../components/icons/ViewIcon";
import HeartIcon from "../components/icons/HeartIcon";
import MessageIcon from "../components/icons/MessageIcon";
import { DebugInstructions } from "react-native/Libraries/NewAppScreen";
import WardrobeItem from "../components/WardrobeItem";
import Colors from "../constants/colors";

function WardrobeScreen() {
  return (
    <View style={styles.container}>
      <WardrobeItem />
      <WardrobeItem />
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
