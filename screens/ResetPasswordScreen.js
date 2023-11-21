import { View, Image, StyleSheet } from "react-native";
import RegisterContainer from "../components/authentication/RegisterContainer";
import PrimaryButton from "../components/PrimaryButton";
import { useState } from "react";
import Colors from "../constants/colors";
import { changePassword } from "../services/apiPassword";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

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
      Toast.show({
        type: "success",
        text1: "Email sent.",
        visibilityTime: 4000,
        autoHide: true,
      });
      setTimeout(() => {
        navigation.navigate("Login"); // Replace "NextScreen" with the name of your next screen
      }, 4000);
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

        <PrimaryButton
          title="Reset Password"
          style={{ width: 200, marginTop: 50 }}
          onPress={() => {
            handlePasswordReset();
          }}
        />
      </View>
    </View>
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
    height: 271,
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
    height: 160,
    left: 207,
    top: 160,
    position: "absolute",
    zIndex: 2,
  },
});
