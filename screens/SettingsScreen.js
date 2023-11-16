import { View, Text, StyleSheet } from "react-native";
import PicturePicker from "../components/PicturePicker";
import PrimaryButton from "../components/PrimaryButton";
import SettingsInputField from "../components/SettingsInputField";

import { useDispatch, useSelector } from "react-redux";
import { useLogout } from "../components/authentication/useLogout";

function SettingsScreen() {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.userInfo.userName);
  const userEmail = useSelector((state) => state.userInfo.email);
  const userPassword = useSelector((state) => state.userInfo.password);
  const { logout, isLoading } = useLogout();

  return (
    <View style={styles.container}>
      <PicturePicker />
      <Text>Info</Text>
      {/* <SettingsInputField
        placeholder={userName}
        text={"Username"}
        onChangeText={onChangeText}
      />
      <Text>Change Password</Text> */}
      <PrimaryButton title="logout" onPress={logout}></PrimaryButton>
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    marginTop: 20,
  },
});
