import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ViewIcon from "../icons/ViewIcon";
import TrashIcon from "../icons/TrashIcon";
import Colors from "../../constants/colors";
import { format } from "date-fns";
import MemberIcon from "../icons/MemberIcon";
import { useNavigation } from "@react-navigation/native";
import { useAllMembers } from "../../hooks/useAllMembers";

function GroupWidget({ group }) {
    // console.log("GROUP: ",group);
    const formattedDate = format(new Date(group.created_at), 'yyyy-MM-dd');
    // console.log(formattedDate);
    // console.log(group.status);
    console.log("GROUP WIDGET: ", group.status);
    const navigation = useNavigation();
    const { members, isLoading } = useAllMembers();

    const handleNavigate = () => {
        const membersList = members.filter(member => member.user_metadata.group === group.id);
        console.log("Members List: ", membersList);
        navigation.navigate("Members", { dataList: membersList, dataCount: membersList.length });
    };
    return(
        <>
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{ uri: group.avatar }}
                />
                <View style={styles.textContainer}>
                    <Text style={[styles.text, {fontFamily: "RalewayBold"}]}>{group.name}</Text>
                    <Text style={styles.text}>{group.numberOfMem}{" "}Members</Text>
                    <Text style={styles.text}>{formattedDate}</Text>
                </View>
                <View style={styles.iconContainers}>
                    <TouchableOpacity onPress={handleNavigate}>
                        <MemberIcon />
                    </TouchableOpacity>
                <ViewIcon onPress={() => navigation.navigate("GroupDetails", {group})} />
                    <TrashIcon width={24} height={24}/>
                </View>
            </View>
            {group.status === "pending" && (
                <Text style={styles.pendingBadge}>Pending</Text>
            )}
        </>
    )
}

export default GroupWidget;

const styles = StyleSheet.create({
    container: {
        width: 310,
        height: 70,
        backgroundColor: Colors.impact,
        marginTop: 16,
        marginLeft: 40,
        marginRight: 44.5,
        borderRadius: 10,
        shadowColor: "#00000040",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
    },
    image: {
        width: 60,
        height: 60,
        backgroundColor: Colors.impact,
        borderRadius: 30,
        marginRight: 20,
    },
    textContainer: {
        flex: 1,
    },
    text: {
        fontFamily: "RalewayMedium",
        color: Colors.primary1
    },
    navbar: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        paddingTop: 20,
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    iconContainers: {
        marginLeft: 20,
        alignContent: "flex-end",
        flexDirection: "row",
        gap: 10,
        
    },
    pendingBadge: {
        backgroundColor: Colors.popup,
        color: Colors.primary1,
        borderRadius: 5,
        fontSize: 12,
        width: 110,
        fontSize: 15,
        fontFamily: "RalewayBold",
        opacity: 0.8, 
        width: 284,
        marginLeft: 47,
        marginRight: 44.5,
        borderBottomLeftRadius: 10,
        borderBottomEndRadius: 10,
        shadowColor: "#00000040",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
        height: 40,
        paddingHorizontal: 112,
        paddingTop: 15,

    },
});
