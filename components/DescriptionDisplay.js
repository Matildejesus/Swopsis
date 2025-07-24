import { Modal, Portal } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import ModalButton from "./modals/ModalButton";
import Colors from "../constants/colors";
import DescriptionTextWidget from "./DescriptionTextWidget";
import ColorCircle from "./icons/ColorCircle";

function DescriptionDisplay({ visible, onRequestClose, data, category }) {
    return (
        <Portal>
            <Modal 
                visible={visible} 
                onDismiss={onRequestClose}
                contentContainerStyle={styles.container}
            >
                <View style={styles.content}>
                    <DescriptionTextWidget category={"Category"} text={category} />
                    <DescriptionTextWidget
                        category={"Subcategory"}
                        text={data.subcategory}
                    />
                    {category === "Accessories" ? (
                        <DescriptionTextWidget
                            category={"Material"}
                            text={data.material}
                        />
                    ) : (
                        <DescriptionTextWidget category={"Fabric"} text={data.fabric} />
                    )}
                    <DescriptionTextWidget
                        category={"Color"}
                        color={<ColorCircle color={data.color} />}
                    />
                    {category != "Accessories" && (
                        <DescriptionTextWidget category={"Size"} text={data.size} />
                    )}
                    {category === "Shoes" && (
                        <DescriptionTextWidget
                            category={"Length"}
                            text={data.shoelength}
                        />
                    )}
                    <DescriptionTextWidget category={"Weight"} text={data.weight} />
                    <DescriptionTextWidget
                        category={"Condition"}
                        text={data.condition}
                    />
                    <ModalButton
                        title="CANCEL"
                        onPress={onRequestClose}
                        removeContainer={styles.button}
                    />
                </View>
            </Modal>
        </Portal>
    );
}

export default DescriptionDisplay;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        position: "absolute",
        right: 25,

    },
    content: {
        backgroundColor: "#DACFD4",
        width: 340,
        paddingVertical: 35,
        // marginHorizontal: 10,
        borderRadius: 20,
        // marginBottom: 20,
    },
    button: {
        width: "80%",
        height: 40,
        borderRadius: 20,
        backgroundColor: "#D0ADBD",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        alignSelf: "center",
    },
});
