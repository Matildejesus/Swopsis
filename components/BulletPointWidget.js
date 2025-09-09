import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../constants/colors";
import AddIcon from "./icons/AddIcon";
import InputField from "./authentication/InputField";

function BulletPointWidget({pointsList, setPointsList}) {
    const [ input, setInput ] = useState("");

     const addBulletPoint = () => {
        if (input.trim()) {  
            setPointsList([...pointsList, input.trim()]);
            setInput("");  
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.rowContainer}>
                <InputField 
                    value={input}
                    onChangeText={(text) => setInput(text)}
                    placeholder={"Enter rules..."}
                    text="Rules"
                    containerStyle={styles.inputContainer}
                />
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
        alignSelf: "flex-start",
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
        width: 280,
        overflow: "hidden",
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    inputContainer: {
        marginRight: 7,
       height: 100,
    }, 
    addButton: {
        marginTop: 25,
    },
    bulletPointText: {
        fontFamily: "Raleway_400Regular",
        color: Colors.primary2,
    }
})