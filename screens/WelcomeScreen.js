import LoginWidget from "../components/LoginWidget";

function WelcomeScreen({ navigation }) {
  return (
    <LoginWidget
      text="SWAP AND INSPIRED WITH A SHARRED COMMUNITY WARDROBE"
      destination="AboutUs"
      navigation={navigation}
      image={require("../assets/images/girls.png")}
    />
  );
}

export default WelcomeScreen;
