import { StyleSheet, View, Text, Image } from "react-native";
import { useState } from "react";

import Colors from "../constants/colors";
import PinIcon from "../components/icons/PinIcon";
import RegisterContainer from "../components/authentication/RegisterContainer";
import PrimaryButton from "../components/PrimaryButton";


// missing function: postcode must be entered and must be a valid aus postcode ***

function PostcodeScreen({navigation}) {

  const [postcode, setPostcode] = useState("");
    return (
        <View style={styles.container}>
          <Image
            source={require("../assets/images/simpleLogo.png")}
            style={styles.image}
          />
          <View style={styles.contentContainer}>
            <PinIcon/>
            <Text style={styles.title}> Find groups near you!</Text>
            <RegisterContainer 
              placeholder={"Enter your postcode"} 
              onChangeText={setPostcode}
              value={postcode}
            />
            <View style={styles.linkContainer}>
            <Text style={styles.text}>To register your account, request to join a group first</Text>
            </View>
          <PrimaryButton 
            title="Search"
            style={{ width: 200 }}
            onPress={() => {
              if (!postcode) return;
              console.log("postcode: " + postcode);
              navigation.navigate("Maps", {postcode: postcode});
            }  
            } />
       </View>
        </View>
      );
}

export default PostcodeScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.impact,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  contentContainer: {
    borderRadius: 51,
    backgroundColor: "white",
    opacity: 0.9,
    shadowColor: "black",
    shadowOpacity: 0.24,
    shadowRadius: 8.5,
    shadowOffset: { width: 4, height: 5 },
    height: 432,
    width: 283,
    zIndex: 1,
  // paddingTop: 114,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 173,
   height: 200,
  },
  title: {
    fontSize: 18,
    fontFamily: "RalewayBold",
  },
  text: {
    fontSize: 12,
    paddingHorizontal: 30,
    paddingTop: 18,
  }, 
  linkContainer: {
  //  marginTop: 20,
    marginBottom: 31,
    gap: 7,
  },
});
