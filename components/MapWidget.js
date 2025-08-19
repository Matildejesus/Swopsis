import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Map from "./Map";
import MainButton from "./MainButton";
import { useNavigation } from "@react-navigation/native";
import InputField from "./authentication/InputField";
import Colors from "../constants/colors";

function MapWidget({ postcode, onChangeText, value, onPress, error }) {
    const navigation = useNavigation();

    return (
        <View style={{flex: 1,}}>
            <Map
                apikey={"AIzaSyAUVZblxClNYeMChsYyN9dyVNLUU1T9Ezk"}
                postcode={postcode}
            />
            <TouchableOpacity 
                onPress={() => navigation.navigate("AmbassadorRequest")}
                style={styles.ambassadorLink}
            >
                <Text style={styles.link}>
                    Be an{" "}
                    <Text style={styles.register}>Ambassador</Text>
                </Text>
            </TouchableOpacity>

            <View style={styles.inputContainer}>
                <InputField
                    placeholder={"Enter your postcode"}
                    onChangeText={onChangeText}
                    value={value}
                    containerStyle={styles.textContainer}
                    error={error}
                />
                <MainButton
                    title="GO"
                    onPress={onPress}
                    style={styles.button}
                    textStyle={styles.text}
                    variant="primary"
                />
            </View>
        </View>
    )
}

export default MapWidget;

const styles = StyleSheet.create({
    container: {
        flex: 1
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
    button: {
        width: 70,
        height: 50,
    },
    text: {
        fontSize: 18,
        fontFamily: "Raleway_700Bold",
    },
    ambassadorLink: {
        position: "absolute",
        top: 40, 
        left: 15, // distance from left of screen
        zIndex: 2, // ensure it's above the map
        backgroundColor: Colors.impact, // optional for readability
        fontFamily: "Raleway_700Bold",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    link: {
        fontFamily: "Raleway_500Medium",
        color: Colors.primary2
    },
    register: {
        fontFamily: "Raleway_700Bold"
    }
})