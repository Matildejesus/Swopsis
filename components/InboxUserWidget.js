import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function InboxUserWidget({ thread }) {
    const navigation = useNavigation();

    const { data: unreadCount = 0 } = useQuery({
        queryKey: ["unread", thread.id],
        queryFn: async () => 0,
        initialData: 0,
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,  
    });


    return (
            <TouchableOpacity onPress={() => navigation.navigate("Chat", { thread: thread})}>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: thread.avatar }} style={styles.imageContainer}/>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.name}>{thread.userName}</Text>
                        {unreadCount > 0 && <Text style={styles.message}>{unreadCount} New Message{unreadCount>1?'s':''}</Text>}
                    </View>
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
        borderRadius: 10,
        borderColor: Colors.primary1,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,

        // Android shadow
        elevation: 3,
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
        // alignSelf: "center"
    },
    imageContainer: {
        backgroundColor: Colors.primary1,
        width: 60,
        height: 60, 
        borderRadius: 30,
        marginRight: 21,
    },
    message: {
        fontFamily: "Raleway_500Regular",
        fontSize: 12,
        color: "grey",
        marginTop: 4
        // alignSelf: "center"
    },
    textContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",   
        justifyContent: "center",
    }
});
