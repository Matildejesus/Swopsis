import { useEffect } from "react";
import { getGroups } from "../../services/apiGroups";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GroupWidget from "../../components/adminWidget/GroupWidget";
import { FlatList } from "react-native";
import Colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

function GroupsListScreen({ route }) {
    const navigation = useNavigation();
    const allGroups = route.params.groups.filter(groups => groups.status == "approved");
    console.log("FINAL GROUPS: ", allGroups);
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("AmbassadorRequest")}>
                <Text style={styles.link}>
                    Be an Ambassador Instead
                </Text>
            </TouchableOpacity>
            <FlatList
                data={allGroups}
                renderItem={({ item }) => (
                    <GroupWidget group={item} screen="maps" />
                )}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                bounce={false}
            />
        </View>
    )
}

export default GroupsListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
    },
    link: {
        color: Colors.primary2,
        fontSize: 15,
        fontFamily: "Raleway_500Medium",
        // paddingBottom: 15,
        marginTop: 10,
        marginLeft: 20,
        width: 200,
        // height: 40,
        paddingLeft: 5,
        backgroundColor: Colors.impact
    },
})