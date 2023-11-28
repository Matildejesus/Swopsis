import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import PinkBackArrow from "./icons/PinkBackArrow";

function Title(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {props.goBack ? (
        <PinkBackArrow onPress={() => navigation.goBack()} />
      ) : null}
      <Text style={{ fontWeight: "bold", fontSize: 20, color: "#8E0040" }}>
        {props.title}
      </Text>
    </View>
  );
}

export default Title;

const styles = StyleSheet.create({
  container: {
    // marginLeft: 20,
    marginTop: 10,
    flex: 1,
    flexDirection: "row",
    gap: 27,
  },
});
