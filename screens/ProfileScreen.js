import { Modal, View, Text, StyleSheet, Image, Button } from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import Colors from "../constants/colors";
import CoinIcon from "../components/icons/CoinIcon";
import SettingsIcon from "../components/icons/SettingsIcon";
import CalendarIcon from "../components/icons/CalendarIcon";
import ImpactIcon from "../components/icons/ImpactIcon";
import PicturePicker from "../components/PicturePicker";
import AddIcon from "../components/icons/AddIcon";

function ProfileScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.userInfo.userName);
  const userEmail = useSelector((state) => state.userInfo.email);
  const userCoins = useSelector((state) => state.userInfo.coins);
  const userPassword = useSelector((state) => state.userInfo.password);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <PicturePicker />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
          <View style={styles.coins}>
            <CoinIcon />
            <Text style={styles.userName}>{userCoins}</Text>
          </View>
        </View>
      </View>
      <View style={styles.iconsContainer}>
        <ImpactIcon />
        <CalendarIcon />
        <SettingsIcon />
      </View>
      <View style={styles.container}>
        <View style={styles.line}></View>
        <Text style={styles.groupText}>MY ITEMS</Text>
        <AddIcon />
        <View style={styles.line}></View>
        <Text style={styles.groupText}>MY GROUPS</Text>
        <AddIcon />
      </View>
    </View>
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
    // font-family: Raleway;
    fontSize: 20,
    fontWeight: 700,
    marginTop: 16,
    marginLeft: 17,
    alignSelf: "flex-start",
  },
});
