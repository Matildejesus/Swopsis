import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

const MapComponent = ({ groups }) => {
  const [region, setRegion] = useState({
    latitude: -37.8136, // Default to Melbourne
    longitude: 144.9631,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const renderMarkers = () => {
    return groups.map((group, index) => (
      <Marker
        key={index}
        coordinate={{
          latitude: group.latitude,
          longitude: group.longitude,
        }}
        title={group.name}
        description={group.description}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        {renderMarkers()}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapComponent;
