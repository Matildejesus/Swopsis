import { View, Text, StyleSheet } from "react-native";
import ProfileItem from "../components/ProfileItem";
import HeartIcon from "../components/icons/HeartIcon";
import Colors from "../constants/colors";
import LineTemp from "../components/LineTemp";
import UserInfoBar from "../components/UserInfoBar";
import PinkNextArrow from "../components/icons/PinkNextArrow";
import DetailsIcon from "../components/icons/DetailsIcon";
import ToggleSwitch from "../components/ToggleSwitch";
import ReviewsIcon from "../components/icons/ReviewsIcon";

function ItemScreen() {
  return (
    <View style={styles.container}>
      <ProfileItem
        style={styles.itemContanier}
        source={require("../assets/images/jacket.png")}
      />
      <View style={styles.sectionContainer}>
        <Text style={styles.itemName}>Item Name</Text>
        <HeartIcon />
      </View>
      <LineTemp style={styles.line} />
      <UserInfoBar />
      <View style={styles.sectionContainer}>
        <Text style={styles.descriptionName}>Description</Text>
        <PinkNextArrow />
      </View>
      <Text style={styles.descriptionText}>
        Lorem ipsum dolor sit amet consectetur.
      </Text>
      <ToggleSwitch />
    </View>
  );
}

export default ItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: "white",
  },
  itemContanier: {
    width: 287,
    height: 191,
    backgroundColor: "white",
    marginTop: 20,
    alignSelf: "center",
  },
  sectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    marginHorizontal: 50,
  },
  itemName: {
    color: Colors.primary2,
    fontFamily: "RalewayBold",
    fontSize: 20,
  },
  line: {
    width: 327,
    height: 1,
    // backgroundColor: Colors.primary2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    backgroundColor: "white",
    marginTop: 17,
    alignSelf: "center",
  },
  descriptionName: {
    fontSize: 18,
    fontFamily: "RalewayBold",
    color: Colors.primary2,
    paddingLeft: 20,
  },
  descriptionText: {
    paddingHorizontal: 44,
    marginTop: 14,
    marginLeft: 40,
    fontSize: 15,
    color: Colors.primary2,
    fontFamily: "RalewayRegular",
  },
});
