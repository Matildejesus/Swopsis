import Svg, { Path, Circle } from "react-native-svg";
import Colors from "../../constants/colors";
import { View, StyleSheet } from "react-native";

function AddIcon() {
  return (
    <View style={styles.container}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 51 51"
        fill="none"
      >
        <Circle
          cx="25.5"
          cy="25.5"
          r="25"
          fill="#357738"
          fill-opacity="1"
          stroke="#071425"
        />
        <Path
          d="M22.5 12V22.5H12V29.5H22.5V40H29.5V29.5H40V22.5H29.5V12H22.5Z"
          fill={Colors.primary2}
        />
      </Svg>
    </View>
  );
}

export default AddIcon;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    // flexDirection: "row",
    alignSelf: "flex-end",
  },
});
