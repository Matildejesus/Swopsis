import { Modal, Portal, Button, TextInput } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";

function RequestModal({ visible, onRequestClose, name, message }) {
    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={() => onRequestClose(null)}
                contentContainerStyle={styles.container}
            >
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.message}>{message}</Text>
                <View style={styles.buttonContainer}>
                    <Button
                        mode="contained"
                        style={styles.button}
                        onPress={() => onRequestClose("Accept")}
                    >
                        Accept
                    </Button>
                    <Button
                        mode="outlined"
                        style={styles.button}
                        onPress={() => onRequestClose("Reject")}
                    >
                        Reject
                    </Button>
                </View>
            </Modal>
        </Portal>
    );
}

export default RequestModal;

const styles = StyleSheet.create({
    container: {},
});
