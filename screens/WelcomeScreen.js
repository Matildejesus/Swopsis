import WelcomePageWidget from "../components/WelcomePageWidget";

function WelcomeScreen({ navigation }) {
  return (
    <WelcomePageWidget
      text1="SWAP AND INSPIRED WITH A SHARED COMMUNITY WARDROBE"
      text2="Swap /n Impact /n BE YOU"
      navigation={navigation}
      image1={require("../assets/images/girls.png")}
      image2={require("../assets/images/img4.png")}
    />
  );
}

export default WelcomeScreen;
