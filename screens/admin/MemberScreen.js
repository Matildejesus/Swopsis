import { Text, View, StyleSheet, FlatList } from "react-native";
import SideBarNav from "../../components/SideBarNav";
import RectangleButton from "../../components/RectangleButton";
import MemberIcon from "../../components/icons/adminicons/MemberIcon";
import { useNavigation, useRoute } from "@react-navigation/native";
import MemberWidget from "../../components/MemberWidget";
import { useAllMembers } from "../../hooks/useAllMembers";
import { useEffect, useState } from "react";
import { findUserById } from "../../services/apiAdmin";

function MemberScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { dataList = null, dataCount = null, requests = null} = route?.params || {};
    const { members } = useAllMembers();
    const [allUsers, setAllUsers] = useState([]);
   
    useEffect(() => {
        const loadData = async () => {
        let users = [...members];
        
            if (requests) {
                for (const request of requests) {
                    try {
                        const user = await findUserById({id: request.userId}); // Pass just the ID string
                        if (user) {
                            users.unshift({ ...user, request}); // Add to beginning
                        }
                    } catch (error) {
                        console.error(`Failed to fetch user ${request.userId}:`, error);
                    }
                }
                setAllUsers(users);
            } else if (dataList) {
                setAllUsers(dataList);
            } else {
                setAllUsers(members);
            }
        
        };
        loadData();
    }, [members, requests]);

    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                <SideBarNav navigation={navigation} />
            </View>
            <View style={styles.middle}>
                <FlatList 
                    data={allUsers}
                    renderItem={({item}) => <MemberWidget user={item} requests={item.request}/>} // and then after that for the reuqests part now the user wich is requesting is in the datalist irght, so then i want to send the request which is in the datalist
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
