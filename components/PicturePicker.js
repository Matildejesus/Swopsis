import { View, Modal, Button, StyleSheet, Image } from "react-native";
import PrimaryButton from "./PrimaryButton";
import Colors from "../constants/colors";
import PictureButton from "./icons/PictureButton";

function PicturePicker({
  onModalClose,
  isModalVisible,
  takeImage,
  pickImage,
  requestPermission,
  image,
}) {
  return (
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
  );
}

export default PicturePicker;

const styles = StyleSheet.create({
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
  imageContainer: {
    width: 112,
    height: 114,
    backgroundColor: Colors.secondary2,
    borderRadius: 21,
  },
});
