import { Modal, View, StyleSheet } from "react-native";
import ModalButton from "./ModalButton";
import ModalOptions from "./ModalOptions";
import { Dialog } from "@rneui/themed";
import Colors from "../../constants/colors";
import PictureButton from "../icons/PictureButton";
import TrashIcon from "../icons/TrashIcon";

function ModalLeaveWidget({ visible, onRequestClose }) {
    return (
        <Dialog
            isVisible={visible}
            onBackdropPress={onRequestClose}
            overlayStyle={styles.container}
        >
            <Dialog.Title
                title="You are about to leave the group"
                titleStyle={styles.title}
            />
            <TrashIcon style={styles.image} width="60" height="69" />
            <Dialog.Actions>
                <View style={styles.buttonContainer}>
                    <ModalButton
                        title="CANCEL"
                        onPress={onRequestClose}
                        removeContainer={true}
                    />
                    <ModalButton title="LEAVE" />
                </View>
            </Dialog.Actions>
        </Dialog>
    );
}

export default ModalLeaveWidget;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: "white",

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
    buttonContainer: {
        flexDirection: "row",
    },
    image: {
        marginTop: 10,
        marginBottom: 18,
        alignSelf: "center",
    },
});
