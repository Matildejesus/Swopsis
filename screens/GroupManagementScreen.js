import React, { useState } from 'react';
import { createGroup } from '../services/groupService';  // Adjust the import path as needed
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Colors from '../constants/colors';  
import { useFonts } from 'expo-font';

const GroupManagementScreen = ({ navigation, userId }) => {
  const [groupDetails, setGroupDetails] = useState({
    name: '',
    description: '',
    rules: '',
    location: '',
    num_of_members: 1,
    owner: '',
    owner: userId,  
  });

  const [loading, setLoading] = useState(false);
  
  const handleChange = (name, value) => {
    setGroupDetails(prev => ({ ...prev, [name]: value }));
    setGroupDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!groupDetails.name.trim() || !groupDetails.description.trim()) {
      Alert.alert('Input Error', 'Please fill in all required fields (Name and Description).');
      return;
    }
    setLoading(true);
    const { data, error } = await createGroup(groupDetails, userId);
    setLoading(false);
    if (error) {
      alert('Error creating group: ' + error.message);
      Alert.alert('Error', error.message);
    } else {
      alert('Group created successfully');
      navigation.navigate('GroupDetails', { groupId: data[0].id });
      Alert.alert('Success', 'Group created successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('GroupDetails', { groupId: data[0].id }) },
      ]);
    }
  };
  

  return (
     <>
     <View> 
      <Text>Name:</Text>
      <TextInput onChangeText={(value) => handleChange('name', value)} />
      <Text>Description:</Text>
      <TextInput onChangeText={(value) => handleChange('description', value)} />
      <Text>Rules:</Text>
      <TextInput onChangeText={(value) => handleChange('rules', value)} />
      <Text>Location:</Text>
      <TextInput onChangeText={(value) => handleChange('location', value)} />
      <Text>Owner: </Text>
      <TextInput onChangeText={(value) => handleChange('owner', value)} />
      <Button title="Create Group" onPress={handleSubmit} />
    </View>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create a New Group</Text>
      <Text style={styles.label}>Group Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter group name"
        value={groupDetails.name}
        onChangeText={(value) => handleChange('name', value)}
        placeholderTextColor={Colors.secondary}
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter group description"
        value={groupDetails.description}
        onChangeText={(value) => handleChange('description', value)}
        placeholderTextColor={Colors.secondary}
      />
      <Text style={styles.label}>Rules:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter group rules"
        value={groupDetails.rules}
        onChangeText={(value) => handleChange('rules', value)}
        placeholderTextColor={Colors.secondary}
      />
      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter group location"
        value={groupDetails.location}
        onChangeText={(value) => handleChange('location', value)}
        placeholderTextColor={Colors.secondary}
      />
      <View style={styles.buttonContainer}>
        <Button
          title={loading ? 'Creating...' : 'Create Group'}
          color={Colors.primary1}
          onPress={handleSubmit}
          disabled={loading}
        />
      </View>
    </ScrollView>
    </>
  );
};

export default GroupManagementScreen;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    fontFamily: 'RalewayBold',
    color: Colors.primary1,
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'RalewayRegular',
    color: Colors.primary1,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: Colors.primary1,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontFamily: 'RalewayRegular',
    color: Colors.text,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

