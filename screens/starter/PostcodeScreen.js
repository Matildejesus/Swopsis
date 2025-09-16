import { StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";

import Colors from "../../constants/colors";
import PinIcon from "../../components/icons/PinIcon";
import InputField from "../../components/authentication/InputField";
import InputTemplateWidget from "../../components/InputTemplateWidget";
import { getGroups } from "../../services/apiGroups";

function PostcodeScreen({ navigation }) {
    const [postcode, setPostcode] = useState("");
    const [error, setError] = useState("");
    const [ allGroups, setAllGroups ] = useState([]);
    const [loading, setLoading] = useState(true);

    print("in postcode screen");
    useEffect(() => {
        const fetchData = async () => {
            try {
            const fetched = await getGroups();
            setAllGroups(Array.isArray(fetched) ? fetched : []);
            } catch (e) {
            console.error("Failed to fetch groups:", e);
            setAllGroups([]); // safe fallback
            } finally {
            setLoading(false);
            }
        };
        fetchData();
    }, []);

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
        navigation.navigate("Maps", { postcode, groups: allGroups });
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
            page="postcode"
            groups={allGroups}
            loading={loading}
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
