import { View, Text, StyleSheet } from "react-native";

function ProfileScreen({ route, navigation }) {
  const { name, userName, password } = route.params;
  return (
    <View style={styles.container}>
      <Text>Name: {name}</Text>
      <Text>Username: {userName}</Text>
      <Text>Password: {password}</Text>
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
