import { View, StyleSheet, FlatList } from "react-native";
import Colors from "../../constants/colors";
import { useUser } from "../../hooks/auth/useUser";
import { useRoute } from "@react-navigation/native";
import InboxUserWidget from "../../components/InboxUserWidget";
import { useConversations } from "../../hooks/conversations/useConversations";

function InboxScreen() {
    const { user } = useUser(); 
    const route = useRoute();
    const { conversations, isLoading } = useConversations();
    console.log("Conversations in InboxScreen: ", conversations);

    return (
            <View style={styles.container}>
                <FlatList
                    data={conversations}
                    renderItem={({ item }) => (
                        <InboxUserWidget thread={item}/>
                    )}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    bounce={false}
                />
            </View>
    );
}

export default InboxScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        // paddingLeft: 40,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10,
        color: Colors.primary1,
    },
    threadsContainer: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    threadItem: {
        backgroundColor: "#f2f2f2",
        borderRadius: 15,
        padding: 10,
        marginHorizontal: 5,
    },
    selectedThread: {
        backgroundColor: Colors.primary1,
    },
    threadName: {
        fontWeight: "bold",
        color: "black",
    },
    selectedThreadHeader: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        padding: 10,
    },
    selectedThreadTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.primary1,
    },
    messagesList: {
        flex: 1,
        padding: 10,
    },
    messageItem: {
        maxWidth: "70%",
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
    },
    myMessage: {
        backgroundColor: Colors.primary1,
        alignSelf: "flex-end",
    },
    theirMessage: {
        backgroundColor: "#eee",
        alignSelf: "flex-start",
    },
    messageText: {
        color: "black",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderTopWidth: 1,
        borderColor: "#ccc",
    },
    input: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        borderRadius: 20,
        paddingHorizontal: 15,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: Colors.primary1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    sendButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    noThreadSelected: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
