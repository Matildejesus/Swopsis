import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

function Title(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {props.goBack ? (
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="23"
            viewBox="0 0 16 23"
            fill="none"
          >
            <Path
              d="M11.5 0L0 11.5L11.5 23L15.8125 18.6875L8.625 11.5L15.8125 4.3125L11.5 0Z"
              fill="#8E0040"
            />
          </Svg>
        </TouchableOpacity>
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
