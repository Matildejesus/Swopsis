import { useState } from "react";

import { useLogin } from "../../hooks/useLogin.js";

import { validate } from "validate.js";
import { useDebounce } from "use-debounce";
import constraints from "../../constraints.js";
import InputField from "../../components/authentication/InputField.js";
import InputTemplateWidget from "../../components/InputTemplateWidget.js";
import { Text, TouchableOpacity } from "react-native";
import Colors from "../../constants/colors.js";

function LoginScreen({ navigation }) {

    const [email, setEmail] = useState("janedoe@gmail.com");
    const [password, setPassword] = useState("Test12345");
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [loginError, setLoginError] = useState(null);

    const [debouncedEmail] = useDebounce(email, 500);
    const [debouncedPassword] = useDebounce(password, 500);

    const { login, error } = useLogin();

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
            />
            <InputField
                placeholder="password"
                text="Password"
                onChangeText={addPasswordHandler}
                value={password}
                secureTextEntry={true}
                error={passwordError}
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
