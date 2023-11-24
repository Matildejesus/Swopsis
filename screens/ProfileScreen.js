import { Modal, View, Text, StyleSheet, ScrollView } from "react-native";
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
import Line from "../components/LineTemp";
import ProfileItemWidget from "../components/ProfileItemWidget";
import ArrowDown from "../components/icons/ArrowDown";
import GroupWidget from "../components/GroupWidget";

function ProfileScreen({ route, navigation }) {
  const dispatch = useDispatch();
  // const userName = useSelector((state) => state.userInfo.userName);
  const userEmail = useSelector((state) => state.userInfo.email);
  const userCoins = useSelector((state) => state.userInfo.coins);
  const userPassword = useSelector((state) => state.userInfo.password);
  const userPicture = useSelector((state) => state.userInfo.profilePicture);

  const { user } = useUser();
  if (!user) {
    // Render a loading state or handle the undefined case
    return <Text>Loading user data...</Text>; // Example loading state
  }
  console.log("user:", JSON.stringify(user, null, 2));
  const { userName, avatar, coins } = user.user_metadata;
  const email = user.email; // Access email directly from user object
  // console.log("user: " + user);
  console.log(email);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <PicturePicker userPicture={userPicture} />
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
          <Line />
          <ProfileItemWidget />
          <AddIcon />
          <Line />
          <Text style={styles.groupText}>MY GROUPS</Text>
          <GroupWidget />
          <AddIcon />
        </View>
      </View>
    </ScrollView>
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
    // marginLeft: 44,
  },
  userInfo: {
    margin: 20,
  },
  userName: {
    color: Colors.primary2,
    fontFamily: "RalewayBold",
    fontSize: 20,
    fontWeight: 700,
    height: 34,
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
    marginTop: 32,
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
});
