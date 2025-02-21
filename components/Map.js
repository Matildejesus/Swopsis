import React, { useEffect, useState } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { getGroups } from "../services/apiGroups";
import PinIcon from "../components/icons/PinIcon";
import Colors from "../constants/colors";
import ArrowNext from "../components/icons/ArrowNext";
import { useNavigation } from "@react-navigation/native";

const Map = ({ apikey, postcode }) => {
    const [region, setRegion] = useState(null);
    const [groups, setGroups] = useState();
    const [loading, setLoading] = useState();
    const [groupLocations, setGroupLocations] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const fetchedGroups = await getGroups();
                setGroups(fetchedGroups);

                // Geocode group locations
                const locations = await Promise.all(
                    fetchedGroups.map(async (group) => {
                        const response = await fetch(
                            `https://geocode.search.hereapi.com/v1/geocode?q=${group.location}&apiKey=${apikey}`,
                        );
                        const data = await response.json();
                        if (data.items && data.items.length > 0) {
                            const position = data.items[0].position;
                            return {
                                id: group.id,
                                name: group.name,
                                description: group.description,
                                latitude: position.lat,
                                longitude: position.lng,
                                rules: group.rules,
                                numberOfMem: group.numberOfMem,
                                avatar: group.avatar,
                                ambassadorId: group.ambassadorId,
                                location: group.location,
                            };
                        } else {
                            console.error(
                                `No geocode results for location: ${group.location}`,
                            );
                            return null;
                        }
                    }),
                );
                setGroupLocations(locations.filter((loc) => loc !== null)); // Remove nulls
            } catch (error) {
                console.error("Error fetching groups or geocoding: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();

        const fetchGeocode = async () => {
            try {
                const response = await fetch(
                    `https://geocode.search.hereapi.com/v1/geocode?q=$Australia+Victoria+${postcode}&apiKey=${apikey}`,
                );
                const data = await response.json();
                if (data.items && data.items.length > 0) {
                    const position = data.items[0].position;
                    setRegion({
                        latitude: position.lat,
                        longitude: position.lng,
                        latitudeDelta: 0.03, // Adjust as needed
                        longitudeDelta: 0.005, // Adjust as needed
                    });
                    console.log("Geocode fetched:", position); // Debugging log
                }
            } catch (error) {
                console.error("Error fetching geocode data:", error);
            }
        };

        if (postcode) {
            fetchGeocode();
        }
    }, [apikey, postcode]);

    useEffect(() => {
        if (region) {
            console.log("Region updated:", region); // Debugging log
        }
    }, [region]);

    const handlePress = (group) => {
        navigation.navigate("GroupDetails", { group });
    };

    return (
        <View style={styles.container}>
            {region && (
                <MapView
                    style={styles.map}
                    region={region}
                    onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
                >
                    {/* Render markers for group locations */}
                    {groupLocations.map((group) => (
                        <Marker
                            key={group.id}
                            coordinate={{
                                latitude: group.latitude,
                                longitude: group.longitude,
                            }}
                        >
                            <PinIcon />
                            <Callout
                                tooltip
                                style={styles.bubble}
                                onPress={() => handlePress(group)}
                            >
                                <View style={styles.calloutContainer}>
                                    <Text style={styles.calloutTitle}>
                                        {group.name}
                                    </Text>
                                    <View style={styles.arrowContainer}>
                                        <ArrowNext />
                                    </View>
                                </View>
                            </Callout>
                        </Marker>
                        // icon={<PinIcon />}
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
        gap: 10,
    },
    calloutTitle: {
        fontSize: 14,
        fontFamily: "RalewayRegular",
        color: "white",
        textTransform: "uppercase",
        width: 133,
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
        flexDirection: "row",
        // justifyContent: "center"
        alignItems: "center",
    },
});
