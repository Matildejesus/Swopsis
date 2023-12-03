import { Modal, View, StyleSheet } from "react-native";
import ModalButton from "./ModalButton";
import ModalOptions from "./ModalOptions";
import { Dialog } from "@rneui/themed";
import Colors from "../../constants/colors";
import PictureButton from "../icons/PictureButton";

function ModalPhotoWidget({ visible, onRequestClose, pickImage, takeImage }) {
  return (
    <Dialog
      isVisible={visible}
      onBackdropPress={onRequestClose}
      overlayStyle={styles.container}
    >
      <Dialog.Title title="Add profile picture" titleStyle={styles.title} />
      <PictureButton style={styles.image} />
      <Dialog.Actions>
        <ModalOptions text="TAKE A PHOTO" onPress={takeImage} />
        <ModalOptions text="UPLOAD A PHOTO" onPress={pickImage} />

        <ModalButton title="CLOSE" onPress={onRequestClose} />
      </Dialog.Actions>
    </Dialog>
  );
}

export default ModalPhotoWidget;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "white",
    position: "absolute",
    width: 350,
    borderRadius: 20,
    alignItems: "flex-end",
  },

  title: {
    color: Colors.primary2,
    fontFamily: "RalewayBold",
    fontSize: 18,
    alignSelf: "center",
  },
  image: {
    marginTop: 10,
    marginBottom: 18,
    alignSelf: "center",
  },
});
