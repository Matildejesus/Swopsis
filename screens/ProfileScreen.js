import { Modal, View, Text, StyleSheet, Image, Button } from "react-native";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePicture } from "../store/userInfo";

import PictureButton from "../components/icons/PictureButton";
import PrimaryButton from "../components/PrimaryButton";
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [image, setImage] = useState(null);

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work.");
      return;
    }
    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraStatus.status !== "granted") {
      alert("Sorry, we need camera permissions to make this work.");
    } else {
      setShowAppOptions(true);
      setIsModalVisible(true);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setIsModalVisible(false);
      dispatch(updatePicture(result.assets[0].uri));
    }
  };

  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setIsModalVisible(false);
    }
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <PicturePicker
          isModalVisible={isModalVisible}
          onModalClose={onModalClose}
          takeImage={takeImage}
          pickImage={pickImage}
          requestPermission={requestPermission}
          image={image}
        />
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
    // font-family: Raleway;
    fontSize: 20,
    fontWeight: 700,
    height: 34,
  },
  userEmail: {
    color: Colors.primary2,
    // font-family: Raleway;
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
