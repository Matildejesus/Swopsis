import { StyleSheet, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

function ColorCircle( {color} ) {
    return (
        <View>
            <Svg width={20} height={20}>
                <Circle cx={10} cy={10} r={10} fill={color}/>
            </Svg>
        </View>
    )
}

export default ColorCircle;

const styles = StyleSheet.create({
    container: {
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, 
    }
})