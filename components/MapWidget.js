import { StyleSheet, TouchableOpacity, View, TextComponent, Text } from "react-native";
import Map from "./Map";
import MainButton from "./MainButton";
import { useNavigation } from "@react-navigation/native";
import InputField from "./authentication/InputField";

function MapWidget({ postcode, onChangeText, value, onPress, error }) {
    const navigation = useNavigation();

    return (
        <View style={{flex: 1,}}>
            <Map
                apikey={"FjRYhw4teVr0pkKgzacHIVAyEXKoDe_G4jBNQhILcsQ"}
                postcode={postcode}
            />
            <TouchableOpacity onPress={() => navigation.navigate("AmbassadorRequest")}>
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
        fontFamily: "RalewayBold"
    },
})