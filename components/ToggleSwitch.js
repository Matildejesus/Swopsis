import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DetailsIcon from "../components/icons/DetailsIcon";
import ReviewsIcon from "../components/icons/ReviewsIcon";
import Colors from "../constants/colors";
import { Dimensions } from "react-native";

function ToggleSwitch() {
  const [isSelected, setIsSelected] = useState("details");

  return (
    <View style={styles.outerContainer}>
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
              isSelected
                ? { color: Colors.primary1 }
                : { color: "rgba(142, 0, 64, 0.53)" },
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
              isSelected
                ? { color: Colors.primary2 }
                : { color: "rgba(0, 74, 14, 0.53)" },
            ]}
          >
            Reviews
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default ToggleSwitch;

const switchWidth = Dimensions.get("window").width - 122;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    position: "relative",
  },
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
    marginHorizontal: 61,
    position: "absolute",
    bottom: 114,
    borderRadius: 30,
  },
  toggleButton: {
    flex: 1,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#D9D9D9",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 1,
  },
  toggleSelected: {
    backgroundColor: "white",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 2,
  },
  toggleText: {
    marginLeft: 10,
    fontSize: 15,
    fontFamily: "RalewayBold",
  },
});
