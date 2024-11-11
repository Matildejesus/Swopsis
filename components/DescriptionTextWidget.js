import { StyleSheet, View, Text } from "react-native";
import Colors from "../constants/colors";

function DescriptionTextWidget({category, text, color}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{category}</Text>
            {!color ? (<Text style={styles.text}>{text}</Text>) : (color)}
        </View>

    )
}

export default DescriptionTextWidget;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginLeft: 52,
        marginRight: 41,
        marginBottom: 28,
    },
    text: {
        fontFamily: "RalewayBold",
        fontSize: 15,
        color: Colors.primary2,
        width: 130,
    }
})