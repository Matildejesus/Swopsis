import { View, Modal, Button, StyleSheet, Image } from "react-native";
import Colors from "../constants/colors";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { updatePicture } from "../store/userInfo";
import PictureButton from "../components/icons/PictureButton";
import PopupButton from "./PopupButton";
import ModalItemWidget from "./ModalItemWidget";
import ArrowModal from "./icons/ArrowModal";
import { useUpdateUser } from "./authentication/useUpdateUser";

function PicturePicker({ userPicture }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={onModalClose}
      >
        <View style={styles.modalView}>
          <View style={styles.options}>
            <ModalItemWidget
              title={"TAKE A PHOTO"}
              elements={<ArrowModal />}
              onPress={takeImage}
            />
            <ModalItemWidget
              title={"UPLOAD A PHOTO"}
              elements={<ArrowModal />}
              onPress={pickImage}
            />
          </View>
          <PopupButton title="CANCEL" onPress={onModalClose} />
        </View>
      </Modal>
    </View>
  );
}

export default PicturePicker;

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    // marginTop: "150%",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 30,
  },
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
