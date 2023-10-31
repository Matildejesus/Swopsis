import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import { useState, useEffect } from "react";

import PrimaryButton from "../components/PrimaryButton";
import Colors from "../constants/colors";
import InputField from "../components/InputField";

import { useDispatch } from "react-redux";
import { setUserInfo } from "../store/userInfo";
import { validate } from "validate.js";
import { useDebounce } from "use-debounce";

import constraints from "../constraints.js";

function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [userNameError, setUserNameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const [debouncedEmail] = useDebounce(email, 500);
  const [debouncedUserName] = useDebounce(userName, 500);
  const [debouncedPassword] = useDebounce(password, 500);

  useEffect(() => {
    if (debouncedEmail) {
      const validationResult = validate(
        { emailAddress: debouncedEmail },
        constraints
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
        constraints
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
        constraints
      );

      if (validationResult && validationResult.userName) {
        setUserNameError(validationResult.userName[0]);
      } else {
        setUserNameError(null);
      }
    }
  }, [debouncedUserName]);

  function addUserNameHandler(enteredUserName) {
    setUserName(enteredUserName);
  }

  function addPasswordHandler(enteredPassword) {
    setPassword(enteredPassword);
  }

  const submitHandler = () => {
    if (!emailError && !userNameError && !passwordError) {
      dispatch(
        setUserInfo({
          userName: userName,
          email: email,
          password: password,
        })
      );
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "InApp",
            params: {
              screen: "Profile",
              initial: false,
              params: {
                name: userName,
              },
            },
          },
        ],
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/simpleLogo.png")}
        style={styles.image}
      />
      <View style={styles.contentContainer}>
        <InputField
          placeholder="enter your name"
          text="Name"
          onChangeText={setUserName}
          value={userName}
        />
        {userNameError && <Text style={{ color: "red" }}>{userNameError}</Text>}
        <InputField
          placeholder="youremail@email.com"
          text="Email"
          onChangeText={setEmail}
          value={email}
        />
        {emailError && <Text style={{ color: "red" }}>{emailError}</Text>}
        <InputField
          placeholder="password"
          text="Password"
          onChangeText={setPassword}
          value={password}
        />
        {passwordError && <Text style={{ color: "red" }}>{passwordError}</Text>}
        <Text style={styles.link}>Forgot your password?</Text>
        <PrimaryButton
          title="REGISTER"
          style={{ width: 200 }}
          onPress={submitHandler}
        />
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
    height: 432,
    width: 283,
    zIndex: 1,
    paddingTop: 114,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 137,
    height: 160,
    left: 207,
    top: 120,
    position: "absolute",
    zIndex: 2,
  },
  link: {
    marginTop: 29,
    marginBottom: 31,
    color: Colors.primary2,
    fontSize: 15,
  },
});
