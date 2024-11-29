import React, { useEffect, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Button, Text } from 'react-native';
import supabase from '../services/supabase'; 

const MapComponent = ({ userId }) => {
  const [region, setRegion] = useState({
    latitude: -37.8136,  // Default to Melbourne
    longitude: 144.9631,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const { data, error } = await supabase.from('groups').select('*');
      if (error) {
        console.error('Error fetching groups:', error.message);
      } else {
        setGroups(data);
      }
    };
    fetchGroups();
  }, []);

  const handleJoinGroup = async (groupId) => {
    const { error } = await supabase.from('group_memberships').insert([
      { user_id: userId, group_id: groupId, role: 'Member' }
    ]);

    if (error) {
      alert('Error joining group: ' + error.message);
    } else {
      alert('Successfully joined the group!');
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        {groups.map((group, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: group.latitude,
              longitude: group.longitude,
            }}
            title={group.name}
            description={group.description}
          >
            <Callout>
              <View>
                <Text>{group.name}</Text>
                <Text>{group.description}</Text>
                <Button title="Join Group" onPress={() => handleJoinGroup(group.id)} />
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default MapComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
