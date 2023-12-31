import { View, StyleSheet, Image } from "react-native";
import Colors from "../constants/colors";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import PictureButton from "../components/icons/PictureButton";
import { useUpdateUser } from "./authentication/useUpdateUser";
import ModalPhotoWidget from "./modals/ModalPhotoWidget";

function PicturePicker({ userPicture }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [avatar, setAvatar] = useState(userPicture);

  const { updateUser, isUpdating } = useUpdateUser();

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

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
      setIsModalVisible(false);
      updateUser({ avatar: result.assets[0].uri });
      console.log("avatar: " + result.assets[0].uri);
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
      setAvatar(result.assets[0].uri);
      updateUser({ avatar: result.assets[0].uri });
      setIsModalVisible(false);
      console.log("avatar :" + result.assets[0].uri);
    }
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <View>
      {avatar ? (
        <Image source={{ uri: avatar }} style={styles.profileImage} />
      ) : (
        <View style={styles.imageContainer} />
      )}
      <PictureButton onPress={requestPermission} />
      <ModalPhotoWidget
        visible={isModalVisible}
        onRequestClose={onModalClose}
        takeImage={takeImage}
        pickImage={pickImage}
      />
    </View>
  );
}

export default PicturePicker;

const styles = StyleSheet.create({
  options: {
    marginBottom: 8,
  },
  profileImage: {
    width: 112,
    height: 114,
    borderRadius: 21,
  },
  imageContainer: {
    width: 112,
    height: 114,
    backgroundColor: Colors.secondary2,
    borderRadius: 21,
  },
});
