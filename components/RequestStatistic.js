import { View, Text, StyleSheet } from "react-native";

function RequestStatistic({ number, text }) {
    return (
        <View style={styles.layout}>
            <Text style={styles.number}>{number}</Text>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

export default RequestStatistic;

const styles = StyleSheet.create({
    layout: {
       gap: 10,
       alignContent: "center",
       alignItems: "center",
    },
    number: {
        fontFamily: "InterBold",
        fontSize: 15,
        color: "#FB5099"
    },
    text: {
        fontFamily: "RalewayMedium",
        fontSize: 15,
        width: 66,
        color: "#FB5099"

    }
});