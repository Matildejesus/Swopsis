import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import Colors from "../constants/colors";
import Svg, { Path } from "react-native-svg";

function ModalItemWidget({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="18"
        viewBox="0 0 10 18"
        fill="none"
      >
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.04033 9.04028L0 0.999953L0.707107 0.292847L9.19239 8.77813L9.0261 8.94441L9.28826 9.20657L0.802979 17.6918L0.0958719 16.9847L8.04033 9.04028Z"
          fill="#004A0E"
        />
      </Svg>
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
