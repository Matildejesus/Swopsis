import { View, StyleSheet } from "react-native";
import ModalButton from "./ModalButton";
import { Modal, Portal, Text } from 'react-native-paper';
import Colors from "../../constants/colors";
import TrashIcon from "../icons/TrashIcon";

function ModalLeaveWidget({ visible, onRequestClose }) {
    return (
        <Portal>
            <Modal visible={visible} onDismiss={onRequestClose}>
                <View style={styles.container}>
                <Text style={styles.title}>You are about to leave the group</Text>
                <TrashIcon style={styles.image} width="60" height="69" />
                <View style={styles.buttonContainer}>
                    <ModalButton 
                    title="CANCEL" 
                    onPress={onRequestClose} 
                    removeContainer={true} 
                    />
                    <ModalButton title="LEAVE" />
                </View>
                </View>
            </Modal>
        </Portal>
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
        fontFamily: "Raleway_700Bold",
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
