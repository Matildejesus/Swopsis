import { StyleSheet, Text } from "react-native";
import { useState } from "react";

import Colors from "../../constants/colors";
import PinIcon from "../../components/icons/PinIcon";
import InputField from "../../components/authentication/InputField";
import InputTemplateWidget from "../../components/InputTemplateWidget";

function PostcodeScreen({ navigation }) {
    const [postcode, setPostcode] = useState("");
    const [error, setError] = useState("");

    const handleSearch = () => {
        if (!postcode) {
            setError("Postcode is required");
            return;
        }

        if (!parseInt(postcode) || !/^\d{4}$/.test(postcode)) {
            setError("Invalid Australian postcode");
            return;
        }

        setError("");
        navigation.navigate("Maps", { postcode });
    };

    const handleChange = (value) => {
        setPostcode(value);
        if (error) setError(""); // Clear error as user types
    };

    const content = () => {
        return (
            <>
            <PinIcon />
            <Text style={styles.title}> Find groups near you!</Text>
            <InputField
                placeholder={"Enter your postcode"}
                onChangeText={handleChange}
                value={postcode}
                error={error}
            />
            </>
        )
    }

    return (
        <InputTemplateWidget 
            title="Search" 
            handleSearch={handleSearch}
            content={content} 
            link={() => navigation.navigate("AmbassadorRequest")}
            linkText="Be an Ambassador"
        />
    );
}

export default PostcodeScreen;

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontFamily: "Raleway_700Bold",
        paddingBottom: 10,
        color: Colors.primary2,
    },
});
