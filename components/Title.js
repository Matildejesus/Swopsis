import { View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PinkBackArrow from "./icons/PinkBackArrow";
import Colors from "../constants/colors";

function Title(props) {
    const navigation = useNavigation();
    console.log("title: ", props.avatar);

    return (
        <View style={styles.container}>
             {props.goBack ? (
                <PinkBackArrow onPress={() => navigation.goBack()} />
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
    );
}


export default Title;

const styles = StyleSheet.create({
    container: {
        // marginLeft: 20,
        marginTop: 10,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 27,
    },
    imageStyle: {
        width: 40,
        height: 40,
        backgroundColor: Colors.primary1,
        borderRadius: 20,
        marginRight: 4,
        marginLeft: 21,
        marginBottom: 20,
        overflow: "hidden",
        
    }, 
    image: {
        width: "100%",
        height: "100%",
    },
});
