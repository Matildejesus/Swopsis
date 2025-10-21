import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Title from "../components/Title";
import { getMessagesForConvo, sendMessage, updateDecision } from "../services/apiChat";
import InputField from "../components/authentication/InputField";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";
import { useUser } from "../hooks/auth/useUser";
import { updateAvailability, updateTradeCount, updateUnavailability } from "../services/apiItems";
import ChatItemWidget from "../components/ChatItemWidget";
import DecisionMakingWidget from "../components/DecisionMakingWidget";
import { findUserById, updateUserImpactData } from "../services/apiAdmin";
import CalendarIcon from "../components/icons/CalendarIcon";
import { useMessages } from "../hooks/conversations/useMessage";
import { useGroupWardrobe } from "../hooks/useGroupWardrobe";
import { useConversationSubscription } from "../hooks/conversations/useConversationSubscription";
import { useQueryClient } from "@tanstack/react-query";
import DashboardIcon from "../components/icons/DashboardIcon";
import { useBlocked } from "../hooks/useBlocked";
import { unblockUser } from "../services/apiBlocked";
import { getSubcategoryDetails } from "../services/apiItemConvert";
import { useUpdateUserMetadata } from "../hooks/auth/useUpdateUserMetadata";

function ChatScreen() {
    const route = useRoute();
    const { user } = useUser();
    const { thread } = route.params;
    const navigation = useNavigation();
    const [newMessage, setNewMessage] = useState("");
    const [selectedItem, setSelectedItem]= useState([]);
    const [ decision, setDecision ] = useState(null);
    const { groupWardrobe } = useGroupWardrobe();
    console.log("USER: ", user.user.id);
    useConversationSubscription(thread.id, user.user.id);
    const queryClient = useQueryClient();
    const { blocked, beingBlocked } = useBlocked();
    const [blockedMessage, setBlockedMessage] = useState("");
    const [userBlocked, setUserBlocked] = useState(false);

    const { messages, isSending } = useMessages(thread.id);

    const { updateUserMetadata } = useUpdateUserMetadata();

    const otherUserId = user?.user?.id === thread?.userId_1 ? thread?.userId_2 : thread?.userId_1;

    useEffect(() => {
        queryClient.setQueryData(["unread", thread.id], 0);

        if (Array.isArray(blocked) && blocked.includes(thread.userId_1)) {
            setBlockedMessage(`You blocked ${thread.userName}.`);
            setUserBlocked(true);     
        } else if (Array.isArray(beingBlocked) && beingBlocked.includes(thread.userId_2)) {
            setBlockedMessage(`You have been blocked by ${thread.userName}.`);
            setUserBlocked(false);   
        } else {
            setBlockedMessage("");
            setUserBlocked(false);
        }
    }, [thread, blocked, beingBlocked]);

    useLayoutEffect(() => {
        if (thread?.userName) {
            navigation.setOptions({
                headerLeft: (props) => (
                    <Title
                    title={thread.userName}
                    goBack={true}
                    avatar={thread.avatar}
                    {...props}
                    />
                ),
                headerRight: () => (
                    <DashboardIcon
                    screen="chat"
                    meId={thread?.userId_2}
                    themId={thread?.userId_1}
                    />
                ),
                headerTitle: ""
            });
        }
    }, [navigation, thread]);

    const unblock = async () => {
        try {
            await unblockUser({ user1: user.user.id, user2: otherUserId });
            queryClient.setQueryData(["blocked"], (prev) =>
            Array.isArray(prev) ? prev.filter((id) => id !== otherUserId) : prev
            );
            setBlockedMessage("");   
            setUserBlocked(false);   
        } catch (e) {
            console.error("Unblock failed:", e?.message || e);
        }
    };


    const handleText = async () => {
        if (!newMessage.trim()) return; 
    
        const newMessageObj = {
            id: Math.random().toString(),
            senderId: user.user.id,
            text: newMessage,
            conversationId: thread.id,
            createdAt: new Date().toISOString(), 
        };
    
        setNewMessage(""); 
    
        try {
            await sendMessage({
                senderId: user.user.id,
                text: newMessage,
                conversationId: thread.id,
            });
    
            const updatedMessages = await getMessagesForConvo({ conversationId: thread.id });
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const applyDecisionLocal = (id, choice) => {
        queryClient.setQueryData(["messages", thread.id], (old = []) =>
            old.map(m => (m.id === id ? { ...m, decision: choice } : m))
        );
    };


    useEffect(() => {
        const makeDecision = async () => {
            try {
                if (decision === "accept") {
                    if (!selectedItem || !selectedItem.itemId) {
                        console.error("No selected item or itemId");
                        return;
                    }
    
                    await updateDecision({ id: selectedItem.id, decision }); 
                    await updateAvailability({ available: false, itemId: selectedItem.itemId });
                    
                    const item = groupWardrobe.find(item => item.id === selectedItem.itemId);

                    const newCount = await updateTradeCount({ id: item.id, count: item.tradeCount});
                    console.log(newCount);

                    const itemInfo = item.extraInfo;
                    const categoryData = await getSubcategoryDetails({ item: itemInfo.subcategory });
    
                    const mergedDates = { ...item.unavailableDates };

                    for (const date in selectedItem.loanDates) {
                        mergedDates[date] = {
                            ...item.unavailableDates[date],  // Keep existing properties
                            ...selectedItem.loanDates[date], // Add new properties
                        };
                    }
    
                    await updateUnavailability({ id: selectedItem.itemId, dates: mergedDates });
    
                    const receiverUser = await findUserById({ id: selectedItem.senderId });
    
                    const updatedCoins = receiverUser.user_metadata.coins - 1;
                    const updatedLitres = receiverUser.user_metadata.totalLitres + categoryData.litres;
                    const updatedWeight = receiverUser.user_metadata.totalWeight + parseFloat(itemInfo.weight);
                    const updatedSwapped = receiverUser.user_metadata.itemsSwapped + 1;
                    
                    const currUser = user.user.user_metadata;
                    let currUserUpdatedLitres, currUserUpdatedWeight;
                    if (selectedItem.loanDates) {
                        currUserUpdatedLitres = currUser.totalLitres + categoryData.litres;
                        currUserUpdatedWeight = currUser.totalWeight + parseFloat(itemInfo.weight);
                    }

                    const currUserUpdatedCoins = currUser.coins + 1;
                    const currUserUpdatedSwapped = currUser.itemsSwapped + 1;
    
                    let updatedCarbon, currUserUpdatedCarbon;
                    if (categoryData.scalable) {
                        updatedCarbon = itemInfo.weight * categoryData.carbon;
                        if (selectedItem.loanDates) currUserUpdatedCarbon = itemInfo.weight * categoryData.carbon;
                    } else {
                        updatedCarbon = categoryData.carbon;
                        if (selectedItem.loanDates) currUserUpdatedCarbon = categoryData.carbon;
                    }
    
                    await updateUserImpactData({
                        id: selectedItem.senderId,
                        newCoins: updatedCoins,
                        totalLitres: updatedLitres,
                        totalCarbon: updatedCarbon,
                        totalWeight: updatedWeight,
                        itemsSwapped: updatedSwapped,
                    });
                    
                    const ownerUpdate = {
                        id: user.user.id,
                        newCoins: currUserUpdatedCoins,
                        itemsSwapped: currUserUpdatedSwapped,
                    };
                    if (currUserUpdatedLitres != null)  ownerUpdate.totalLitres  = currUserUpdatedLitres;
                    if (currUserUpdatedCarbon != null) ownerUpdate.totalCarbon  = currUserUpdatedCarbon;
                    if (currUserUpdatedWeight != null) ownerUpdate.totalWeight  = currUserUpdatedWeight;

                    // await updateUserImpactData(ownerUpdate);
                    await updateUserMetadata(ownerUpdate);
    
                } else if (decision === "reject") {
                    await updateDecision({ id: selectedItem.id, decision });
                }
            } catch (error) {
                console.error("Error saving decision: ", error.message);
            }
        };
    
        if (decision && selectedItem) {
            makeDecision();
        }
    }, [decision, selectedItem]);
    
    
    return (
        <View style={styles.container}>

            <FlatList
                data={messages}
                renderItem={({ item }) => {
                    return (
                    item.text ? (
                        <View style={item.senderId === user.user.id
                            ? styles.textContainer 
                            : styles.receiverTextContainer 
                        }>
                            <Text style={styles.text}>{item.text}</Text>
                        </View>
                    ) : (
                        <>
                        {item.senderId != user.user.id && !item.decision &&
                                ( <DecisionMakingWidget 
                                    accept={()=> { 
                                        setDecision("accept");  
                                        setSelectedItem(item);
                                        applyDecisionLocal(item.id, "accept");
                                    } 
                                    }
                                    reject={() => {
                                        setDecision("reject");
                                        setSelectedItem(item);
                                        applyDecisionLocal(item.id, "reject");
                                    }
                                    }
                                /> 
                            )}
                             {(decision || item.decision) && (
                                <View style={styles.announcement}>
                                <Text >
                                    Item {decision || item.decision}ed for 
                                </Text>

                                {item.method ? <Text> loan</Text> : <Text> swap</Text>}
                           </View> )
                            }

                             <View style={item.senderId === user.user.id
                                ? styles.imageContainer 
                                : styles.receiverImageContainer 
                            }>
                                <View style={styles.rowContainer}>
                                <ChatItemWidget itemId={item.itemId} currentUser={user}/>
                                {Object.keys(item.loanDates).length > 0  && 
                                    (  
                                        <View style={styles.calenderContainer}>
                                            {(!decision || !item.decision) && (
                                                <CalendarIcon 
                                                    calendarDates={item.loanDates} 
                                                    itemId={item.itemId} 
                                                    owner={false} 
                                                />
                                            )}

                                        </View>
                                   
                                    ) 
                                } 
                                </View>
                            </View> 
                           
                        </>
                    )
                )}}
                inverted
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                bounces={false}
            />
            {blockedMessage != "" ? (
                <View style={styles.blockedContainer}>
                    <Text style={styles.blocked}>{blockedMessage}</Text>
                    {userBlocked && 
                        <MainButton 
                            title="Unblock"
                            textStyle={{fontSize: 14}}
                            style={{width: 240}}
                            onPress={unblock}
                        />
                    }
                </View>
            ): (
                <View style={styles.inputContainer}>
                <InputField
                    placeholder="Type your message here..."
                    inputStyle={styles.inputStyle}
                    value={newMessage} 
                    onChangeText={setNewMessage}
                    multiline={true}
                    numberOfLines={5}
                    maxLength={200}
                    containerStyle={styles.fieldContainer}
                />
                <MainButton 
                    title="SEND"
                    onPress={handleText}
                    style={styles.buttonContainer}
                    textStyle={styles.buttonText} 
                    variant="primary"  
                />
            </View>
            )}

            
        </View>
    );
}

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",

    },
    inputStyle: {
        color: Colors.primary2,
        fontFamily: "Raleway_400Regular",
        fontSize: 13,
        textAlignVertical: "top",
        flexGrow: 1
    },
    buttonContainer: {
        width: 100,
        height: 40,
        paddingVertical: 10,
        marginBottom: 15,
    },
    buttonText: {
        fontFamily: "Raleway_500Medium",
        fontSize: 15,

    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        marginTop: 22,
        width: 231
    }, 
    fieldContainer: {
        minHeight: 40, 
        maxHeight: 120,
    },
    textContainer: {
        width: 231,
        backgroundColor: Colors.primary1,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        marginTop: 18,
        alignSelf: "flex-end",
        marginRight: 16,
    },
    receiverTextContainer: {
        width: 231,
        backgroundColor: Colors.primary2,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomEndRadius: 20,
        marginTop: 18,
        marginLeft: 16,
    },
    imageContainer: {
        paddingVertical: 7,
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        marginTop: 18,
        alignSelf: "flex-end",
        marginRight: 16,
        height: 73,
    },
    receiverImageContainer: {
        paddingVertical: 7,
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        marginTop: 18,
        marginLeft: 16,
        height: 73,
    },
    messageContainer: {
        alignContent: "flex-end"
    },
    text: {
        color: "white",
        fontFamily: "Raleway_400Regular",
    },
    announcement: {
        fontFamily: "Raleway_400Regular",
        fontSize: 13,
        color: Colors.primary2,
        opacity: 0.5,
        alignSelf: "center",
        flexDirection: "row"
    },
    calenderContainer: {
     //paddingTop: "80%",
     paddingTop: 40,
    // flexShrink: 1,
    },
    itemContainer: {
        marginVertical: 10,
        padding: 10, // Add padding around the entire item container
        backgroundColor: "#f9f9f9", // Light background for distinction
        borderRadius: 8, // Rounded corners
        shadowColor: "#000", // Shadow for depth
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
        
    },
    rowContainer: {
        flexDirection: "row",
        gap: 10,
        height: 73,
    },
    blocked: {
        marginBottom: 20,
        alignSelf: "center",
        color: Colors.primary1
    },
    blockedContainer: {
        // flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        marginTop: 22,
        // width: 231
    }
})