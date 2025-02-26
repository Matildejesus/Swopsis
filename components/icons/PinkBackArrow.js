import { StyleSheet, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

function PinkBackArrow({ onPress }) {
    return (
        <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="23"
                viewBox="0 0 16 23"
                fill="none"
            >
                <Path
                    d="M11.5 0L0 11.5L11.5 23L15.8125 18.6875L8.625 11.5L15.8125 4.3125L11.5 0Z"
                    fill="#8E0040"
                />
            </Svg>
        </TouchableOpacity>
        </View>
    );
}

export default PinkBackArrow;

const styles = StyleSheet.create({
    container: {
        marginRight: 27,
    }
})