import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useUser } from '../components/authentication/useUser';
import { getGroupDetails } from '../services/groupService';

export default function GroupDetailsScreen({ route, navigation }) {
  const { groupId } = route.params || { groupId: 1 }; 
  const { user } = useUser();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await getGroupDetails(groupId);
        setGroup(details);
      } catch (error) {
        console.error('Error fetching group details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [groupId]);

  if (loading) return <Text>Loading group details...</Text>;
  if (!group) return <Text>Group not found.</Text>;

  const isAdmin = user && user.id === group.adminId;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{group.name}</Text>
      <Text style={styles.description}>{group.description}</Text>
      <Text style={styles.info}>Members: {group.membersCount}</Text>
      <Text style={styles.info}>Rules: {group.rules}</Text>

      {isAdmin && (
        <Button 
          title="Manage Group" 
          onPress={() => navigation.navigate('AdminPage', { groupId: groupId })}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
    backgroundColor:'white'
  },
  title:{
    fontSize:24,
    fontWeight:'bold',
    marginBottom:10
  },
  description:{
    fontSize:16,
    marginBottom:10
  },
  info:{
    fontSize:14,
    marginBottom:10
  }
});
