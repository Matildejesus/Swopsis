import { Dialog } from "@rneui/themed";
import { StyleSheet } from "react-native";
import ModalButton from "./modals/ModalButton";
import Colors from "../constants/colors";
import InputField from "./authentication/InputField";
import ErrorMessage from "./ErrorMessage";

function MessageModal({
    visible,
    onRequestClose,
    errorMessage,
    onMessageChange,
}) {
    return (
        <Dialog
            isVisible={visible}
            onBackdropPress={onRequestClose}
            overlayStyle={styles.container}
        >
            <InputField
                placeholder="Write your message..."
                onChangeText={onMessageChange}
                secureTextEntry={false}
                multiline={true}
                containerStyle={styles.inputFieldContainer}
            />
            <ErrorMessage error={errorMessage} />
            <Dialog.Actions>
                <ModalButton
                    title="SEND"
                    onPress={onRequestClose}
                    removeContainer={styles.button}
                />
            </Dialog.Actions>
        </Dialog>
    );
}

export default MessageModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#DACFD4",
        position: "absolute",
        bottom: 20,
        width: 340,
        //  height: 366,
        paddingTop: 35,
        borderRadius: 20,
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
    button: {
        width: "100%",
        height: 40,
        borderRadius: 20,
        backgroundColor: "#D0ADBD",
        alignItems: "center",
        justifyContent: "center",
    },
    inputFieldContainer: {
        height: 100,
        backgroundColor: "white",
        marginHorizontal: 10,
        borderRadius: 10,
        borderColor: Colors.primary2,
        borderWidth: 1,
        backgroundColor: "white",
        opacity: 0.76,
        paddingHorizontal: 13,
        paddingVertical: 8,
    },
});
