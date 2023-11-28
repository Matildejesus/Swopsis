import { Text, View, Image, StyleSheet } from "react-native";
import PlayIcon from "../components/icons/PlayIcon";
import DownloadIcon from "../components/icons/DownloadIcon";
import Colors from "../constants/colors";

function PostItemScreen({ route }) {
  const { type } = route.params;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/images/postImage.png")}
      />
      {type === "events" ? (
        <View style={styles.iconContainer}>
          <PlayIcon />
          <DownloadIcon />
        </View>
      ) : (
        <View style={styles.emptyContainer} />
      )}
      <Text style={styles.title}>Lorem Ipsum Dolor</Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet consectetur. Iaculis sagittis duis etiam
        velit faucibus.Lorem ipsum dolor sit amet consectetur. Iaculis sagittis
        duis etiam velit faucibus.
      </Text>
      <Text style={styles.date}>updated at: 20xx-xx-xx</Text>
    </View>
  );
}

export default PostItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  iconContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 6,
    marginRight: 44,
    alignSelf: "flex-end",
  },
  emptyContainer: {
    height: 31,
  },
  image: {
    marginTop: 24,
    width: 286,
    height: 191,
    borderRadius: 30,
  },
  title: {
    color: Colors.primary2,
    fontFamily: "RalewayBold",
    fontSize: 30,
    marginTop: 27,
  },
  description: {
    marginHorizontal: 46,
    color: Colors.primary2,
    fontFamily: "RalewayRegular",
    fontSize: 15,
    marginTop: 23,
  },
  date: {
    marginTop: 10,
    color: Colors.primary2,
    fontFamily: "RalewayLight",
    fontSize: 12,
    marginRight: 46,
    alignSelf: "flex-end",
  },
});
