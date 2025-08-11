import { Text, View, Image, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import { useEffect, useState } from "react";
import RectangleButton from "../../components/RectangleButton";
import GroupIcon from "../../components/icons/adminicons/GroupIcon";
import MainButton from "../../components/MainButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getGroups } from "../../services/apiGroups";
import SideBarNav from "../../components/SideBarNav";
import GroupWidget from "../../components/adminWidget/GroupWidget";
import { FlatList } from "react-native-gesture-handler";
import { useAllGroups } from "../../hooks/useAllGroups";

function GroupsScreen() {
    const navigation = useNavigation();
    const { groups } = useAllGroups();

    function addSearch(newSearch) {
        setSearch(newSearch);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.navbar}>
                    <SideBarNav navigation={navigation} />
                </View>
                <MainButton
                    title="Create Group"
                    textStyle={styles.button}
                    style={styles.buttonSpot}
                    onPress={() => navigation.navigate("GroupCreate")}
                    variant="primary"
                />
            </View>
            <FlatList
                data={groups}
                renderItem={({ item }) => (
                    <GroupWidget group={item} />
                )}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                bounce={false}
            />
            <View style={styles.bottom}>
                <RectangleButton
                    icon={<GroupIcon />}
                    text="Groups"
                    color="#FFAD46"
                    number={groups.length}
                />
            </View>
        </View>
    );
}

export default GroupsScreen;

const styles = StyleSheet.create({
    image: {
        width: 60,
        height: 60,
        backgroundColor: Colors.impact,
    },
    container: {
        backgroundColor: "white",
        flex: 1,
        paddingTop: 40,
    },
    textContainer: {
        flexDirection: "column",
    },
    searchContainer: {
        borderWidth: 1,
        borderColor: Colors.primary2,
        width: 150,
        height: 35,
        marginRight: 50,
        alignSelf: "flex-end",
    },
    button: {
        fontSize: 17,
    },
    buttonSpot: {
        alignSelf: "flex-end",
        marginRight: 23,
        height: 45,
        padding: 12,
        // marginBottom: 40,
    },
    bottom: {
        alignItems: "flex-end",
        paddingBottom: 50,
        gap: 20,
        paddingRight: 20,
        paddingTop: 20,
    },
    navbar: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        paddingTop: 20,
        // alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginBottom: 20,
    },
});
