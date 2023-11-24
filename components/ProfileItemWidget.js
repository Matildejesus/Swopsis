import { View, Text, FlatList, StyleSheet } from "react-native";
import ProfileItem from "./ProfileItem";

function ProfileItemWidget() {
  const items = [
    { id: "1", source: require("../assets/images/jacket.png") },
    { id: "2", source: require("../assets/images/jacket.png") },
    { id: "3", source: require("../assets/images/jacket.png") },
    { id: "4", source: require("../assets/images/jacket.png") },
    { id: "5", source: require("../assets/images/jacket.png") },
    { id: "6", source: require("../assets/images/jacket.png") },
    // { id: "7", source: require("../assets/images/jacket.png") },
    // { id: "8", source: require("../assets/images/jacket.png") },
    // { id: "9", source: require("../assets/images/jacket.png") },
    // { id: "10", source: require("../assets/images/jacket.png") },
    // { id: "11", source: require("../assets/images/jacket.png") },
    // { id: "12", source: require("../assets/images/jacket.png") },
    // { id: "13", source: require("../assets/images/jacket.png") },
    // { id: "14", source: require("../assets/images/jacket.png") },
    // { id: "15", source: require("../assets/images/jacket.png") },
    // { id: "16", source: require("../assets/images/jacket.png") },
    // { id: "17", source: require("../assets/images/jacket.png") },
    // { id: "18", source: require("../assets/images/jacket.png") },
  ];

  return (
    <FlatList
      data={items}
      numColumns={3}
      renderItem={({ item }) => (
        <ProfileItem style={styles.itemContainer} source={item.source} />
      )}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      bounce={false}
    />
  );
}

export default ProfileItemWidget;

const styles = StyleSheet.create({
  itemContainer: {
    width: 95,
    height: 96,
    // shadowColor: "black",
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // shadowOffset: { width: 4, height: 4 },
    backgroundColor: "white",
    // marginLeft: 21,
    gap: 5,
    marginTop: 21,
  },
});
