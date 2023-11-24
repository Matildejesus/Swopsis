import { View, Text, StyleSheet } from "react-native";
import ProfileItem from "../components/ProfileItem";

function ItemScreen() {
  return (
    <View>
      <Text>Item Screen</Text>
      <ProfileItem
        style={styles.itemContanier}
        source={require("../assets/images/jacket.png")}
      />
    </View>
  );
}

export default ItemScreen;

const styles = StyleSheet.create({
  itemContanier: {
    width: 287,
    height: 191,
    backgroundColor: "white",
  },
});
