import { View, Text, StyleSheet } from "react-native";
import ArrowNext from "./icons/ArrowNext";
import Colors from "../constants/colors";

function GroupDropdownItem({ text }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.arrowContainer}>
        <ArrowNext />
      </View>
    </View>
  );
}

export default GroupDropdownItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginLeft: 48,
    marginTop: 10,
    gap: 130,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 15,
    fontFamily: "RalewayRegular",
    color: Colors.primary2,
  },
  arrowContainer: {
    justifyContent: "flex-end",
  },
});