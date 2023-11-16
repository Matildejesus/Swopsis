import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../store/userInfo";
import Toast from "react-native-toast-message";

import PrimaryButton from "../components/PrimaryButton";
import Colors from "../constants/colors";
import RegisterContainer from "../components/authentication/RegisterContainer.js";
import { USERINFO } from "../data/dummy-data.js";
import { useLogin } from "../components/authentication/useLogin";
import ErrorMessage from "../components/ErrorMessage";
import { changePassword } from "../services/apiPassword";
import { useUser } from "../components/authentication/useUser";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const dispatch = useDispatch();

  function addEmailHandler(enteredEmail) {
    setEmail(enteredEmail);
  }

  function addPasswordHandler(enteredPassword) {
    setPassword(enteredPassword);
  }

  function handlePasswordReset() {
    if (email) {
      changePassword(email);
      console.log(email);
      console.log("email sent");
    }
  }

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
        <RegisterContainer
          placeholder="password"
          text="Password"
          onChangeText={addPasswordHandler}
          value={password}
          secureTextEntry={true}
        />
        <ErrorMessage error={error} />
        <TouchableOpacity onPress={() => handlePasswordReset()}>
          <Text style={styles.link}>Forgot your Password?</Text>
        </TouchableOpacity>

        <PrimaryButton
          title="LOG IN"
          style={{ width: 200 }}
          onPress={() => {
            if (!email || !password) return;
            login(
              { email, password },
              {
                onSettled: () => {
                  setEmail("");
                  setPassword("");
                },
              }
            );
          }}
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
    height: 370,
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
    top: 160,
    position: "absolute",
    zIndex: 2,
  },
  link: {
    marginTop: 29,
    marginBottom: 31,
    color: Colors.primary2,
    fontSize: 15,
    fontFamily: "RalewayMedium",
  },
});
