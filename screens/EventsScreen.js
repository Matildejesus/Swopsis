import { View, StyleSheet, Text } from "react-native";
import UnderConstruction from "../components/UnderConstruction";

function EventsScreen() {
    return (
        <View style={styles.container}>
            <UnderConstruction />
        </View>
    );
}

export default EventsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
