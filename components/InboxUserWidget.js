import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { findUserById, findUserByIdforInbox } from "../services/apiAdmin";
import Colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../hooks/auth/useUser";

function InboxUserWidget({ thread }) {
    const { user } = useUser();
    const [receiverUser, setReceiverUser] = useState(null);
    const [receiverUserData, setReceiverUserData] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const receiverId = thread.userId_1 === user.user.id ? thread.userId_2 : thread.userId_1;
        setReceiverUser(receiverId);
    }, [thread, user]);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!receiverUser) return;

            try {
                const data = await findUserByIdforInbox({ id: receiverUser });
                console.log(data.user.user_metadata.avatar);
                setReceiverUserData(data.user.user_metadata);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        if (receiverUser) {
            fetchUserData();
        }
    }, [receiverUser]);

    console.log("RECEIVER USER DATA: ", receiverUserData);
    return (
        receiverUserData && (
            <TouchableOpacity onPress={() => navigation.navigate("Chat", { thread: thread, receiverUser: receiverUserData })}>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: receiverUserData.avatar }} style={styles.imageContainer}/>
                    </View>
                    <Text style={styles.name}>{receiverUserData.userName}</Text>
                </View>
            </TouchableOpacity>
        )
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
        fontFamily: "RalewayBold",
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
