import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Animated,
} from "react-native";
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

function ProfileScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.userInfo.userName);
  const userEmail = useSelector((state) => state.userInfo.email);
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
        <View>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <View style={styles.imageContainer} />
          )}
          <PictureButton onPress={requestPermission} />
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={onModalClose}
          >
            <View style={styles.modalView}>
              <View style={styles.options}>
                <Button
                  title="Pick an image from camera roll"
                  onPress={pickImage}
                />
                <Button title="Take a picture" onPress={takeImage} />
              </View>
              <PrimaryButton title="Close" onPress={onModalClose} />
            </View>
          </Modal>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
          <View style={styles.coins}>
            <CoinIcon />
            <Text style={styles.userName}>5</Text>
          </View>
        </View>
      </View>
      <SettingsIcon />
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 24,
    marginLeft: 44,
  },
  imageContainer: {
    width: 112,
    height: 114,
    backgroundColor: "#85E0A3",
    borderRadius: 21,
  },
  modalView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: "150%",
    backgroundColor: Colors.popup,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
  },
  options: {
    marginBottom: 50,
  },
  profileImage: {
    width: 112,
    height: 114,
    borderRadius: 21,
  },
  userInfo: {
    margin: 20,
  },
  userName: {
    color: "#004A0E",
    // font-family: Raleway;
    fontSize: 20,
    fontWeight: 700,
    height: 34,
  },
  userEmail: {
    color: "#004A0E",
    // font-family: Raleway;
    fontSize: 15,
    fontWeight: 500,
    marginBottom: 11,
  },
  coins: {
    flexDirection: "row",
    gap: 11,
  },
});
