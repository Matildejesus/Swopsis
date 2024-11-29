import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const AdminPageScreen = ({ groupId }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`/api/groups/${groupId}/users`);
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, [groupId]);

  const renderItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text>{item.username}</Text>
      <Text>{item.role}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Group Members</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default AdminPageScreen;
