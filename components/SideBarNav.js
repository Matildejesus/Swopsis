import { StyleSheet, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

function SideBarNav({ navigation }) {
    return(
        <View>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path d="M19.8677 3.10431H0.109863V4.86056H19.8677V3.10431Z" fill="#8E0040"/>
                    <Path d="M19.8677 9.11066H0.109863V10.8669H19.8677V9.11066Z" fill="#8E0040"/>
                    <Path d="M19.8677 15.1171H0.109863V16.8733H19.8677V15.1171Z" fill="#8E0040"/>
                </Svg>
            </TouchableOpacity>
        </View>
    )
}

export default SideBarNav;

const styles = StyleSheet.create({
    container:{

    }
})