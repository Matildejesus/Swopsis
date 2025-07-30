import { Text } from "react-native";
import { useState, useEffect } from "react";

import { validate } from "validate.js";
import { useDebounce } from "use-debounce";

import constraints from "../../constraints.js";
import { useRegister } from "../../hooks/auth/useRegister.js";
import InputTemplateWidget from "../../components/InputTemplateWidget.js";
import InputField from "../../components/authentication/InputField.js";

function RegisterScreen({ navigation }) {
    const { register, isLoading } = useRegister();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(null);
    const [userNameError, setUserNameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const [debouncedEmail] = useDebounce(email, 1000);
    const [debouncedUserName] = useDebounce(userName, 1000);
    const [debouncedPassword] = useDebounce(password, 1000);

    useEffect(() => {
        if (debouncedEmail) {
            const validationResult = validate(
                { emailAddress: debouncedEmail },
                constraints,
            );

            if (validationResult && validationResult.emailAddress) {
                setEmailError(validationResult.emailAddress[0]);
            } else {
                setEmailError(null);
            }
        }
    }, [debouncedEmail]);

    useEffect(() => {
        if (debouncedPassword) {
            const validationResult = validate(
                { password: debouncedPassword },
                constraints,
            );

            if (validationResult && validationResult.password) {
                setPasswordError(validationResult.password[0]);
            } else {
                setPasswordError(null);
            }
        }
    }, [debouncedPassword]);

    useEffect(() => {
        if (debouncedUserName) {
            const validationResult = validate(
                { userName: debouncedUserName },
                constraints,
            );

            if (validationResult && validationResult.userName) {
                setUserNameError(validationResult.userName[0]);
            } else {
                setUserNameError(null);
            }
        }
    }, [debouncedUserName]);

    const submitHandler = () => {
        if (!emailError && !userNameError && !passwordError) {
            register(
                { userName, email, password },
                {
                    onSettled: () => {
                        setEmail("");
                        setPassword("");
                    },
                },
            );
            
        }
    };

    const content = () => {
        return (
            <>
                <InputField
                    placeholder="enter your name"
                    text="Name"
                    onChangeText={setUserName}
                    value={userName}
                    error={userNameError}
                />
                <InputField
                    placeholder="youremail@email.com"
                    text="Email"
                    onChangeText={setEmail}
                    value={email}
                    error={emailError}
                />
                <InputField
                    placeholder="password"
                    text="Password"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                    error={passwordError}
                />
            </>
        )
    }

    return (
        <InputTemplateWidget 
            title="REGISTER" 
            handleSearch={submitHandler}
            content={content} 
            link={() => navigation.navigate("Login")}
            linkText={
            <Text>
                Already a user? <Text style={{ fontFamily: "Raleway_700Bold" }}>SignIn</Text>
            </Text>
            }
        />

    );
}

export default RegisterScreen;