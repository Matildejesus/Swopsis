import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

function ProfileScreen({ route, navigation }) {
  const userName = useSelector((state) => state.userInfo.userName);
  const userEmail = useSelector((state) => state.userInfo.email);
  const userPassword = useSelector((state) => state.userInfo.password);

  return (
    <View style={styles.container}>
      <Text>Name: {userName}</Text>
      <Text>Email: {userEmail}</Text>
      <Text>Password: {userPassword}</Text>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
