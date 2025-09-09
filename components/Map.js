import { useCallback, useEffect, useState } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { getGroups } from "../services/apiGroups";
import PinIcon from "../components/icons/PinIcon";
import Colors from "../constants/colors";
import ArrowNext from "../components/icons/ArrowNext";
import { useNavigation } from "@react-navigation/native";

const Map = ({ apikey, postcode, groups }) => {
    const [region, setRegion] = useState({
        latitude: -37.8136,
        longitude: 144.9631,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
    });
    const [allGroups, setAllGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [groupLocations, setGroupLocations] = useState({});

    const navigation = useNavigation();

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                setAllGroups(groups);

                const locations = await Promise.all(
                    groups
                        .filter(group => group.status == "approve")
                        .map(async (group) => {
                        const groupLocation = group.location.split(', ').pop();
                        const response = await fetch(
                            `https://maps.googleapis.com/maps/api/geocode/json?address=${groupLocation},Victoria,Australia&key=${apikey}`
                        );
                        const data = await response.json();
                        
                        if (data.results?.[0]?.geometry?.location) {
                            const lat = Number(data.results[0].geometry.location.lat);
                            const lng = Number(data.results[0].geometry.location.lng);
                            
                            // Validate coordinates
                            if (Math.abs(lat) <= 90 && Math.abs(lng) <= 180) {
                            return {
                                ...group,
                                latitude: lat,
                                longitude: lng
                            };
                            }
                        }
                        console.warn('Invalid coordinates for:', group.id, groupLocation);
                        return null;
                        })
                    );
                const groupedByPostcode = locations
                .filter(loc => loc !== null)
                .reduce((acc, group) => {
                    const postcode = group.location.split(',').pop().trim();
                    if (!acc[postcode]) {
                        acc[postcode] = [];
                    }
                    acc[postcode].push(group);
                    return acc;
                }, {});
                setGroupLocations(groupedByPostcode);
            } catch (error) {
                console.error("Error fetching groups or geocoding: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, [apikey, groups]);

    useEffect(() => {
        if (!postcode) return;

        const fetchGeocode = async () => {
            try {
                
                // PROPERLY formatted API request
                const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(postcode)},Australia&key=${apikey}`,
                    {
                        headers: {
                        'User-Agent': 'com.anonymous.swopsis' 
                        }
                    }
                );
                
                const data = await response.json();
                
                if (data.results && data.results.length > 0) {
                    const location = data.results[0].geometry.location;
                    setRegion({
                        latitude: location.lat,
                        longitude: location.lng,
                        latitudeDelta: 0.03,
                        longitudeDelta: 0.005,
                    });
                } else {
                    console.warn("No results found for postcode:", postcode);
                    // Keep existing region
                }
            } catch (error) {
                console.error("Geocoding failed:", error);
            }
        };

        fetchGeocode();
    }, [postcode, apikey]);

    useEffect(() => {
        if (region) {
        }
    }, [region]);

    const handlePress = useCallback((group) => {
        navigation.navigate("GroupDetails", { group });
    }, [navigation]);

    const onRegionChangeComplete = useCallback((newRegion) => {
        if (!sameRegion(region, newRegion)) {
            setRegion(newRegion);
        }
    }, [region]);

    const almostEqual = (a, b, eps = 0.0001) => Math.abs(a - b) < eps;
    const sameRegion = (r1, r2) => (
        r1 && r2 &&
        almostEqual(r1.latitude, r2.latitude) &&
        almostEqual(r1.longitude, r2.longitude) &&
        almostEqual(r1.latitudeDelta, r2.latitudeDelta) &&
        almostEqual(r1.longitudeDelta, r2.longitudeDelta)
    );

    return (
        <View style={styles.container}>
            {region && !loading && (
                <MapView
                    style={styles.map}
                    initialRegion={region} 
                    region={region}
                    showsUserLocation={true} 
                >
                    {/* <Marker
                        coordinate={{ latitude: -37.8136, longitude: 144.9631 }}
                        title="TEST MARKER"
                    /> */}

                    {Object.entries(groupLocations).map(([postcode, allGroups]) => (
                        allGroups
                        .filter(group => group.latitude && group.longitude)
                        .map((group) => (
                            <Marker
                            key={`${postcode}-${group.id}`}
                            coordinate={{
                                latitude: group.latitude,
                                longitude: group.longitude // Remove offset
                            }}
                            onPress={() => handlePress(group)}
                            >
                            <View style={styles.bubble}>
                                <Text style={styles.calloutTitle}>{group.name}</Text>
                                <ArrowNext style={styles.arrow} />
                            </View>
                            </Marker>
                        ))
                    ))}
                </MapView>
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
    bubble: {
        backgroundColor: Colors.primary1,
        borderRadius: 20,
        flexDirection: "row",
        height: 40,
        alignItems: "center",
        paddingHorizontal: 5,
        
        // gap: 7,
    },
    calloutTitle: {
        fontSize: 14,
        fontFamily: "Raleway_400Regular",
        color: "white",
        textTransform: "uppercase",
        width: 140,
        marginLeft: 10,
    },
    arrowContainer: {
        width: 34,
        height: 34,
        borderRadius: 17, // Half the width/height for a perfect circle
        backgroundColor: "#A74F77",
        alignItems: "center",
        justifyContent: "center",
    },
    arrow: {
        color: Colors.primary1, // Arrow color matches primary theme
    },
    calloutContainer: {
        flexDirection: "column",
        // alignItems: "center",
        gap: 7,
    },
    groupItem: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});