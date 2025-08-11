import { View } from "react-native";
import { StyleSheet } from "react-native";
import SegmentedBar from "../components/SegmentedBar";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import ProfileItemDetails from "../components/ItemWidgets/ProfileItemDetails";
import ProfileItemReviews from "../components/ItemWidgets/ProfileItemReviews";
import ContactButton from "../components/ItemWidgets/ContactButton";
import ReviewButton from "../components/ItemWidgets/ReviewButton";
import { useUser } from "../hooks/auth/useUser.js";
import { sendMessage } from "../services/apiChat.js";
import MessageModal from "../components/MessageModal.js";
import Colors from "../constants/colors.js";
import { useConversations } from "../hooks/conversations/useConversations.js";
import { useAddConversation } from "../hooks/conversations/useAddConversation.js";

function ProfileItemScreen() {
    const [selectedOption, setSelectedOption] = useState(0);
    const { user: currentUser } = useUser();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [conversation, setConversation] = useState();
    const [selectedDates, setSelectedDates] = useState({});
    const {addConversation, isLoading } = useAddConversation();
    const { conversations } = useConversations();

    const navigation = useNavigation();
    const handleChange = (index) => {
        setSelectedOption(index);
    };

    const closeModal = () => {
        setIsModalVisible(false); 
    };

    const handleContact = () => {
        setIsModalVisible(true);
    };


    const route = useRoute();
    const { itemData, showModal, owner, user } = route.params;
    console.log("ITEM DATA: ", itemData);

    useEffect(() => {
        if (showModal) {
            setIsModalVisible(true);
        }
    }, [showModal]);

    const toggleDate = (day) => {
        const { dateString } = day;
    
        // Prevent selecting unavailable dates (already marked in red)
        if (itemData.unavailableDates?.[dateString]?.dotColor === "red") {
            return;
        }
    
        setSelectedDates((prevDates) => {
            const newDates = { ...prevDates };
            if (newDates[dateString]) {
                delete newDates[dateString]; // Remove if already selected
            } else {
                newDates[dateString] = {
                    marked: true,
                    dotColor: Colors.primary2, // Dark green
                    selected: true,
                };
            }
            return newDates; // Ensure React re-renders
        });
    };
    

    const submitHandler = async () => {
        if (!message) {
            setErrorMessage("Please write a message.");
            return;
        }
        try {
            setErrorMessage("");
            let pendingConversation = conversations.find(
                (conv) => conv.userId_1 === itemData.userId && conv.userId_2 === currentUser.user.id
            );
            // let pendingConversation = await getConversation({ userId_1: itemData.userId, userId_2: currentUser.user.id});
            if (!pendingConversation) {
                // pendingConversation = await createConversation({user1: itemData.userId, user2: currentUser.user.id});
                pendingConversation = addConversation({ user1: itemData.userId, user2: currentUser.user.id });

            }
            console.log("Pending Conversation: ", pendingConversation);
            if (selectedDates) {
                console.log("selectedDates: ", selectedDates);
                await sendMessage({ senderId: currentUser.user.id, itemId: itemData.id, loanDates: selectedDates, conversationId: pendingConversation.id});
            } else {
                await sendMessage({ senderId: currentUser.user.id, itemId: itemData.id, conversationId: pendingConversation.id });
            }
            await sendMessage({ senderId: currentUser.user.id, text: message, conversationId: pendingConversation.id});
          
            setIsModalVisible(false);
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
                <ProfileItemDetails itemData={itemData} />
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
            {!owner && currentUser.user.app_metadata.role != "super-admin" ? (
                <>
                    <View style={styles.button}>
                        {selectedOption === 0 && itemData.available ? (
                            <ContactButton handleContact={handleContact} display="button"/>
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
                markedDates={{ ...itemData.unavailableDates, ...selectedDates }}
                toggleDate={toggleDate}
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
    },
    button: {
        paddingLeft: "60%",
        justifyContent: "flex-end",
        flex: 1,
        paddingBottom: 40,
        paddingRight: 40,
    },
});
