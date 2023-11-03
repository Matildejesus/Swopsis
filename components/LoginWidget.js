import {
  View,
  TouchableOpacity,
  Image,
  Text,
  Button,
  StyleSheet,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useState, useEffect } from "react";
import * as Font from "expo-font";

import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton.js";
import Colors from "../constants/colors.js";

function LoginWidget({ text, destination, navigation, image }) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (text.includes("/n")) {
      setPage(2);
    } else {
      setPage(1);
    }
  }, [text]);

  const renderText = () => {
    if (text.includes("/n")) {
      const items = text.split(" /n ");

      return (
        <View style={styles.bulletList}>
          {items.map((item, index) => (
            <Text key={index.toString()} style={styles.bulletItem}>
              • {item}
            </Text>
          ))}
        </View>
      );
    } else {
      return <Text style={styles.text}>{text}</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate(destination)}>
        <Image source={image} style={styles.girlsImage} />
      </TouchableOpacity>
      <View style={styles.navbar}>
        {page === 1 ? (
          <>
            <Svg height="10" width="10" viewBox="0 0 10 10">
              <Circle cx="5" cy="5" r="5" fill="#FB5099" />
            </Svg>
            <Svg height="8" width="8" viewBox="0 0 8 8">
              <Circle cx="4" cy="4" r="4" fill="#FB5099" />
            </Svg>
          </>
        ) : (
          <>
            <Svg height="8" width="8" viewBox="0 0 8 8">
              <Circle cx="4" cy="4" r="4" fill="#FB5099" />
            </Svg>
            <Svg height="10" width="10" viewBox="0 0 10 10">
              <Circle cx="5" cy="5" r="5" fill="#FB5099" />
            </Svg>
          </>
        )}
      </View>
      {renderText()}
      <View style={styles.btnContainer}>
        <PrimaryButton
          title="REGISTER"
          onPress={() => navigation.navigate("Register")}
        />
        <SecondaryButton
          title="LOG IN"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </View>
  );
}

export default LoginWidget;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  girlsImage: {
    width: 390,
    height: 497,
    flexShrink: 0,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 20.5,
    gap: 6,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 19,
  },
  background: {
    width: 375,
    height: 309.5,
    marginTop: 357.5,
    marginLeft: 0,
  },
  text: {
    color: Colors.primary1,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 30,
    fontFamily: "RalewayBold",
    // fontFamily: "Raleway",
  },
  bulletItem: {
    textAlign: "center",
    color: Colors.primary1,
    fontSize: 25,
    fontWeight: 700,
  },
  bulletList: {
    flexDirection: "column", // This ensures a vertical column layout
    marginTop: 55,
    marginBottom: 33,
  },
});
