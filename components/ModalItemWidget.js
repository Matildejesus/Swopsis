import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import Colors from "../constants/colors";
import Svg, { Path } from "react-native-svg";
import ArrowModal from "./icons/ArrowModal";

function ModalItemWidget({ title, elements, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      {elements}
    </TouchableOpacity>
  );
}

export default ModalItemWidget;

const styles = StyleSheet.create({
  text: {
    color: Colors.primary2,
    fontFamily: "RalewaySemiBold",
    fontSize: 12,
  },
  container: {
    height: 40,
    width: 350,
    backgroundColor: Colors.popup,
    marginBottom: 2,
    alignItems: "center",
    paddingLeft: 23,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 14,
  },
});
