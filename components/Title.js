import { View, Text } from "react-native";

function Title(props) {
  return (
    <View style={{ marginLeft: 31, marginBottom: 10 }}>
      <Text style={{ fontWeight: "bold", fontSize: 20, color: "#8E0040" }}>
        {props.title}
      </Text>
    </View>
  );
}

export default Title;
