import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Colors from "../../constants/colors";
import ContactIcon from "../icons/ContactIcon";

function ContactButton({ handleContact, display }) {
    console.log("handleContact prop:", handleContact);

    return (
        <TouchableOpacity onPress={handleContact}>
           
                {display === "button" ? (
                     <View style={styles.button}>
                    <Text style={styles.label}>CONTACT</Text>
                    <ContactIcon />
                    </View>
                ): (
                    <View>
                    <ContactIcon width={26} height={26} />
                    </View>
                )}
               
        </TouchableOpacity>
    );
}

export default ContactButton;

const styles = StyleSheet.create({
    button: {
        borderColor: Colors.primary1,
        flexDirection: "row",
        width: 135,
        height: 36,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 27.5,
        paddingHorizontal: 10,
        gap: 2,
    },
    label: {
        fontFamily: "RalewayMedium",
        fontSize: 15,
        color: Colors.primary1,
    },
});
