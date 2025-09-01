import { Modal, Portal, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import ModalOptions from './ModalOptions';
import ModalButton from './ModalButton';
import { useState } from 'react';
import InputField from '../authentication/InputField';

function ModalReportWidget({ visible, onRequestClose, blockUser, reportUser }) {
    const [report, setReport] = useState(false);
    const [message, setMessage] = useState("");

    const submitReport = async () => {
        if (!message.trim()) return; // keep it simple
        await reportUser(message.trim());
        setMessage("");
        setReport(false);
    };

    return (
        <Portal>
        <Modal visible={visible} onDismiss={onRequestClose} contentContainerStyle={styles.container}>
            <View style={styles.innerContainer}>
            <View style={styles.buttonRow}>
                {!report ? (
                <>
                    <ModalOptions text="BLOCK USER" onPress={blockUser} />
                    <ModalOptions text="REPORT USER" onPress={() => setReport(true)} />
                    <ModalButton title="CLOSE" onPress={onRequestClose} />
                </>
                ) : (
                <>
                    <Text style={styles.title}>Report User</Text>
                    <InputField
                    placeholder="Reason for reporting..."
                    multiline
                    numberOfLines={4}
                    value={message}
                    onChangeText={setMessage}
                    />
                    <View style={{ height: 8 }} />
                    <ModalButton title="REPORT" onPress={submitReport} />
                    <ModalButton title="CANCEL" onPress={() => { setReport(false); setMessage(""); }} />
                </>
                )}
            </View>
            </View>
        </Modal>
        </Portal>
    );
}
export default ModalReportWidget;

const styles = StyleSheet.create({
    container: { 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    innerContainer: { 
        backgroundColor: 'white', 
        width: 350, 
        borderRadius: 20, 
        padding: 20, 
        alignItems: 'center' 
    },
    title: { 
        color: Colors.primary2, 
        fontFamily: 'Raleway_700Bold', 
        fontSize: 18, 
        marginBottom: 10 
    },
    buttonRow: { 
        width: '100%', 
        marginTop: 10 
    },
});
