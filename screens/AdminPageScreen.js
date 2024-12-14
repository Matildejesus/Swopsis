import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { getGroupMembers, removeMemberFromGroup } from '../services/groupService';

export default function AdminPageScreen({ route }) {
  const { groupId } = route.params;
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const data = await getGroupMembers(groupId);
      setMembers(data);
    };
    fetchMembers();
  }, [groupId]);

  const handleRemoveMember = async (memberId) => {
    try {
      await removeMemberFromGroup(groupId, memberId);
      Alert.alert('Success', 'Member removed.');
      setMembers(m => m.filter(mem => mem.id !== memberId));
    } catch (error) {
      Alert.alert('Error', 'Failed to remove member.');
    }
  };

  const renderMember = ({ item }) => (
    <View style={styles.memberItem}>
      <Text>{item.username} ({item.role})</Text>
      {item.role !== 'admin' && (
        <Button title="Remove" onPress={() => handleRemoveMember(item.id)} />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Group Members</Text>
      <FlatList
        data={members}
        keyExtractor={(member) => member.id.toString()}
        renderItem={renderMember}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    backgroundColor:'white'
  },
  title:{
    fontSize:24,
    fontWeight:'bold',
    marginBottom:10
  },
  memberItem:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical:10,
    borderBottomWidth:1,
    borderColor:'#ccc'
  }
});
