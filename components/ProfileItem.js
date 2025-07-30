import { useNavigation } from "@react-navigation/native";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import Colors from "../constants/colors";

function ProfileItem({ style, source, itemData }) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate("ProfileItem", {
                    itemData: itemData,
                    owner: true,
                })
            }
        >
            <View style={style}>
                <Image
                    source={{ uri: source }}
                    style={styles.image}
                    // resizeMode="contain"
                />
            </View>
            { itemData.available == false && itemData.method == "swap" &&
            (<Text style={styles.overText}> SWAPPED </Text>)}
            { itemData.available == false && itemData.method == "loan" && 
            (<Text style={styles.overText}> LOANED </Text>)}
        </TouchableOpacity>
    );
}
export default ProfileItem;

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    overText: {
        position: "absolute",
        top: "52%",
        left: 7,
        width: 130,
        backgroundColor: "white",
        opacity: 0.7,
        paddingLeft: 24,
        transform: [{ rotate: "45deg" }],
        fontFamily: "RalewayBold",
        fontSize: 15,
        color: Colors.primary2,
        borderRadius: 20,
    }
});
