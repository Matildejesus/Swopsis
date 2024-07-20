import { useNavigation } from "@react-navigation/native";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

function ProfileItem({ style, source }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Item")}>
      <View style={style}>
        <Image source={source} style={styles.image} resizeMode="contain" />
      </View>
    </TouchableOpacity>
  );
}
export default ProfileItem;

const styles = StyleSheet.create({
  container: {
    width: 95,
    height: 96,
    // shadowColor: "black",
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // shadowOffset: { width: 4, height: 4 },
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});