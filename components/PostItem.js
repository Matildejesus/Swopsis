import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import Colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

function PostItem({ type }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("PostItem", { type: type })}
    >
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assets/images/postImage.png")}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Title</Text>
          <Text style={styles.link}>Read more...</Text>
          <Text style={styles.date}>updated at: 20xx-xx-xx</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default PostItem;

const styles = StyleSheet.create({
  container: {
    width: 286,
    paddingVertical: 10,
    alignItems: "flex-start",
    gap: 5,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 2, height: 4 }, // This applies shadow to both sides
    shadowOpacity: 0.25,
    shadowRadius: 4,
    alignSelf: "center",
    marginTop: 35,
  },
  image: {
    width: 286,
    height: 191,
  },
  contentContainer: {
    padding: 10,
    gap: 5,
    alignSelf: "stretch",
  },
  title: {
    color: Colors.primary2,
    fontFamily: "RalewayBold",
    fontSize: 15,
  },
  link: {
    color: Colors.primary1,
    fontFamily: "RalewayItalic",
    fontSize: 12,
  },
  date: {
    color: Colors.primary2,
    fontFamily: "RalewayLight",
    fontSize: 12,
  },
});
