import { Modal, Portal, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

function ModalPhotoWidget({ visible, onRequestClose, pickImage, takeImage }) {
    return (
        <Portal>
            <Modal 
                visible={visible} 
                onDismiss={onRequestClose}
                contentContainerStyle={styles.container}
            >
                <View style={styles.innerContainer}>
                <Text style={styles.title}>Add profile picture</Text>
                <PictureButton style={styles.image} />
                <View style={styles.buttonRow}>
                    <ModalOptions text="TAKE A PHOTO" onPress={takeImage} />
                    <ModalOptions text="UPLOAD A PHOTO" onPress={pickImage} />
                    <ModalButton title="CLOSE" onPress={onRequestClose} />
                </View>
                </View>
            </Modal>
        </Portal>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        backgroundColor: 'white',
        width: 350,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        color: Colors.primary2,
        fontFamily: 'RalewayBold',
        fontSize: 18,
        marginBottom: 10,
    },
    buttonRow: {
        width: '100%',
        marginTop: 10,
    },
    image: {
        marginVertical: 18,
    }
});