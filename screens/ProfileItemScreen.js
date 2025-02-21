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
import { createConversation } from "../services/apiChat.js";

function ProfileItemScreen() {
    const [selectedOption, setSelectedOption] = useState(0);

    const { user: currentUser } = useUser();

    const navigation = useNavigation();
    const handleChange = (index) => {
        setSelectedOption(index);
    };

    const route = useRoute();
    const { itemData, owner, user } = route.params;


    const handleContact = async () => {
        try {
           const conversation = await createConversation({user1: itemData.userId, user2: currentUser.id});
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
                        {selectedOption === 0 ? (
                            <ContactButton handleContact={handleContact}/>
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
