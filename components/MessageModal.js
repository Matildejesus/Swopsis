import { Modal, Portal } from 'react-native-paper';
import { StyleSheet,Text, View } from "react-native";
import ModalButton from "./modals/ModalButton";
import Colors from "../constants/colors";
import InputField from "./authentication/InputField";
import ErrorMessage from "./ErrorMessage";
import CalendarWidget from "./CalendarWidget";

function MessageModal({
    visible,
    onRequestClose,
    errorMessage,
    onMessageChange,
    onBackdropPress,
    method,
    markedDates, 
    toggleDate,
    joinRequest
}) {
    return (
        <Portal>
            <Modal visible={visible} onDismiss={onBackdropPress}>
                <View style={!joinRequest ? styles.container: styles.joinRequestContainer}>
                    {!joinRequest && (
                        method === "swap" ? (
                            <View style={styles.content}>
                            <   Text style={styles.title}>For Swap</Text>
                            </View>
                        ) : (
                            <View style={styles.content}>
                                <Text style={styles.title}>For Loan</Text>
                                <CalendarWidget markedDates={markedDates} toggleDate={toggleDate} />
                            </View>
                        )
                    )}
                    <InputField
                        placeholder="Write your message..."
                        onChangeText={onMessageChange}
                        containerStyle={styles.inputField}
                    />
                
                    <ErrorMessage error={errorMessage} />
                
                    <ModalButton
                        title="SEND"
                        onPress={onRequestClose}
                        removeContainer={styles.button}
                    />
                </View>
            </Modal>
        </Portal>
    );
}

export default MessageModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#DACFD4",
        position: "absolute",
        bottom: -40,
        left: 20,
        width: 340,
        height: 366,
        paddingTop: 35,
        borderRadius: 20,
    },
    joinRequestContainer: {
        flex: 1,
        backgroundColor: "#DACFD4",
        position: "absolute",
        bottom: -40,
        left: 20,
        width: 340,
        height: 200,
        paddingTop: 35,
        borderRadius: 20,
    },
    content: {
        height: 169,
    },
    title: {
        color: Colors.primary2,
        fontFamily: "Raleway_700Bold",
        fontSize: 18,
        alignSelf: "center",
        paddingBottom: 15,
    },
    image: {
        marginTop: 10,
        marginBottom: 18,
        alignSelf: "center",
    },
    button: {
        width: "80%",
        height: 40,
        borderRadius: 20,
        backgroundColor: "#D0ADBD",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    inputField: {
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
        marginTop: 20,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
});
