import { View, StyleSheet } from "react-native";
import Colors from "../constants/colors";

function Line() {
  return <View style={styles.line}></View>;
}

export default Line;

const styles = StyleSheet.create({
  line: {
    width: 327,
    height: 1,
    backgroundColor: Colors.primary2,
    // marginTop: 17,
    alignItems: "center",
  },
});
