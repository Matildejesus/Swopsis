import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { createGroup } from '../services/groupService';
import Colors from '../constants/colors';  

const GroupManagementScreen = ({ navigation, userId }) => {
  const [groupDetails, setGroupDetails] = useState({
    name: '',
    description: '',
    rules: '',
    location: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
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
    } else {
      alert('Group created successfully');
      navigation.navigate('GroupDetails', { groupId: data[0].id });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create a New Group</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter group name"
        value={groupDetails.name}
        onChangeText={(value) => handleChange('name', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter group description"
        value={groupDetails.description}
        onChangeText={(value) => handleChange('description', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter group rules"
        value={groupDetails.rules}
        onChangeText={(value) => handleChange('rules', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter group location"
        value={groupDetails.location}
        onChangeText={(value) => handleChange('location', value)}
      />
      <Button 
        title={loading ? 'Creating...' : 'Create Group'} 
        color={Colors.primary1} 
        onPress={handleSubmit} 
        disabled={loading} 
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    color: Colors.primary1,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: Colors.primary1,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: Colors.text,
  },
});

export default GroupManagementScreen;
