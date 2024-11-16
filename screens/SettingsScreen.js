import { View, Text, StyleSheet } from "react-native";
import PicturePicker from "../components/PicturePicker";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import SettingsInputField from "../components/SettingsInputField";

import { useSelector } from "react-redux";
import { useLogout } from "../components/authentication/useLogout";
import Colors from "../constants/colors";
import Line from "../components/Line";
import { useUser } from "../components/authentication/useUser";
import { useState } from "react";
import { useUpdateUser } from "../components/authentication/useUpdateUser";

function SettingsScreen() {
  const userPassword = useSelector((state) => state.userInfo.password);
  const { logout, isLoading } = useLogout();

  const {
    user: {
      email,
      user_metadata: { userName: currentUserName, avatar: currentAvatar },
    },
  } = useUser();

  const { updateUser, isUpdating } = useUpdateUser();

  const [userName, setUserName] = useState(currentUserName);
  const [userEmail, setUserEmail] = useState(email);
  const [userAvatar, setUserAvatar] = useState(currentAvatar);

  const handleImageSelected = (newAvatarUri) => {
    setUserAvatar(newAvatarUri);
    updateUser({ avatar: newAvatarUri });
  };

  function updateUserNameHandler(enteredUserName) {
    setUserName(enteredUserName);
  }

  function updateEmailHandler(enteredEmail) {
    setUserEmail(enteredEmail);
  }

  function handleSubmit() {
    if (!userName) return;
    updateUser({ userName });
  }

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <PicturePicker 
            userPicture={userAvatar} 
            onImageSelected={handleImageSelected} 
            imageStyle={styles.profileImage}/>
      </View>
      <View style={styles.groupContainer}>
        <Text style={styles.header}>Info</Text>
        <SettingsInputField
          placeholder={userName}
          text={"Username"}
          onChangeText={updateUserNameHandler}
          editable={true}
          // value={userName}
        />
        <SettingsInputField
          placeholder={email}
          text={"Email"}
          onChangeText={updateEmailHandler}
          editable={false}
          value={userEmail}
        />
      </View>
      <View style={styles.groupContainer}>
        <Text style={styles.header}>Change Password</Text>
        <SettingsInputField
          placeholder={"**********"}
          text={"Current Password"}
          secureTextEntry={true}
        />
        <SettingsInputField placeholder={"**********"} text={"New Password"} secureTextEntry={true}/>
        <SettingsInputField placeholder={"**********"} text={"Confirm Password"} secureTextEntry={true}/>
      </View>
      <Line />
      <View style={styles.buttonContainer}>
        <SecondaryButton title="LOG OUT" onPress={logout}></SecondaryButton>
        <PrimaryButton title="UPDATE" onPress={handleSubmit}></PrimaryButton>
      </View>
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    paddingTop: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
  center: {
    // f/lex: 1,
    alignItems: "center",
  },
  header: {
    color: Colors.primary1,
    fontFamily: "InterRegular",
    fontSize: 18,
    marginBottom: 18,
  },
  groupContainer: {
    marginLeft: 43,
    marginBottom: 35,
  },
  buttonContainer: {
    marginTop: 18,
    flexDirection: "row",
    gap: 50,
    alignSelf: "center",
  },
  profileImage: {
    width: 112,
    height: 114,
    borderRadius: 21,
  },
});