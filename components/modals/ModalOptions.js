import Svg, { Line } from "react-native-svg";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/colors";
function ModalOptions({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
        <Svg height="1" width="304">
          <Line
            x1="0"
            y1="0"
            x2="304"
            y2="0"
            stroke="rgba(0, 74, 14, 0.5)"
            strokeWidth="1"
          />
        </Svg>
      </View>
    </TouchableOpacity>
  );
}

export default ModalOptions;

const styles = StyleSheet.create({
  text: {
    marginBottom: 8.5,
    color: Colors.primary2,
    fontSize: 15,
    fontFamily: "RalewaySemiBold",
  },
  container: {
    marginBottom: 20,

    justifyContent: "flex-end",
  },
});
