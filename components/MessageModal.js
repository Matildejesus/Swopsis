import { Modal, Portal, Button, Text } from 'react-native-paper';
import { StyleSheet,Text } from "react-native";
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
                <View style={styles.container}>
                    {!joinRequest && (
                        method === "swap" ? (
                        <Text style={styles.title}>For Swap</Text>
                        ) : (
                        <>
                            <Text style={styles.title}>For Loan</Text>
                            <CalendarWidget markedDates={markedDates} toggleDate={toggleDate} />
                        </>
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
        paddingBottom: 15,
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
        marginTop: 20,
    },
});
