import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DetailsIcon from "../components/icons/DetailsIcon";
import ReviewsIcon from "../components/icons/ReviewsIcon";
import Colors from "../constants/colors";

function ToggleSwitch() {
  const [isSelected, setIsSelected] = useState("details"); // "details" or "reviews"

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          isSelected === "details" ? styles.toggleSelected : {},
        ]}
        onPress={() => setIsSelected("details")}
      >
        {isSelected === "details" ? <DetailsIcon /> : null}
        <Text
          style={[
            styles.toggleText,
            isSelected ? { color: Colors.primary1 } : { opacity: 0.5 },
          ]}
        >
          Details
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.toggleButton,
          isSelected === "reviews" ? styles.toggleSelected : {},
        ]}
        onPress={() => setIsSelected("reviews")}
      >
        {isSelected === "reviews" ? <ReviewsIcon /> : null}
        <Text
          style={[
            styles.toggleText,
            isSelected ? { color: Colors.primary2 } : { opacity: 0.5 },
          ]}
        >
          Reviews
        </Text>
      </TouchableOpacity>
    </View>
  );
}
export default ToggleSwitch;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    overflow: "hidden",
    marginHorizontal: 61,
    position: "absolute",
    bottom: 114,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    height: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#D9D9D9",
  },
  toggleSelected: {
    backgroundColor: "white",
  },
  toggleText: {
    marginLeft: 10,
    fontSize: 15,
    fontFamily: "RalewayBold",
  },
});
