import { View } from "react-native";
import { StyleSheet } from "react-native";
import SegmentedBar from "../components/SegmentedBar";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import ProfileItemDetails from "../components/ItemWidgets/ProfileItemDetails";
import ProfileItemReviews from "../components/ItemWidgets/ProfileItemReviews";
import ContactButton from "../components/ItemWidgets/ContactButton";
import ReviewButton from "../components/ItemWidgets/ReviewButton";
import { useUser } from "../components/authentication/useUser";
import TrashIcon from "../components/icons/TrashIcon.js";
import { createConversation, getConversation, sendMessage } from "../services/apiChat.js";
import MessageModal from "../components/MessageModal.js";

function ProfileItemScreen() {
    const [selectedOption, setSelectedOption] = useState(0);
    const { user: currentUser } = useUser();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [conversation, setConversation] = useState();

    const navigation = useNavigation();
    const handleChange = (index) => {
        setSelectedOption(index);
    };

    const closeModal = () => {
        setIsModalVisible(false); 
    };

    const route = useRoute();
    const { itemData, owner, user } = route.params;
    console.log("ITEM DATA: ", itemData);

    const submitHandler = async () => {
        if (!message) {
            setErrorMessage("Please write a message.");
            return;
        }
        try {
            setErrorMessage("");
            setIsModalVisible(false);
            const pendingConversation = await getConversation({ userId_1: itemData.userId, userId_2: currentUser.id});
            if (pendingConversation) {
                setConversation(pendingConversation);
            } else {
                pendingConversation = await createConversation({user1: itemData.userId, user2: currentUser.id});
                setConversation(pendingConversation);
            }
            await sendMessage({ senderId: currentUser.id, itemId: itemData.id, conversationId: pendingConversation.id });
            await sendMessage({ senderId: currentUser.id, text: message, conversationId: pendingConversation.id});
          
            navigation.navigate('InApp', {
                screen: 'Inbox',
                params: { conversationId: 'conversation.id' },
              })
        } catch (error) {
            console.error("Error creating conversation: ", error);
        }
    }

    return (
        <View style={styles.container}>
            {selectedOption === 0 ? (
                <ProfileItemDetails itemData={itemData} user={user} owner={owner} />
            ) : (
                <ProfileItemReviews user={user} />
            )}

            <View style={styles.column2}>
                <SegmentedBar
                    option1="Details"
                    option2="Reviews"
                    selectedIndex={selectedOption}
                    onChange={handleChange}
                />
            </View>
            {!owner ? (
                <>
                    <View style={styles.button}>
                        {selectedOption === 0 && itemData.available ? (
                            <ContactButton handleContact={() => setIsModalVisible(true)} />
                        ) : (
                            <ReviewButton />
                        )}
                    </View>
                </>
            ) : (
                <>
                    <View style={styles.button}>
                    </View>
                </>
            )}
            <MessageModal
                visible={isModalVisible}
                onRequestClose={submitHandler}
                onBackdropPress={closeModal}
                errorMessage={errorMessage}
                onMessageChange={setMessage}
                method={itemData.method}
            />
        </View>
    );
}

export default ProfileItemScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
    },
    column2: {
        alignItems: "center",
        paddingHorizontal: "15%",
        justifyContent: "flex-end",
        flex: 1,
        paddingBottom: 10,
        //  marginBottom: 40,
        // position: "absolute",
        // zIndex: 10,
    },
    button: {
        paddingLeft: "60%",
        justifyContent: "flex-end",
        flex: 1,
        paddingBottom: 40,
        paddingRight: 40,
    },
});
