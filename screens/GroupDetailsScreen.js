import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import Colors from "../constants/colors";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import MemberIcon from "../components/icons/MemberIcon";
import SmallPinIcon from "../components/icons/SmallPinIcon";
import { updateGroup } from "../services/apiAuth";
import { useState } from "react";
import MessageModal from "../components/MessageModel";
import { addJoinRequest } from "../services/apiJoinRequests";
import { useUser } from "../components/authentication/useUser";

function GroupDetailsScreen({ route }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigation = useNavigation();
    const { group } = route.params;

    const { user } = useUser();

    const submitHandler = async () => {
        if (!message) {
            setErrorMessage("Please write a message to introduce yourself.");
            return;
        }

        try {
            setErrorMessage("");
            setIsModalVisible(false);
            await updateGroup({ group: "Pending" });
            console.log(user.id, group.id, message);
            const data = await addJoinRequest({
                userId: user.id,
                groupId: group.id,
                message,
            });
            console.log("yes");
            console.log("DATA: ", data);
            navigation.reset({
                index: 0,
                routes: [
                    {
                        name: "InApp",
                    },
                ],
            });
        } catch (error) {
            setErrorMessage("Something went wrong. Please try again later.");
        }
    };

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: group.avatar }} />
            <Text style={styles.title}>{group.name}</Text>
            <Text style={styles.header}>Description</Text>
            <View style={{ height: 270 }}>
                <ScrollView>
                    <Text style={styles.content}>{group.description}</Text>
                </ScrollView>
                <Text style={[styles.header, { marginTop: 10 }]}>Rules</Text>
                <ScrollView>
                    <Text style={[styles.content, { width: 170 }]}>
                        {group.rules}
                    </Text>
                </ScrollView>
            </View>
            <View style={styles.buttonContainer}>
                <PrimaryButton
                    title="REQUEST TO JOIN"
                    onPress={() => setIsModalVisible(true)}
                />
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.row}>
                    <View style={{ marginTop: 10 }}>
                        <SmallPinIcon />
                    </View>
                    <Text style={styles.info}>{group.location}</Text>
                </View>
                <View style={styles.row}>
                    <MemberIcon />
                    <Text style={styles.info}>{group.numberOfMem}</Text>
                </View>
            </View>
            <MessageModal
                visible={isModalVisible}
                onRequestClose={submitHandler}
                errorMessage={errorMessage}
                onMessageChange={setMessage}
            />
        </View>
    );
}

export default GroupDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    title: {
        fontWeight: "bold",
        marginBottom: 10,
        textTransform: "uppercase",
        alignSelf: "center",
        fontFamily: "RalewayBold",
        fontSize: 30,
        color: Colors.primary1,
        marginTop: 10,
        marginBottom: 80,
    },
    image: {
        height: "38%",
        width: "100%",
    },
    header: {
        fontFamily: "RalewayBold",
        fontSize: 18,
        color: Colors.primary2,
        marginLeft: 23,
    },
    content: {
        width: 296,
        //height: 73,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        fontFamily: "RalewayRegular",
        fontSize: 15,
        color: Colors.primary2,
        paddingTop: 14,
        marginLeft: 33,
    },
    buttonContainer: {
        alignItems: "flex-end",
        marginRight: 30,
        position: "absolute",
        bottom: 30,
        right: 0,
    },
    infoContainer: {
        flexDirection: "column",
        position: "absolute",
        top: 340,
        left: 227,
        width: 108,
        // zIndex: 5,
        gap: 10,
    },
    info: {
        fontFamily: "RalewayRegular",
        fontSize: 15,
        color: Colors.primary2,
    },
    row: {
        flexDirection: "row",
        gap: 20,
    },
});
