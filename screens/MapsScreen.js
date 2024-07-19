import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View } from "react-native";

function MapsScreen({route}) {
  const { postcode } = route.params;
  console.log("postcode: " + postcode);
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
  );
}

export default MapsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
