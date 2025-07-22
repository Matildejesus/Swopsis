import { View, StyleSheet, Text } from "react-native";
import UnderConstruction from "../../components/UnderConstruction";

function BeYouScreen() {
    return (
        <View style={styles.container}>
            <UnderConstruction />
        </View>
    );
}

export default BeYouScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
