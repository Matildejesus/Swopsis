import { Dialog, Button } from "@rneui/themed";
import { StyleSheet, Text } from "react-native";

function RequestModal({ visible, onRequestClose, name, message }) {
    return (
        <Dialog
            isVisible={visible}
            onBackdropPress={onRequestClose}
            overlayStyle={styles.container}
        >
            <Dialog.Title title={name} />
            <Text>{message}</Text>
            <Dialog.Actions>
                <Dialog.Button
                    title="Accept"
                    onPress={() => onRequestClose("Accept")}
                />
                <Dialog.Button
                    title="Reject"
                    onPress={() => onRequestClose("Reject")}
                />
            </Dialog.Actions>
        </Dialog>
    );
}

export default RequestModal;

const styles = StyleSheet.create({
    container: {},
});
