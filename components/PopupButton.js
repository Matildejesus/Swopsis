import { View, Text, StyleSheet, Pressable } from "react-native";
import Colors from "../constants/colors";

function PopupButton({ title, onPress, style }) {
  return (
    <View style={[styles.container, style]}>
      <Pressable onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
}

export default PopupButton;

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.popup,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.primary2,
    fontSize: 14,
    fontFamily: "RalewaySemiBold",
  },
});
