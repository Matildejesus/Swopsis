import { useState } from "react";
import { View } from "react-native";
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
    };

    return (
        <View style={{flex: 1}}>
            <MapWidget postcode={postcode} onChangeText={setNewPostcode} value={newPostcode} onPress={handleSearch} error={error} groups={groups} />
            
        </View>
    );
}

export default MapsScreen;
