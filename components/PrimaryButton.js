import { View, Text, StyleSheet, Pressable } from "react-native";

import Colors from "../constants/colors";

function PrimaryButton({ title, onPress, style }) {
  return (
    <View style={[styles.container, style]}>
      <Pressable onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 27.5,
    backgroundColor: Colors.primary1,
    width: 141,
    fontFamily: "RalewayMedium",

  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: 500,
    // fontFamily: Raleway,
  },
});
