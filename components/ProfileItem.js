import { useNavigation } from "@react-navigation/native";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

function ProfileItem({ style, source, itemData }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("ProfileItem", { itemData: itemData})}>
      <View style={style}>
        <Image source={{uri: source }} style={styles.image} resizeMode="contain" />
      </View>
    </TouchableOpacity>
  );
}
export default ProfileItem;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});