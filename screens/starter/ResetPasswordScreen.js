import { StyleSheet, Text } from "react-native";
import { useState } from "react";
import Colors from "../../constants/colors";
import { changePassword } from "../../services/apiPassword";
import { useNavigation } from "@react-navigation/native";
import InputField from "../../components/authentication/InputField";
import InputTemplateWidget from "../../components/InputTemplateWidget";

function ResetPasswordScreen() {
    const [email, setEmail] = useState("");
    const navigation = useNavigation();

    function addEmailHandler(enteredEmail) {
        setEmail(enteredEmail);
    }

    function handlePasswordReset() {
        if (email) {
            changePassword(email);
            console.log(email);
            console.log("email sent");
            setTimeout(() => {
                navigation.goBack("Login");
            }, 4000);
        }
    }

    const content = () => {
        return (
            <InputField
                placeholder="youremail@email.com"
                text="Email"
                onChangeText={addEmailHandler}
                value={email}
            />
        )
    }

    return (
        <InputTemplateWidget 
            title="RESET PASSWORD" 
            handleSearch={() => {handlePasswordReset();}}
            content={content} 
            link={() => navigation.goBack()}
            linkText={
                <Text style={styles.link}>Go Back?</Text>
            }
        />
    );
}

export default ResetPasswordScreen;

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
        height: 400,
        width: 283,
        zIndex: 1,
        // marginTop: 100,
        paddingTop: 135,
        // paddingBottom: 70,
        marginBottom: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 137,
        height: 200,
        // left: 207,
        // top: 160,
        // position: "absolute",
        // zIndex: 2,
    }, 
    link: {
        color: Colors.primary2,
        fontSize: 15,
        fontFamily: "RalewayMedium",
    }, 
    linkContainer: {
        marginTop: 20,
        marginBottom: 0,
        gap: 7,
    },
    buttonContainer: {
        paddingBottom: 70,
    }
});
