import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ViewIcon from "../icons/ViewIcon";
import TrashIcon from "../icons/TrashIcon";
import Colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { useAllMembers } from "../../hooks/useAllMembers";

function ItemWidget({ item }) {
   
    const navigation = useNavigation();
    const { members, isLoading } = useAllMembers();

    return(
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: item.image }}
            />
            <View style={styles.textContainer}>
                <Text style={[styles.name, {fontFamily: "RalewayBold"}]}>{item.title}</Text>
                <Text style={styles.middleText}>{item.category}</Text>
                {/* <Text style={styles.middleText}>{formattedDate}</Text> */}
            </View>
            <View style={styles.icons}>
                <ViewIcon onPress={() => navigation.navigate("ProfileItem", { itemData:item, isOwner: false, itemOwner: item.userName })}/>
                <TrashIcon width="18" height="20"/>
            </View>
        </View>
    )
}

export default ItemWidget;

const styles = StyleSheet.create({
    container: {
        width: 284,
        height: 74,
        backgroundColor: "#FFFFFF",
        //marginTop: 43,
        marginBottom: 16,
        marginLeft: 47,
        marginRight: 44.5,
        borderRadius: 10,
        shadowColor: "#00000040",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
        flexDirection: "row",
    },
    textContainer: {
        flexDirection: "column",
        width: 140,
        gap: 3,
    },
    image: {
        width: 60,
        height: 60,
        backgroundColor: Colors.impact,
        borderRadius: 21,
        marginRight: 10,
        alignSelf: "center",
    },
    icons: {
        alignSelf: "center",
        flex: 1,
        flexDirection: "row",
        gap: 20,
    },
    name: {
        fontFamily: "RalewayBold",
        fontSize: 15,
        color: Colors.primary1,
    },
    middleText: {
        fontFamily: "RalewayMedium",
        fontSize: 13,
        color: Colors.primary1,
    },
    year: {
        fontFamily: "RalewayLight",
        fontSize: 12,
        color: Colors.primary1,
    },
});
