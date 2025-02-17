import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

function PinkNextArrow({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="23"
                viewBox="0 0 16 23"
                fill="none"
            >
                <Path
                    d="M4.3125 23L15.8125 11.5L4.3125 0L9.53674e-07 4.3125L7.1875 11.5L9.53674e-07 18.6875L4.3125 23Z"
                    fill="#8E0040"
                />
            </Svg>
        </TouchableOpacity>
    );
}

export default PinkNextArrow;
