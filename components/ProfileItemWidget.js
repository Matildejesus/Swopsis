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
  ];

  return (
    <FlatList
      data={items}
      numColumns={3}
      renderItem={({ item }) => (
        <ProfileItem style={styles.itemContainer} source={item.source} itemID={item.id}  />
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