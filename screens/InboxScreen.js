import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  TextInput, 
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from 'react-native';
import Colors from '../constants/colors';
import { useUser } from '../components/authentication/useUser';

// Dummy data
const mockThreads = [
  { id: 'u1', name: 'User1' },
  { id: 'u2', name: 'User2' },
  { id: 'u3', name: 'User3' },
];

// Mock messages
const mockMessages = {
  'u1': [
    { id: 'm1', senderId: 'u1', text: 'Hi there!' },
    { id: 'm2', senderId: 'currentUser', text: 'Hey, how are you?' }
  ],
  'u2': [
    { id: 'm3', senderId: 'u2', text: 'Got that jacket for swap?' }
  ],
  'u3': [
    { id: 'm4', senderId: 'u3', text: 'Any dresses to borrow?' }
  ]
};

export default function InboxScreen() {
  const { user } = useUser(); // Current user info
  const currentUserId = user ? user.id : 'currentUser'; // Fallback if no user data
  const [selectedThread, setSelectedThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (selectedThread) {
      // Load messages for the selected thread
      setMessages(mockMessages[selectedThread.id] || []);
    }
  }, [selectedThread]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const newMsgObj = {
      id: 'm' + Date.now(),
      senderId: currentUserId,
      text: newMessage.trim(),
    };
    setMessages((prev) => [...prev, newMsgObj]);
    setNewMessage('');
    
    // In a real app:
    // Send this message to the server, which updates the thread for both parties.
  };

  const renderThreadItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.threadItem, 
        selectedThread && selectedThread.id === item.id && styles.selectedThread
      ]}
      onPress={() => setSelectedThread(item)}
    >
      <Text style={styles.threadName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderMessageItem = ({ item }) => {
    const isMe = item.senderId === currentUserId;
    return (
      <View style={[styles.messageItem, isMe ? styles.myMessage : styles.theirMessage]}>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Inbox</Text>
      <View style={styles.threadsContainer}>
        <FlatList
          data={mockThreads}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={renderThreadItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {selectedThread ? (
        <>
          <View style={styles.selectedThreadHeader}>
            <Text style={styles.selectedThreadTitle}>Chat with {selectedThread.name}</Text>
          </View>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessageItem}
            style={styles.messagesList}
            inverted
            // `inverted` so newest messages appear at the bottom
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
          />

          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={80}
            style={styles.inputContainer}
          >
            <TextInput 
              style={styles.input}
              placeholder="Type a message..."
              value={newMessage}
              onChangeText={setNewMessage}
            />
            <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </>
      ) : (
        <View style={styles.noThreadSelected}>
          <Text>Select a conversation to start chatting.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'white'
  },
  title: {
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    marginVertical:10,
    color: Colors.primary1
  },
  threadsContainer:{
    borderBottomWidth:1,
    borderColor:'#ccc',
    paddingVertical:10,
    paddingHorizontal:5
  },
  threadItem:{
    backgroundColor:'#f2f2f2',
    borderRadius:15,
    padding:10,
    marginHorizontal:5
  },
  selectedThread:{
    backgroundColor: Colors.primary1
  },
  threadName:{
    fontWeight:'bold',
    color:'black'
  },
  selectedThreadHeader:{
    borderBottomWidth:1,
    borderColor:'#ccc',
    padding:10
  },
  selectedThreadTitle:{
    fontSize:16,
    fontWeight:'bold',
    color: Colors.primary1
  },
  messagesList:{
    flex:1,
    padding:10
  },
  messageItem:{
    maxWidth:'70%',
    padding:10,
    borderRadius:10,
    marginVertical:5
  },
  myMessage:{
    backgroundColor: Colors.primary1,
    alignSelf:'flex-end'
  },
  theirMessage:{
    backgroundColor:'#eee',
    alignSelf:'flex-start'
  },
  messageText:{
    color:'black'
  },
  inputContainer:{
    flexDirection:'row',
    alignItems:'center',
    padding:10,
    borderTopWidth:1,
    borderColor:'#ccc'
  },
  input:{
    flex:1,
    backgroundColor:'#f2f2f2',
    borderRadius:20,
    paddingHorizontal:15,
    marginRight:10
  },
  sendButton:{
    backgroundColor: Colors.primary1,
    paddingHorizontal:20,
    paddingVertical:10,
    borderRadius:20
  },
  sendButtonText:{
    color:'white',
    fontWeight:'bold'
  },
  noThreadSelected:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});
