import { Modal, View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import Colors from "../constants/colors";
import CoinIcon from "../components/icons/CoinIcon";
import SettingsIcon from "../components/icons/SettingsIcon";
import CalendarIcon from "../components/icons/CalendarIcon";
import ImpactIcon from "../components/icons/ImpactIcon";
import PicturePicker from "../components/PicturePicker";
import AddIcon from "../components/icons/AddIcon";
import { useUser } from "../components/authentication/useUser";
import Line from "../components/Line";
import ProfileItemWidget from "../components/ProfileItemWidget";
import ArrowDown from "../components/icons/ArrowDown";
import GroupWidget from "../components/GroupWidget";

function ProfileScreen({ route, navigation }) {
  const dispatch = useDispatch();
  // const userName = useSelector((state) => state.userInfo.userName);

  const { user } = useUser();
  if (!user) {
    // Render a loading state or handle the undefined case
    return <Text>Loading user data...</Text>; // Example loading state
  }
  console.log("user:", JSON.stringify(user, null, 2));
  const { userName, avatar, coins } = user.user_metadata;
  const email = user.email; // Access email directly from user object
  console.log("avatar on profile: " + avatar);

  return (
    // <ScrollView>
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image style={styles.image} source={avatar ? { uri: avatar } : null} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{email}</Text>
          <View style={styles.coins}>
            <CoinIcon />
            <Text style={styles.userName}>{coins}</Text>
          </View>
        </View>
      </View>
      <View style={styles.iconsContainer}>
        <ImpactIcon />
        <CalendarIcon />
        <SettingsIcon />
      </View>
      <View style={styles.container}>
        <Line style={styles.line} />
        <ProfileItemWidget />
        <AddIcon />
        <Line style={styles.line} />
        <Text style={styles.groupText}>MY GROUPS</Text>
        <GroupWidget />
        <AddIcon />
      </View>
    </View>
    // </ScrollView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
  headerContainer: {
    // flex:  1,
    flexDirection: "row",
    marginTop: 24,
    marginLeft: 44,
    alignSelf: "flex-start",
    // marginLeft: 44,
  },
  userInfo: {
    marginLeft: 16,
  },
  image: {
    width: 85,
    height: 87,
    backgroundColor: Colors.impact,
    borderRadius: 21,
  },
  userName: {
    color: Colors.primary2,
    fontFamily: "RalewayBold",
    fontSize: 20,
    fontWeight: 700,
    // height: 34,
  },
  userEmail: {
    color: Colors.primary2,
    fontFamily: "RalewayMedium",
    fontSize: 15,
    fontWeight: 500,
    marginBottom: 11,
  },
  coins: {
    flexDirection: "row",
    gap: 11,
  },
  iconsContainer: {
    marginHorizontal: 30,
    gap: 45,
    marginTop: 15,
    marginBottom: 17,
    // marginBottom: 330,
    flexDirection: "row",
    // fontFamily: "RalewayBold",
  },
  line: {
    width: 327,
    height: 1,
    backgroundColor: Colors.primary2,
    marginTop: 17,
  },
  groupText: {
    color: Colors.primary2,
    fontSize: 20,
    fontWeight: 700,
    marginTop: 16,
    marginLeft: 17,
    alignSelf: "flex-start",
    fontFamily: "RalewayBold",
  },
  line: {
    width: 327,
    height: 1,
    backgroundColor: Colors.primary2,
    // marginTop: 17,
    alignItems: "center",
  },
});
