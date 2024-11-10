import HeartIcon from "./icons/HeartIcon";
import FilledHeartIcon from "./icons/FilledHeartIcon";
import { TouchableOpacity } from "react-native";
import { useState } from "react";

function HeartSwitch( {onClick} ) {
    const [isFilled, setIsFilled] = useState(false);

    const handleToggle = () => {
        setIsFilled(!isFilled);
    }
    return (
        <TouchableOpacity onPress={handleToggle} >
            {!isFilled ? <HeartIcon /> :
            <FilledHeartIcon /> }
        </TouchableOpacity>
    )
}

export default HeartSwitch;