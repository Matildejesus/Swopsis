import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";

import PrimaryButton from "../components/PrimaryButton";
import Colors from "../constants/colors";

import { validate } from "validate.js";
import { useDebounce } from "use-debounce";

import constraints from "../constraints.js";
import InputForm from "../components/authentication/InputForm";
import { useRegister } from "../components/authentication/useRegister";

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

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/images/simpleLogo.png")}
                style={styles.image}
            />
            <View style={styles.contentContainer}>
                <InputForm
                    setUserName={setUserName}
                    userName={userName}
                    userNameError={userNameError}
                    setEmail={setEmail}
                    email={email}
                    emailError={emailError}
                    setPassword={setPassword}
                    password={password}
                    passwordError={passwordError}
                />
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.link}>
                        Already a user?
                        <Text style={styles.signIn}> Sign in</Text>
                    </Text>
                </TouchableOpacity>
                <PrimaryButton
                    title="REGISTER"
                    style={{ width: 200 }}
                    onPress={submitHandler}
                />
            </View>
        </View>
    );
}

export default RegisterScreen;

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
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 173,
        height: 200,
    },
    link: {
        marginTop: 29,
        marginBottom: 31,
        color: Colors.primary2,
        fontSize: 15,
    },
    signIn: {
        fontFamily: "RalewayBold",
    },
});
