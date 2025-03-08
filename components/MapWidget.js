import { StyleSheet, View } from "react-native";
import Map from "./Map";
import RegisterContainer from "./authentication/RegisterContainer";
import PrimaryButton from "./PrimaryButton";

function MapWidget({ postcode, onChangeText, value, onPress }) {
    return (
        <View style={{flex: 1,}}>
            <Map
                apikey={"FjRYhw4teVr0pkKgzacHIVAyEXKoDe_G4jBNQhILcsQ"}
                postcode={postcode}
            />

            <View style={styles.inputContainer}>
                <RegisterContainer
                    placeholder={"Enter your postcode"}
                    onChangeText={onChangeText} // This listens for changes in the input field
                    value={value}
                    containerStyle={styles.textContainer}
                />
                <PrimaryButton
                    title="GO"
                    onPress={onPress}
                    style={styles.button}
                    textStyle={styles.text}
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