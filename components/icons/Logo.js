import { Image, StyleSheet, View } from "react-native";

function Logo() {
  return (
    <View style={{ marginHorizontal: 28, marginBottom: 10 }}>
      <Image
        source={require("../../assets/images/simpleLogo.png")}
        style={styles.image}
      />
    </View>
  );
}

export default Logo;

const styles = StyleSheet.create({
  image: {
    width: 35,
    height: 41,
  },
});
