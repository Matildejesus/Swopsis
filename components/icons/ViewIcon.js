import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

function ViewIcon({ onPress, color }) {
    const navigation = useNavigation();
    return (
    <TouchableOpacity onPress={onPress}>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="24"
                viewBox="0 0 27 24"
                fill="none"
            >
                <Path
                    d="M25.9875 8.10884C22.869 3.20834 18.306 0.386841 13.5 0.386841C11.097 0.386841 8.7615 1.08884 6.6285 2.39834C4.4955 3.72134 2.5785 5.65184 1.0125 8.10884C-0.3375 10.2284 -0.3375 13.6709 1.0125 15.7904C4.131 20.7044 8.694 23.5124 13.5 23.5124C15.903 23.5124 18.2385 22.8104 20.3715 21.5009C22.5045 20.1779 24.4215 18.2474 25.9875 15.7904C27.3375 13.6844 27.3375 10.2284 25.9875 8.10884ZM13.5 17.4104C10.476 17.4104 8.046 14.9669 8.046 11.9564C8.046 8.94584 10.476 6.50234 13.5 6.50234C16.524 6.50234 18.954 8.94584 18.954 11.9564C18.954 14.9669 16.524 17.4104 13.5 17.4104Z"
                    fill={color ? color: "#8E0040"}
                />
                <Path
                    d="M13.4978 8.09662C11.3783 8.09662 9.65039 9.82459 9.65039 11.9576C9.65039 14.0771 11.3783 15.8051 13.4978 15.8051C15.6173 15.8051 17.3588 14.0771 17.3588 11.9576C17.3588 9.83809 15.6173 8.09662 13.4978 8.09662Z"
                    fill={color ? color: "#8E0040"}
                />
            </Svg>
        </TouchableOpacity>
    );
}

export default ViewIcon;
