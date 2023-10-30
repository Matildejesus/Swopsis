import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import { useState } from "react";

import PrimaryButton from "../components/PrimaryButton";
import Colors from "../constants/colors";
import InputField from "../components/InputField";

function LoginScreen({ navigation }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function addUserNameHandler(enteredUserName) {
    setUserName(enteredUserName);
  }

  function addPasswordHandler(enteredPassword) {
    setPassword(enteredPassword);
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/simpleLogo.png")}
        style={styles.image}
      />
      <View style={styles.contentContainer}>
        <InputField
          placeholder="youremail@email.com"
          text="Email"
          onChangeText={addUserNameHandler}
          value={userName}
        />
        <InputField
          placeholder="password"
          text="Password"
          onChangeText={addPasswordHandler}
          value={password}
        />
        <Text style={styles.link}>Forgot your password?</Text>
        <PrimaryButton
          title="LOG IN"
          style={{ width: 200 }}
          onPress={() => {
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
  },
});
