import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { getFilteredGroupMember, getGroupMembers } from "../services/apiAdmin";
import { useUser } from "../components/authentication/useUser";
import { getGroupItems } from "../services/apiItems";
import Colors from "../constants/colors";
import WardrobeitemWidget from "../components/WardrobeItemWidget";

function WardrobeScreen() {
    const { user } = useUser();
    const [group, setGroup] = useState();
    const [groupItems, setGroupItems] = useState([]);

    //   const date = dateFormatting(itemData.created_at);

    useEffect(() => {
        if (user) {
            console.log("I AM LOGGING USER: ", user.user_metadata);
            setGroup(user.user_metadata.group);
            const fetchUsers = async () => {
                try {
                    const users = await getFilteredGroupMember({
                        groupId: user.user_metadata.group,
                    });
                    const userIds = users.map((user) => user.userId);
                    console.log(userIds);
                    const usersItems = await getGroupItems({ users: userIds });
                    console.log(usersItems);
                    setGroupItems(usersItems);
                } catch (error) {
                    console.error("Error fetching requests: ", error);
                }
            };
            fetchUsers();
        }
    }, [group]);

    return (
        <View style={styles.container}>
            <View style={styles.flatlistContainer}>
                <FlatList
                    data={groupItems}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <WardrobeitemWidget item={item} />
                    )}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    bounce={false}
                    columnWrapperStyle={{
                        justifyContent: "space-between",
                        marginBottom: 20,
                        gap: 20,
                    }}
                />
            </View>
        </View>
    );
}

export default WardrobeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        backgroundColor: "white",
        //gap: 10,
        // alignSelf: "center",
        padding: 20,
        alignItems: "center",
    },
});
