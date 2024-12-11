import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View } from "react-native";
const Map = ({ apikey, postcode }) => {
  const [region, setRegion] = useState(null);
  useEffect(() => {
    const fetchGeocode = async () => {
      try {
        const response = await fetch(
          `https://geocode.search.hereapi.com/v1/geocode?q=Australia+Victoria+${postcode}&apiKey=${apikey}`
        );
        
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          const position = data.items[0].position;
          setRegion({
            latitude: position.lat,
            longitude: position.lng,
            latitudeDelta: 0.0922, // Adjust as needed
            longitudeDelta: 0.0421, // Adjust as needed
          });
          console.log('Geocode fetched:', position); // Debugging log
        }
      } catch (error) {
        console.error('Error fetching geocode data:', error);
      }
    };
    if (postcode) {
      fetchGeocode();
    }
  }, [apikey, postcode]);
  useEffect(() => {
    if (region) {
      console.log('Region updated:', region); // Debugging log
    }
  }, [region]);
  return (
    <View style={styles.container}>
      {region && (
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        />
      )}
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
