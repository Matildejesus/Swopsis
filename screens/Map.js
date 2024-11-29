import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import supabase from '../services/supabase';

const Map = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const { data, error } = await supabase.from('Groups').select('*');
      if (error) {
        console.error('Error fetching groups:', error);
      } else {
        setGroups(data);
      }
    };

    fetchGroups();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{
        latitude: -37.8136, // Melbourne, Australia
        longitude: 144.9631,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      }}>
        {groups.map((group) => (
          <Marker
            key={group.id}
            coordinate={{
              latitude: parseFloat(group.latitude),
              longitude: parseFloat(group.longitude),
            }}
            title={group.name}
            description={group.description}
          />
        ))}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
