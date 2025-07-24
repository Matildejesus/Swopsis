import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/colors";
import MainButton from "./MainButton";
import ErrorMessage from "./ErrorMessage";
import Logo from "./icons/Logo";


function InputTemplateWidget({content, title, handleSearch, link, linkText, anotherLink, submitError}) {
    return (
        <View style={styles.container}>
            <Logo />
            <View style={styles.contentContainer}>
                {content()}
                <View style={styles.loginError}>
                    <ErrorMessage error={submitError} />
                </View>
                <View>
                    {anotherLink && anotherLink()}
                    <TouchableOpacity onPress={link}>
                        <Text style={styles.link}>
                            {linkText}
                        </Text>
                    </TouchableOpacity>
                </View>
                <MainButton
                    title={title}
                    style={{ width: 200 }}
                    onPress={handleSearch}
                    variant="primary"
                />
            </View>
        </View>
    )
}

export default InputTemplateWidget;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.impact,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    contentContainer: {
        borderRadius: 51,
        backgroundColor: "white",
        opacity: 0.9,
        shadowColor: "black",
        shadowOpacity: 0.24,
        shadowRadius: 8.5,
        shadowOffset: { width: 4, height: 5 },
        height: 432,
        width: 283,
        zIndex: 1,
        // paddingTop: 114,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 173,
        height: 200,
    },
    title: {
        fontSize: 18,
        fontFamily: "RalewayBold",
        paddingBottom: 10,
        color: Colors.primary2,
    },
    text: {
        fontSize: 12,
        paddingHorizontal: 30,
        paddingTop: 18,
        color: Colors.primary2,
        fontFamily: "RalewayRegular"
    },
    link: {
        color: Colors.primary2,
        fontSize: 15,
        fontFamily: "RalewayMedium",
        paddingBottom: 15,
        marginTop: 10,
    },
    register: {
        fontFamily: "RalewayBold",
    },
    loginError: {
        width: 170,
        height: 40,
    }
})