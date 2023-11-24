import { View, Image, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";

function UserInfoBar({ screen }) {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image style={styles.imagePlaceholder} />
        <View>
          <Text style={styles.name}>Name</Text>
          {screen === "wardrobe" ? (
            <Text style={styles.text}>Date</Text>
          ) : (
            <Text style={styles.text}>email@email.com</Text>
          )}
        </View>
      </View>
      {screen === "wardrobe" ? null : <Text style={styles.text}>Date</Text>}
    </View>
  );
}

export default UserInfoBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 18,
    justifyContent: "space-between",
    marginRight: 49,
    marginLeft: 14,
  },
  leftContainer: {
    flexDirection: "row",
  },
  imagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: Colors.secondary2,
    marginRight: 10,
    marginLeft: 24,
  },
  name: {
    color: Colors.primary2,
    fontFamily: "RalewayBold",
    fontSize: 15,
  },
  text: {
    color: Colors.primary2,
    fontFamily: "RalewayRegular",
    fontSize: 12,
  },
});
