import { StyleSheet, View, Text } from "react-native";
import Colors from "../../constants/colors";
import ContactIcon from "../icons/ContactIcon";
import PenIcon from "../icons/PenIcon";

function ReviewButton() {
    return (
        <View style={styles.button}>
            <Text style={styles.label}>REVIEW</Text>
            <PenIcon />
        </View>
    )
}

export default ReviewButton;

const styles = StyleSheet.create({
    button: {
        borderColor: Colors.primary1,
        flexDirection: "row",
        width: 135,
        height: 36,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 27.5,
        paddingHorizontal: 10,
        gap: 2,
    },
    label: {
        fontFamily: "RalewayMedium",
        fontSize: 15,
        color: Colors.primary1,
    }
})