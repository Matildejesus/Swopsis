import { Text, View, StyleSheet, FlatList } from "react-native";
import SideBarNav from "../../components/SideBarNav";
import RectangleButton from "../../components/RectangleButton";
import MemberIcon from "../../components/icons/adminicons/MemberIcon";
import CoinIcon from "../../components/icons/CoinIcon";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useUser } from "../../hooks/useUser";
import { getGroupMembers } from "../../services/apiAdmin";
import MemberWidget from "../../components/MemberWidget";

function MemberScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { membersList, membersCount, requests } = route?.params;
    //console.log("MEMBERSLIST: ", membersList.users);
    console.log("REQUESTS: ", membersList);

    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                <SideBarNav navigation={navigation} />
            </View>
            <View style={styles.middle}>
                {requests && (
                    <FlatList
                        data={requests}
                        renderItem={({ item }) => (
                            <MemberWidget requests={item} />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                )}
                {/* <Text>Help</Text>
                <FlatList 
                    data={membersList.users}
                    renderItem={({item}) => <MemberWidget user={item}/>}
                    keyExtractor={item => item.id}
                />
                <Text>Yay</Text> */}
            </View>
            <View style={styles.bottom}>
                <RectangleButton
                    icon={<MemberIcon />}
                    text="Members"
                    color="#31CE36"
                    number={membersCount}
                />
            </View>
        </View>
    );
}

export default MemberScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        paddingTop: 40,
    },
    navbar: {
        //  flex: 1,
        flexDirection: "row",
        paddingTop: 20,
        // alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginBottom: 42,
    },
    bottom: {
        alignItems: "flex-end",
        paddingBottom: 50,
        gap: 20,
        paddingRight: 20,
        paddingTop: 20,
    },
    middle: {
        // flex: 1,
        // alignContent: "flex-start",
        // alignItems: "flex-start",
        //   alignSelf: "flex-start",
        flex: 1,
        //  height: 500,
    },
});
