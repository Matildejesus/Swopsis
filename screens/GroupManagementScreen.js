import React, { useState } from 'react';
import { View, Button, TextInput, Text } from 'react-native';
import { createGroup } from '../services/groupService';  // Adjust the import path as needed
const GroupManagementScreen = ({ navigation, userId }) => {
  const [groupDetails, setGroupDetails] = useState({
    name: '',
    description: '',
    rules: '',
    location: '',
    num_of_members: 1,
    owner: '',
  });
  const handleChange = (name, value) => {
    setGroupDetails(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async () => {
    const { data, error } = await createGroup(groupDetails, userId);
    if (error) {
      alert('Error creating group: ' + error.message);
    } else {
      alert('Group created successfully');
      navigation.navigate('GroupDetails', { groupId: data[0].id });
    }
  };
  
  return (
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
  );
};
export default GroupManagementScreen;
