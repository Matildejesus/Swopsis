import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native";

function RectangleButton({ icon, text, color, number }) {

    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Groups")}>
            <View style={styles.container}>
                <View style={styles.iconContainer}>{icon}</View>
                <Text style={[styles.numText, { color }]}>{number}</Text>
                <Text style={[styles.text, { color }]}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default RectangleButton;

const styles = StyleSheet.create({
  container: {
    width: 189,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#00000040",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    flexDirection: "row", 
    alignItems: "center", 
    paddingHorizontal: 10, 
  },
  iconContainer: {
    marginRight: 10, 
    marginTop: 5,
  },
  text: {
    fontSize: 16, // Adjust text size
    marginRight: 5,
    fontFamily: "InterRegular",
  },
  numText: {
    fontFamily: "InterBold",
    fontSize: 16,
    marginRight: 5,
  }
});
