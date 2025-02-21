import { Dialog } from "@rneui/themed";
import { StyleSheet } from "react-native";
import ModalButton from "./modals/ModalButton";
import Colors from "../constants/colors";
import DescriptionTextWidget from "./DescriptionTextWidget";
import ColorCircle from "./icons/ColorCircle";
import { View, Text } from "react-native";

function DescriptionDisplay({ visible, onRequestClose, data, category }) {

    return (
        <Dialog
            isVisible={visible}
            onBackdropPress={onRequestClose}
            overlayStyle={styles.container}
        >
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
            <Dialog.Actions>
                <ModalButton
                    title="CANCEL"
                    onPress={onRequestClose}
                    removeContainer={styles.button}
                />
            </Dialog.Actions>
        </Dialog>
    );
}

export default DescriptionDisplay;

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
});
