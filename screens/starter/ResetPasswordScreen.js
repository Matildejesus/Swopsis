import { Text } from "react-native";
import { useState } from "react";
import Colors from "../../constants/colors";
import { changePassword } from "../../services/apiPassword";
import { useNavigation } from "@react-navigation/native";
import InputField from "../../components/authentication/InputField";
import InputTemplateWidget from "../../components/InputTemplateWidget";
import { useResponsive } from "../../utils/responsive";

function ResetPasswordScreen() {
    const {scaleFont} = useResponsive();
    const [email, setEmail] = useState("");
    const navigation = useNavigation();

    function addEmailHandler(enteredEmail) {
        setEmail(enteredEmail);
    }

    function handlePasswordReset() {
        if (email) {
            changePassword(email);
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
                <Text style={{ color: Colors.primary2,
        fontSize: 15,
        fontFamily: "Raleway_500Medium"}}>Go Back?</Text>
            }
        />
    );
}

export default ResetPasswordScreen;
