import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Map from "../components/Map";
import RegisterContainer from "../components/authentication/RegisterContainer";
import PrimaryButton from "../components/PrimaryButton";
import MapWidget from "../components/MapWidget";

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
            <MapWidget postcode={postcode} onChangeText={setNewPostcode} value={newPostcode} onPress={handleSearch} />
            {/* <Map
                apikey={"FjRYhw4teVr0pkKgzacHIVAyEXKoDe_G4jBNQhILcsQ"}
                postcode={postcode}
            />

            <View style={styles.inputContainer}>
                <RegisterContainer
                    placeholder={"Enter your postcode"}
                    onChangeText={setNewPostcode} // This listens for changes in the input field
                    value={newPostcode}
                />
                <PrimaryButton
                    title="Search"
                    style={{ width: 100 }}
                    onPress={handleSearch}
                />
            </View> */}
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
        position: "absolute",
        flexDirection: "row",
        bottom: 10,
        left: 10,
        right: 10,
        padding: 10,
        zIndex: 1,
    },
});
