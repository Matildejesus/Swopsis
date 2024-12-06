import { StyleSheet, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

function ColorCircle( {color, style} ) {
    return (
        <View style={[styles.circle, { backgroundColor: color }, style ]} />
    )
}

export default ColorCircle;

const styles = StyleSheet.create({
    circle: {
        height: 25,
        width: 25,
        borderRadius: 100 / 2,
        borderWidth: 1,
       // margin: 12,
    }
})