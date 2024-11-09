import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Map from "./Map"; // Assuming Map is the component that handles the map view
import RegisterContainer from "../components/authentication/RegisterContainer";
import PrimaryButton from "../components/PrimaryButton";

function MapsScreen({ route }) {
  const [newPostcode, setNewPostcode] = useState("");
  const [postcode, setPostcode] = useState(route.params.postcode);

  const handleSearch = () => {
    if (!newPostcode) return;
    setPostcode(newPostcode);
    setNewPostcode(""); // Clear the text input
    console.log("New postcode set: " + newPostcode); // Debugging log
  };

  return (
    <View style={styles.container}>
      {/* Map component */}
      <Map apikey={'FjRYhw4teVr0pkKgzacHIVAyEXKoDe_G4jBNQhILcsQ'} postcode={postcode} />
      
      {/* Text input on top of the map */}
      <View style={styles.inputContainer}>
        <RegisterContainer
          placeholder={"Enter your postcode"}
          onChangeText={setNewPostcode} // This listens for changes in the input field
          value={newPostcode}
        />
        <PrimaryButton 
          title="Search"
          style={{ width: 200 }}
          onPress={handleSearch}
        />
      </View>
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
  inputContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 10, // Adjust as needed
    left: 10, // Adjust as needed
    right: 10, // Adjust as needed
    padding: 10,
    zIndex: 1, // Ensure the input is on top of the map
  },
});
