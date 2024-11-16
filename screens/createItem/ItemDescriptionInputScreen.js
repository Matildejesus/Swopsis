import { useRoute } from "@react-navigation/native";
import { View, Text, Image, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import InputField from "../../components/authentication/InputField";
import { useState } from "react";

function ItemDescriptionInputScreen() {
    const route = useRoute();
    const {avatar, title, description, category} = route.params;
    const [Rtitle, setTitle] = useState();

    return (
        <View style={styles.container}> 
            <View style={styles.titleContainer}>
                {/* <Image style={styles.image} source={ {uri: avatar} } /> */}
                <Image style={styles.image} source={require("../../assets/images/jacket.png")} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </View>
            {/* <Text style={styles.label}>Title</Text> */}
            <View style={styles.input}>
                <InputField 
                    text="Size"
                    textStyle={styles.textStyle}
                    containerStyle={styles.titleField} 
                    placeholder="Write a post caption..." 
                    inputStyle={styles.text}
                    onChangeText={setTitle}
                    value={Rtitle}
                    secureTextEntry={false}
                />
            </View>
        </View>
    )
}

export default ItemDescriptionInputScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        paddingTop: 40,
        gap: 30,
    },
    image: {
        width: 95,
        height: 95,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.primary2,
    },
    title: {
        fontSize: 20,
        fontFamily: "InterBold",
        color: Colors.primary2,
    },
    description: {
        fontFamily: "RalewayRegular",
        fontSize: 15,
        color: Colors.primary2,
    }, 
    titleContainer: {
        flexDirection: "row",
        gap: 12,
        paddingRight: 40,
    },
    textContainer: {
        marginTop: 8,
        flexDirection: "column",
        gap: 11,
    }, 
    text: {
        color: Colors.primary2,
        fontFamily: "InterRegular",
        fontSize: 15,
    },
    titleField: {
        height: 37,
        marginHorizontal: 20,
        borderRadius: 10,
        justifyContent: "center",
        borderColor: Colors.primary2,
        borderWidth: 1,
        width: 128,
        paddingHorizontal: 13,
    },
    input: {
        flexDirection: "row",
    },
    textStyle: {
        marginTop: 10,
        fontFamily: "RalewayBold",
        fontSize: 15,
        color: Colors.primary1,
        marginRight: 72,
    }
})