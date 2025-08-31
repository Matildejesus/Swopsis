import { useState } from "react";
import { StyleSheet, View } from "react-native";
import MapWidget from "../../components/MapWidget";

function MapsScreen({ route }) {
    const [newPostcode, setNewPostcode] = useState("");
    const [postcode, setPostcode] = useState(route.params.postcode);
    const groups = route.params.groups;

    const [error, setError ] = useState("");

    const handleSearch = () => {
        if (!newPostcode) {
            setError("Postcode is required");
            return;
        }

        if (!parseInt(newPostcode) || !/^\d{4}$/.test(newPostcode)) {
            setError("Invalid Australian postcode");
            return;
        }

        setPostcode(newPostcode);
        setNewPostcode(""); 
        setError("");
        console.log("New postcode set: " + newPostcode);
    };

    return (
        <View style={styles.container}>
            <MapWidget postcode={postcode} onChangeText={setNewPostcode} value={newPostcode} onPress={handleSearch} error={error} groups={groups} />
            
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
