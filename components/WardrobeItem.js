import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import ViewIcon from "./icons/ViewIcon";
import HeartIcon from "./icons/HeartIcon";
import MessageIcon from "./icons/MessageIcon";
import UserInfoBar from "./UserInfoBar";
import Colors from "../constants/colors";
import ClickedHeart from "./ClickedHeart";

function WardrobeItem() {
  return (
    <View style={styles.itemContainer}>
      <UserInfoBar screen={"wardrobe"} />
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/jacket.png")}
          style={styles.image}
        />
      </View>
      <Text style={styles.itemName}>Item Name</Text>
      <View style={styles.iconContainer}>
        <ViewIcon />
        <ClickedHeart />
        <MessageIcon />
      </View>
    </View>
  );
}

export default WardrobeItem;

const styles = StyleSheet.create({
  itemContainer: {
    width: 150,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#000",
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    height: 148,
    width: 168,
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  itemName: {
    color: Colors.primary2,
    fontFamily: "RalewayBold",
    fontSize: 15,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 15,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 10,
  },
});
