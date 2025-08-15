import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

function InboxUserWidget({ thread }) {
    const navigation = useNavigation();

    return (
            <TouchableOpacity onPress={() => navigation.navigate("Chat", { thread: thread})}>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: thread.avatar }} style={styles.imageContainer}/>
                    </View>
                    <Text style={styles.name}>{thread.userName}</Text>
                </View>
            </TouchableOpacity>
    );
}

export default InboxUserWidget;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        marginTop: 25,
    },
    threadsContainer: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    selectedThread: {
        backgroundColor: Colors.primary1,
    },
    name: {
        fontFamily: "Raleway_700Bold",
        fontSize: 15,
        color: Colors.primary1,
        alignSelf: "center"
    },
    imageContainer: {
        backgroundColor: Colors.primary1,
        width: 60,
        height: 60, 
        borderRadius: 30,
        marginRight: 21,
    }
});
