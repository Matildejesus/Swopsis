import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Title from "../components/Title";
import { getMessagesForConvo, sendMessage, updateDecision } from "../services/apiChat";
import InputField from "../components/authentication/InputField";
import Colors from "../constants/colors";
import PrimaryButton from "../components/PrimaryButton";
import { useUser } from "../components/authentication/useUser";
import { getItemById, getItemsInfo, updateAvailability } from "../services/apiItems";
import ChatItemWidget from "../components/ChatItemWidget";
import DecisionMakingWidget from "../components/DecisionMakingWidget";
import { findUserById, updateUserImpactData } from "../services/apiAdmin";
import { getSubcategoryDetails } from "../services/apiItemConvert";

function ChatScreen() {
    const route = useRoute();
    const { user } = useUser();
    const { thread, receiverUser } = route.params;
    const navigation = useNavigation();
    const [messages, setMessages] = useState([]); // Initialize as empty array
    const [newMessage, setNewMessage] = useState("");
    const [selectedItem, setSelectedItem]= useState([]);
    const [ decision, setDecision ] = useState(null);

    console.log("RECEIVER USER: ", receiverUser);

    useLayoutEffect(() => {
        if (receiverUser?.userName) {
            navigation.setOptions({
                headerTitle: (props) => (
                    <Title title={receiverUser.userName} goBack={true} avatar={receiverUser.avatar} {...props}  />
                ),
            });
        }
    }, [navigation, receiverUser]);

    useEffect(() => {
        let isMounted = true; 

        const fetchMessages = async () => {
            try {
                const fetchedMessages = await getMessagesForConvo({ conversationId: thread.id });
                if (isMounted) {
                    setMessages(fetchedMessages);
                }
            } catch (error) {
                console.error("Error fetching messages: ", error.message);
            }
        };

        fetchMessages();

        return () => {
            isMounted = false; 
        };
    }, [thread.id]);

    const handleText = async () => {
        if (!newMessage.trim()) return; 
    
        const newMessageObj = {
            id: Math.random().toString(),
            senderId: user.id,
            text: newMessage,
            conversationId: thread.id,
            createdAt: new Date().toISOString(), 
        };
    
        setMessages((prevMessages) => [newMessageObj, ...prevMessages]);
    
        setNewMessage(""); 
    
        try {
            await sendMessage({
                senderId: user.id,
                text: newMessage,
                conversationId: thread.id,
            });
    
            const updatedMessages = await getMessagesForConvo({ conversationId: thread.id });
            setMessages(updatedMessages);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    useEffect(() => {
        const makeDecision = async () => {
            try {
               if (decision == "accept") {
                // how would i get item.itemiD, BECAUSE THAT IS IN THE FLATLIST
                    await updateDecision({ id: selectedItem.id, decision});
                    updateAvailability({ available: false, itemId: selectedItem.itemId});
                    const item = await getItemById({ id: selectedItem.itemId });
                    console.log("get item: ", item);
                    const itemInfo = await getItemsInfo({ category: item.category, itemId: item.id});
                    const categoryData = await getSubcategoryDetails({ item: itemInfo.subcategory});
                    console.log("SENDERID: ", selectedItem.senderId);
                    const receiverUser = await findUserById({ id: selectedItem.senderId});
                    console.log("RECEIVER USER: ", receiverUser.user_metadata);
                    const updatedCoins = receiverUser.user_metadata.coins - 1;
                    console.log(updatedCoins);
                    const updatedLitres = receiverUser.user_metadata.totalLitres + categoryData.litres;
                    console.log(updatedLitres);
                    const updatedWeight = receiverUser.user_metadata.totalWeight + parseFloat(itemInfo.weight);
                    console.log(updatedWeight);
                    const updatedSwapped = receiverUser.user_metadata.itemsSwapped + 1;
                    console.log(updatedSwapped);
                    console.log("scalable");
                    if (categoryData.scalable == true ) {
                        const updatedCarbon = (itemInfo.weight * categoryData.carbon);
                        console.log("dataaaaa: ", updatedCarbon, updatedLitres, updatedWeight, updatedSwapped);
                        await updateUserImpactData({ id: selectedItem.senderId, newCoins: updatedCoins, totalLitres: updatedLitres, totalCarbon: updatedCarbon, totalWeight: updatedWeight, itemsSwapped: updatedSwapped });
                    } else {
                        const updatedCarbon  = (categoryData.carbon);
                        console.log("dataaaaa: ", updatedCarbon, updatedLitres, updatedWeight, updatedSwapped);
                        await updateUserImpactData({ id: selectedItem.senderId, newCoins: updatedCoins, totalLitres: updatedLitres, totalCarbon: updatedCarbon, totalWeight: updatedWeight, itemsSwapped: updatedSwapped });
                    }
                } else if (decision == "reject") {
                    console.log("SELECTED ITEM ID: ", selectedItem);
                    await updateDecision({ id: selectedItem.id, decision });
                }
            } catch (error) {
                console.error("Error saving decision: ", error.message);
            }
        };

        makeDecision();

    }, [decision, selectedItem]);
    
    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={({ item }) => (
                    item.text ? (
                        <View style={item.senderId === user.id
                            ? styles.textContainer 
                            : styles.receiverTextContainer 
                        }>
                            <Text style={styles.text}>{item.text}</Text>
                        </View>
                    ) : (
                        <>
                            {item.senderId != user.id && !item.decision && ( <DecisionMakingWidget 
                                accept={()=> { 
                                    setDecision("accept");  
                                    setSelectedItem(item);} 
                                }
                                reject={() => {
                                    setDecision("reject");
                                    setSelectedItem(item);}
                                }
                            /> )}
                           {decision || item.decision && (
                            <Text style={styles.announcement}>Item {decision || item.decision}ed for Swap</Text>
                           )}
                            <View style={item.senderId === user.id
                                ? styles.imageContainer 
                                : styles.receiverImageContainer 
                            }>
                                <ChatItemWidget itemId={item.itemId} currentUser={user}/>
                            </View>
                            
                        </>
                    )
                )}
                inverted
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                bounces={false}
            />

            <View style={styles.inputContainer}>
            <InputField
                placeholder="Type your message here..."
                inputStyle={styles.inputStyle}
                value={newMessage} // Fixed value prop
                onChangeText={setNewMessage} // Corrected event handler
                multiline={true}
                numberOfLines={5}
                maxLength={200}
                containerStyle={styles.fieldContainer}
            />
            <PrimaryButton 
                title="SEND"
                onPress={handleText}
                style={styles.buttonContainer}
                textStyle={styles.buttonText}   
            />
            </View>
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
        fontFamily: "RalewayRegular",
        fontSize: 13,
        textAlignVertical: "top",
        flexGrow: 1
    },
    buttonContainer: {
        width: 100,
        height: 40,
        paddingVertical: 10,
        marginLeft: 8,
    },
    buttonText: {
        fontFamily: "RalewayMedium",
        fontSize: 15,

    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: 20,
        marginTop: 22,
    }, 
    fieldContainer: {
        borderColor: Colors.primary2,
        borderWidth: 1,
        borderRadius: 10, 
        opacity: 0.76,
        paddingVertical: 3,
        marginLeft: 30,
        paddingHorizontal: 13,
        borderRadius: 10,
        opacity: 0.76,
        minHeight: 40, // Ensures input box is visible initially
        maxHeight: 120, // Prevents it from expanding beyond 5 lines
        width: "60%", 
        alignSelf: "center",
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
       // paddingHorizontal: 16,
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
        fontFamily: "RalewayRegular",
    },
    announcement: {
        fontFamily: "RalewayRegular",
        fontSize: 13,
        color: Colors.primary2,
        opacity: 0.5,
        alignSelf: "center"
    }
})