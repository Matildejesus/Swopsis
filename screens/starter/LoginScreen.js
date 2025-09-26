import { useState } from "react";
import { validate } from "validate.js";
import { useDebounce } from "use-debounce";
import constraints from "../../constraints.js";
import InputField from "../../components/authentication/InputField.js";
import InputTemplateWidget from "../../components/InputTemplateWidget.js";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../../constants/colors.js";
import { useLogin } from "../../hooks/auth/useLogin.js";

function LoginScreen({ navigation }) {

    // const [email, setEmail] = useState("dresstoexpress2@gmail.com");
    // const [password, setPassword] = useState("Dte2025Swop");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [loginError, setLoginError] = useState(null);

    const [debouncedEmail] = useDebounce(email, 500);
    const [debouncedPassword] = useDebounce(password, 500);

    const { login } = useLogin();

    function addEmailHandler(enteredEmail) {
        setEmail(enteredEmail);
    }

    function addPasswordHandler(enteredPassword) {
        setPassword(enteredPassword);
    }

    const submitHandler = () => {
        const validationResult = validate(
            { loginEmail: debouncedEmail, loginPassword: debouncedPassword },
            constraints,
        );

        if (validationResult) {
            if (validationResult.loginEmail) {
                setEmailError(validationResult.loginEmail[0]);
            } else {
                setEmailError(null);
            }

            if (validationResult.loginPassword) {
                setPasswordError(validationResult.loginPassword[0]);
            } else {
                setPasswordError(null);
            }

            if (
                !validationResult.loginEmail &&
                !validationResult.loginPassword
            ) {
                login(
                    { email, password },
                    {
                        onSettled: () => {
                            setEmail("");
                            setPassword("");
                        },
                        onError: (error) => {
                            setLoginError(
                                "Invalid email or password. Please try again.",
                            );
                        },
                    },
                );
            }
        }
    };

    const content = () => {
        return (
            <>
            <InputField
                placeholder="youremail@email.com"
                text="Email"
                onChangeText={addEmailHandler}
                value={email}
                error={emailError}
                containerStyle={styles.containerStyle}
            />
            <InputField
                placeholder="password"
                text="Password"
                onChangeText={addPasswordHandler}
                value={password}
                secureTextEntry={true}
                error={passwordError}
                containerStyle={styles.containerStyle}
            />
            </>

        )
    }

    const anotherLink = () => {
        return(
            <TouchableOpacity
                onPress={() => navigation.navigate("ResetPassword")}
            >
                <Text style={{ color: Colors.primary2, fontFamily: "Raleway_600SemiBold" }}>Forgot your Password?</Text>
            </TouchableOpacity>
        )
    }

    return (
        <InputTemplateWidget 
            title="LOG IN" 
            handleSearch={submitHandler}
            content={content} 
            link={() => navigation.navigate("Register")}
            linkText={
                <Text>
                    Not a user? <Text style={{ fontFamily: "Raleway_700Bold" }}>Register</Text>
                </Text>
            }
            submitError={loginError}
            anotherLink={anotherLink}
        />
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    containerStyle: {
        // //  marginHorizontal: 20,
        // // borderRadius: 10,
        // // borderColor: Colors.primary2,
        // // borderWidth: 1,
        // width: 243,
        // backgroundColor: "white",
        // opacity: 0.76,
        // paddingHorizontal: 13,
        // paddingVertical: 16,
    }
})