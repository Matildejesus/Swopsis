import Colors from "../constants/colors";
import ConstructIcon from "./icons/ConstructIcon";
import WarningIcon from "./icons/WarningIcon";
import { StyleSheet, Text, View } from "react-native";

function UnderConstruction() {
    return (
        <View style={styles.container}>
            <View style={styles.columnContainer}>
                <WarningIcon />
                <Text style={styles.text}>UNDER</Text>
                <Text style={styles.text}>CONSTRUCTION</Text>
                <ConstructIcon />
            </View>
        </View>
    );
}

export default UnderConstruction;

const styles = StyleSheet.create({
    text: {
        fontFamily: "Raleway_700Bold",
        fontSize: 30,
        color: Colors.primary2,
        //   paddingTop: 30,
    },
    container: {
        //  gap: 10,
        paddingTop: 100,
    },
    columnContainer: {
        alignItems: "center",
        gap: 30,
    },
});
