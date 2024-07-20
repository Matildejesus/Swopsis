import { View, Text, Image, StyleSheet } from "react-native";

function ImpactWidget({ number, label, source, color, count }) {
  console.log(color);
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: color },
        count === 1
          ? { borderTopLeftRadius: 40, borderTopRightRadius: 40 }
          : {},
        count === 3
          ? { borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }
          : {},
      ]}
    >
      <View style={styles.textContainer}>
        <Text style={styles.number}>{number}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Image style={styles.image} source={source} />
    </View>
  );
}

export default ImpactWidget;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 154,
    width: 328,
    marginHorizontal: 23,
  },
  textContainer: {
    flex: 1,
    margin: 22,
  },
  image: {
    width: 150,
    height: 150,
  },
  number: {
    fontSize: 25,
    fontFamily: "RalewayBold",
    color: "white",
  },
  label: {
    fontSize: 20,
    fontFamily: "RalewayRegular",
    color: "white",
  },
});