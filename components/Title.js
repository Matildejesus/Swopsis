import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PinkBackArrow from "./icons/PinkBackArrow";
import Colors from "../constants/colors";

function Title(props) {
    const navigation = useNavigation();

    return (
        // <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.container}>
            {props.goBack ? (
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    hitSlop={{ top: 12, left: 12, right: 12, bottom: 12 }}
                    style={styles.backBtn}
                >
                    <PinkBackArrow />
                </TouchableOpacity>
            ) : null}
            {props.avatar && (
                <View style={styles.imageStyle}>
                    <Image source={{ uri: props.avatar }} style={styles.image} />
                </View>
            )}
    
            <Text
                style={{ fontWeight: "bold", fontSize: 20, color: "#8E0040" }}
            >
                {props.title}
            </Text>
        
        </View>
        // </TouchableOpacity>
    );
}


export default Title;

const styles = StyleSheet.create({
    container: {
        // marginLeft: 20,
      //  marginTop: 10,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
       // gap: 27,
    },
    imageStyle: {
        width: 40,
        height: 40,
        backgroundColor: Colors.primary1,
        borderRadius: 20,
        marginRight: 4,
        overflow: "hidden"
        
    }, 
    backBtn: {
        padding: 4, 
        marginRight: 6,
    },
    image: {
        width: "100%",
        height: "100%",
    },
});
