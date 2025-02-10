import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useState } from "react";

import PrimaryButton from "../components/PrimaryButton";
import Colors from "../constants/colors";
import RegisterContainer from "../components/authentication/RegisterContainer.js";
import { useLogin } from "../components/authentication/useLogin";
import ErrorMessage from "../components/ErrorMessage";

import { validate } from "validate.js";
import { useDebounce } from "use-debounce";
import constraints from "../constraints.js";

function LoginScreen({ navigation }) {
 // const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");
  // janedoe@gmail.com  Test12345
  // test@gmail.com Test12345
  // admin@gmail.com admin
  const [email, setEmail] = useState("janedoe@gmail.com");
  const [password, setPassword] = useState("Test12345");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [loginError, setLoginError] = useState(null);

  const [debouncedEmail] = useDebounce(email, 500);
  const [debouncedPassword] = useDebounce(password, 500);

  const { login, isLoading, error } = useLogin();
  
  function addEmailHandler(enteredEmail) {
    setEmail(enteredEmail);
  }

  function addPasswordHandler(enteredPassword) {
    setPassword(enteredPassword);
  }

  const submitHandler = () => {
    const validationResult = validate(
      { loginEmail: debouncedEmail, loginPassword: debouncedPassword },
      constraints
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

      if (!validationResult.loginEmail && !validationResult.loginPassword) {
        login({ email, password }, {
          onSettled: () => {
            setEmail("");
            setPassword("");
          },
          onError: (error) => {
            setError("Invalid email or password. Please try again.");
          },
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/simpleLogo.png")}
        style={styles.image}
      />
      <View style={styles.contentContainer}>
        <RegisterContainer
          placeholder="youremail@email.com"
          text="Email"
          onChangeText={addEmailHandler}
          value={email}
        />
        <ErrorMessage error={emailError} />
        <RegisterContainer
          placeholder="password"
          text="Password"
          onChangeText={addPasswordHandler}
          value={password}
          secureTextEntry={true}
        />
        <ErrorMessage error={passwordError} />
        <View style={styles.linkContainer}>
          <ErrorMessage error={error} />
          <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
            <Text style={styles.link}>Forgot your Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link}>Not a user? <Text style={styles.register}>Register</Text></Text>
          </TouchableOpacity>
        </View>

        <PrimaryButton
          title="LOG IN"
          style={{ width: 200 }}
          onPress={submitHandler}
        />
        <ErrorMessage error={loginError} />
      </View>
    </View>
  );
}

export default LoginScreen;

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
    height: 370,
    width: 283,
    zIndex: 1,
   // paddingTop: 114,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 173,
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
    marginBottom: 31,
    gap: 7,
  },
  register: {
    fontFamily: "RalewayBold",
  },
});