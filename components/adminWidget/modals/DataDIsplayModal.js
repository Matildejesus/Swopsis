import { Modal, Portal, Button, TextInput } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { RNNumberStepper } from 'react-native-number-stepper';
import { useEffect, useState } from "react";
import InputField from "../../authentication/InputField";
import Colors from "../../../constants/colors";

function DataDisplayModal({ visible, onRequestClose, user }) {
    const [coins, setCoins] = useState(String(user.coins || "0"));  

    const handleCoinChange = (text) => {
        if (text === "" || /^\d+$/.test(text)) {
            setCoins(text === "" ? "0" : text); 
        }
    };

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={() => onRequestClose(null)}
                contentContainerStyle={styles.container}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>{user.userName}</Text>
                    <InputField 
                        value={coins}
                        onChangeText={handleCoinChange}
                        placeholder={String(user.coins || "0")}
                        text="Coins"
                        containerStyle={styles.inputContainer}
                    />
                    {/* <Text style={styles.message}>{user.coins}</Text> */}
                    <View style={styles.buttonContainer}>
                        <Button
                            mode="contained"
                            style={styles.button}
                            labelStyle={{ textAlign: "center", fontSize: 20, fontFamily: "Raleway_500Medium", }}
                            onPress={() => onRequestClose("Update", parseInt(coins, 10))} 
                        >
                            Update
                        </Button>
                    </View>
                </View>
            </Modal>
        </Portal>
    );
}

export default DataDisplayModal;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.impact,
        width: 350,
        marginLeft: 20,
        borderRadius: 20,
        paddingTop: 14,
        paddingBottom: 14,

    },
    title: {
        color: Colors.primary2,
        fontFamily: 'RalewayBold',
        fontSize: 18,
        marginBottom: 10,
    },
    button: {
        padding: 15,
        borderRadius: 27.5,
        paddingHorizontal: 15,
        backgroundColor: Colors.primary1
    }
});