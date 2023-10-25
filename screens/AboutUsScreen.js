import LoginWidget from "../components/LoginWidget";

function AboutUsScreen({ navigation }) {
  return (
    <LoginWidget
      text="Swap /n Impact /n BE YOU"
      navigation={navigation}
      destination="Welcome"
      image={require("../assets/images/img4.png")}
    />
  );
}

export default AboutUsScreen;
