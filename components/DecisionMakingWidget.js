import { StyleSheet, View } from "react-native";
import MainButton from "./MainButton";
import Colors from "../constants/colors";

function DecisionMakingWidget({ accept, reject }) {
    return(
        <View>
            <View style={styles.decisionContainer}>
                <MainButton 
                    title="Accept"
                    onPress={accept}
                    style={styles.buttonContainer}
                    textStyle={styles.buttonText} 
                    variant="primary" 
                />
                <MainButton 
                    title="Reject"
                    onPress={reject}
                    style={styles.buttonContainer}
                    textStyle={styles.buttonText} 
                    variant="primary"
                />
            </View>
        </View>
    )
}

export default DecisionMakingWidget;

const styles = StyleSheet.create({
    decisionContainer: {
        width: "90%",
        height: 60,
        backgroundColor: Colors.impact,
        marginTop: 14,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        borderWidth: 3,
        borderColor: Colors.primary1,
        flexDirection: "row",
    },
    buttonContainer: {
        width: 100,
        height: 40,
        paddingVertical: 10,
        marginLeft: 8,
    },
    buttonText: {
        fontSize: 15,
    },
})