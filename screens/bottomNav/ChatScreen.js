import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Title from "../../components/Title";
import { getMessagesForConvo, sendMessage, updateDecision } from "../../services/apiChat";
import InputField from "../../components/authentication/InputField";
import Colors from "../../constants/colors";
import MainButton from "../../components/MainButton";
import { useUser } from "../../components/authentication/useUser";
import { getItemById, getItemsInfo, updateAvailability, updateTradeCount, updateUnavailability } from "../../services/apiItems";
import ChatItemWidget from "../../components/ChatItemWidget";
import DecisionMakingWidget from "../../components/DecisionMakingWidget";
import { findUserById, updateUserImpactData } from "../../services/apiAdmin";
import { getSubcategoryDetails } from "../../services/apiItemConvert";
import CalendarWidget from "../../components/CalendarWidget";
import CalendarIcon from "../../components/icons/CalendarIcon";

function ChatScreen() {
    const route = useRoute();
    const { user } = useUser();
    const { thread, receiverUser } = route.params;
    const navigation = useNavigation();
    const [messages, setMessages] = useState([]); // Initialize as empty array
    const [newMessage, setNewMessage] = useState("");
    const [selectedItem, setSelectedItem]= useState([]);
    const [ decision, setDecision ] = useState(null);
    const [decisionDisplay, setDecisionDisplay] = useState(false);

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
                if (decision === "accept") {
                    if (!selectedItem || !selectedItem.itemId) {
                        console.error("No selected item or itemId");
                        return;
                    }
    
                    await updateDecision({ id: selectedItem.id, decision });
    
                    if (!selectedItem.loanDates) {
                        await updateAvailability({ available: false, itemId: selectedItem.itemId });
                    }
    

                    const item = await getItemById({ id: selectedItem.itemId });
                    console.log("get item: ", item);
                    const newCount = await updateTradeCount({ id: item.id, count: item.tradeCount});
                    console.log("trade count", newCount);
    
                    const itemInfo = await getItemsInfo({ category: item.category, itemId: item.id });
                    console.log("items info: ", itemInfo);
                    const categoryData = await getSubcategoryDetails({ item: itemInfo.subcategory });
    
                    console.log("SENDERID: ", selectedItem.senderId);
    
                    const mergedDates = { ...item.unavailableDates };

                    for (const date in selectedItem.loanDates) {
                        mergedDates[date] = {
                            ...item.unavailableDates[date],  // Keep existing properties
                            ...selectedItem.loanDates[date], // Add new properties
                        };
                    }
                    
                    console.log("Updated unavailable dates:", mergedDates);
    
                    await updateUnavailability({ id: selectedItem.itemId, dates: mergedDates });
    
                    const receiverUser = await findUserById({ id: selectedItem.senderId });
                    console.log("RECEIVER USER: ", receiverUser.user_metadata);
    
                    const updatedCoins = receiverUser.user_metadata.coins - 1;
                    const updatedLitres = receiverUser.user_metadata.totalLitres + categoryData.litres;
                    const updatedWeight = receiverUser.user_metadata.totalWeight + parseFloat(itemInfo.weight);
                    const updatedSwapped = receiverUser.user_metadata.itemsSwapped + 1;
    
                    let updatedCarbon;
                    if (categoryData.scalable) {
                        updatedCarbon = itemInfo.weight * categoryData.carbon;
                    } else {
                        updatedCarbon = categoryData.carbon;
                    }
    
                    console.log("Impact data:", updatedCarbon, updatedLitres, updatedWeight, updatedSwapped);
    
                    await updateUserImpactData({
                        id: selectedItem.senderId,
                        newCoins: updatedCoins,
                        totalLitres: updatedLitres,
                        totalCarbon: updatedCarbon,
                        totalWeight: updatedWeight,
                        itemsSwapped: updatedSwapped,
                    });
    
                } else if (decision === "reject") {
                    console.log("SELECTED ITEM ID: ", selectedItem);
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
                    console.log("Rendering item:", item);
                    return (
                    item.text ? (
                        <View style={item.senderId === user.id
                            ? styles.textContainer 
                            : styles.receiverTextContainer 
                        }>
                            <Text style={styles.text}>{item.text}</Text>
                        </View>
                    ) : (
                        <>
                        {item.senderId != user.id && !item.decision && 
                                ( <DecisionMakingWidget 
                                    accept={()=> { 
                                        setDecision("accept");  
                                        setSelectedItem(item);} 
                                    }
                                    reject={() => {
                                        setDecision("reject");
                                        setSelectedItem(item);}
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

                             <View style={item.senderId === user.id
                                ? styles.imageContainer 
                                : styles.receiverImageContainer 
                            }>
                                <View style={styles.rowContainer}>
                                <ChatItemWidget itemId={item.itemId} currentUser={user}/>
                                {item.loanDates && 
                                    (  
                                        <View style={styles.calenderContainer}>
                                      
                                       {!decision || !item.decision &&  <CalendarIcon calendarDates={item.loanDates} itemId={item.itemId} owner={false}/> }
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
                <MainButton 
                    title="SEND"
                    onPress={handleText}
                    style={styles.buttonContainer}
                    textStyle={styles.buttonText} 
                    variant="primary"  
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
        minHeight: 40, 
        maxHeight: 120,
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
    }
})