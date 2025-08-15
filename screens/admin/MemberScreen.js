import { Text, View, StyleSheet, FlatList } from "react-native";
import SideBarNav from "../../components/SideBarNav";
import RectangleButton from "../../components/RectangleButton";
import MemberIcon from "../../components/icons/adminicons/MemberIcon";
import { useNavigation, useRoute } from "@react-navigation/native";
import MemberWidget from "../../components/MemberWidget";
import { useAllMembers } from "../../hooks/useAllMembers";

function MemberScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { dataList = null, dataCount = null, requests = null} = route?.params || {};
    const { members} = useAllMembers();
    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                <SideBarNav navigation={navigation} />
            </View>
            <View style={styles.middle}>
                <FlatList 
                    data={dataList ? dataList: members}
                    renderItem={({item}) => <MemberWidget user={item} requests={requests}/>}
                    keyExtractor={item => item.id}
                />
            </View>
            <View style={styles.bottom}>
                <RectangleButton
                    icon={<MemberIcon />}
                    text="Members"
                    color="#31CE36"
                    number={dataCount ? dataCount : members.length}
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
