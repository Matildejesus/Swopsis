import { useEffect, useState } from "react";
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
                setLoading(true);
                const fetchedGroups = await getGroups();
                setGroups(fetchedGroups);

                const locations = await Promise.all(
                    fetchedGroups
                    .filter(group => group.status == "approve")
                    .map(async (group) => {
                        const groupLocation = group.location.split(', ').pop();
                        const response = await fetch(
                            `https://geocode.search.hereapi.com/v1/geocode?q=${groupLocation}, Victoria, Australia&apiKey=${apikey}`
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
                        } 
                        return null;
                    }),
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
                // console.log("GROUPED BY POSTCODE: ", groupedByPostcode);
                setGroupLocations(groupedByPostcode);
            } catch (error) {
                console.error("Error fetching groups or geocoding: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, [apikey]);

    useEffect(() => {
        if (!postcode) return;
        const fetchGeocode = async () => {
            try {
                console.log("postcode: ", postcode);
                const response = await fetch(
                    `https://geocode.search.hereapi.com/v1/geocode?q=$Australia+Victoria+${postcode}&apiKey=${apikey}`,
                );
                const data = await response.json();
                if (data.items && data.items.length > 0) {
                    const position = data.items[0].position;
                    setRegion({
                        latitude: position.lat,
                        longitude: position.lng,
                        latitudeDelta: 0.03,
                        longitudeDelta: 0.005, 
                    });
                }
            } catch (error) {
                console.error("Error fetching geocode data:", error);
            }
        };

        fetchGeocode();

    }, [ postcode]);

    useEffect(() => {
        if (region) {
            console.log("Region updated:", region); 
        }
    }, [region]);

    const handlePress = (group) => {
        navigation.navigate("GroupDetails", { group });
    };

    const onRegionChangeComplete = (newRegion) => {
        setRegion(newRegion);
    };

    return (
        <View style={styles.container}>
            {region && !loading && (
                <MapView
                    style={styles.map}
                    initialRegion={region} 
                    region={region}
                    onRegionChangeComplete={onRegionChangeComplete}
                    showsUserLocation={true} 
                >
                    {Object.entries(groupLocations).map(([postcode, groups]) => {
                        console.log("Rendering marker for postcode:", postcode, groups);
                        return (<Marker
                            key={postcode}
                            coordinate={{
                                latitude: groups[0].latitude,
                                longitude: groups[0].longitude,
                            }}
                        >
                            <PinIcon />
                            <Callout
                                tooltip={true}
                                onPress={(e) => {
                                    const y = e.nativeEvent.point.y;
                                    const rowHeight = 40; 
                                    const tappedIndex = Math.floor(y / rowHeight);
                                    if (groups[tappedIndex]) {
                                        handlePress(groups[tappedIndex]);
                                    }
                                }}
                                >
                                <View style={styles.calloutContainer}>
                                    {groups.map((group) => (
                                    <View key={group.id} style={styles.bubble}>
                                        <Text style={styles.calloutTitle}>{group.name}</Text>
                                        <View style={styles.arrowContainer}>
                                            <ArrowNext />
                                        </View>
                                    </View>
                                    ))}
                                </View>
                            </Callout>
                        </Marker>)
})}
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
