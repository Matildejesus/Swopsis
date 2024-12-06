import { View, Text, FlatList, StyleSheet } from "react-native";
import ProfileItem from "./ProfileItem";

function ProfileItemWidget({ items }) {

 // console.log("items: ", items);
  return (
    <View style={styles.container}>
    <FlatList
      data={items}
      numColumns={3}
      renderItem={({ item }) => (
        <ProfileItem style={styles.itemContainer} source={item.image} itemID={item.id} itemData={item} />
      )}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      bounce={false}
    />
    </View>
  );
}

export default ProfileItemWidget;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    width: 95,
    height: 96,
    backgroundColor: "white",

    marginTop: 21,
    marginRight: 20,
    alignSelf: "center",
  },
  container: {
    height: "65%",
  }
});