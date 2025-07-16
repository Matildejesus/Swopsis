import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import RegisterContainer from "./authentication/RegisterContainer";
import SecondaryButton from "./SecondaryButton";
import Colors from "../constants/colors";
import AddIcon from "./icons/AddIcon";

function BulletPointWidget({pointsList, setPointsList}) {
    const [ input, setInput ] = useState("");

     const addBulletPoint = () => {
        if (input.trim()) {  // Avoid adding empty bullet points
            setPointsList([...pointsList, input.trim()]);
            setInput("");  // Clear input field after adding
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.rowContainer}>
                <RegisterContainer 
                    value={input}
                    onChangeText={(text) => setInput(text)}
                    placeholder={"Enter rules..."}
                    text="Rules"
                    containerStyle={styles.inputContainer}/>
                {/* <SecondaryButton title="Add Rule" onPress={addBulletPoint} styleContainer={styles.buttonContainer} textStyle={styles.buttonText}/> */}
                <AddIcon onPress={addBulletPoint} buttonStyle={styles.addButton} />
            </View>            
            <FlatList
                data={pointsList}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <Text style={styles.bulletPointText}>• {item}</Text>
                )}
                style={styles.flatlist}
                scrollEnabled={true} 
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

export default BulletPointWidget;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowContainer: {
        flexDirection: "row"
    },
    buttonContainer: {
        width: 50,
        height: 50,
    },
    flatlist: {
        height: 100,
        width: 243,
        overflow: "hidden",
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    inputContainer: {
        marginRight: 10,
        borderRadius: 10,
        borderColor: Colors.primary2,
        borderWidth: 1,
        width: 195,
        backgroundColor: "white",
        opacity: 0.76,
        paddingHorizontal: 13,
        paddingVertical: 16,
    }, 
    addButton: {
        marginTop: 20,
    },
    bulletPointText: {
        fontFamily: "RalewayRegular",
        color: Colors.primary2,
    }
})