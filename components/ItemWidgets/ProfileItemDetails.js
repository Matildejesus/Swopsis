import { View, Text, Image, StyleSheet } from "react-native";
import HeartIcon from "../icons/HeartIcon";
import { Divider } from "@rneui/themed";
import { useUser } from "../authentication/useUser";
import Colors from "../../constants/colors";
import PinkNextArrow from "../icons/PinkNextArrow";
import HeartSwitch from "../HeartSwitch";

function ProfileItemDetails( {itemID} ) {
    const { user } = useUser();
    const { userName, avatar } = user.user_metadata;
    const email = user.email; 

    return (
    <View style={styles.container}>
        <View>
            <Image source={require("../../assets/images/jacket.png")} resizeMode="contain" />
        </View>
        <View style={styles.header}>
            <Text style={styles.itemName}>
                {"Hooded Jacket"}
            </Text>
            <HeartSwitch/>
        </View>
        <Divider style={{ height: 4, backgroundColor: "#efeeee", width: "80%"}} />
        <View style={styles.row3}>
            <Image style={styles.avatar} source={avatar ? { uri: avatar } : null} />
            <View style={styles.column}>
                <Text style={styles.userName}>
                    {userName}
                </Text>
                <Text style={styles.userEmail}>
                    {email}
                </Text>
            </View>
            <Text style={styles.text4}>
                {"Just now"}
            </Text>
        </View>
        <View style={styles.row4}>
            <Text style={styles.description}>
                {"Description"}
            </Text>
            <PinkNextArrow />
        </View>
        <Text style={styles.text6}>
            {"Lorem ipsum dolor sit amet consectetur."}
        </Text>
    </View>
    );
}

export default ProfileItemDetails;

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
      },
    avatar: {
        width: 40,
        height: 40,
        backgroundColor: "#85E0A3",
        borderRadius: 30,
        marginRight: 8,
    },
    column: {
        flex: 1,
        marginTop: 6,
        marginRight: 4,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "120",
        marginBottom: 19,
        marginHorizontal: 33,
    },
    row3: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 15,
        marginHorizontal: 24,
        marginTop: 15,
    },
    row4: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 185,
        marginBottom: 16,
        marginHorizontal: 41,
    },
    itemName: {
        color: Colors.primary2,
        fontFamily: "RalewayBold",
        fontSize: 20,
        fontWeight: 700,
    },
    userName: {
        color: Colors.primary2,
        fontFamily: "RalewayBold",
        fontSize: 15,
        fontWeight: 700,
        // height: 34,
      },
    userEmail: {
        color: Colors.primary2,
        fontFamily: "RalewayMedium",
        fontSize: 12,
        fontWeight: 500,
        marginBottom: 11,
      },
    text4: {
        color: "#004A0E",
        fontSize: 12,
        marginTop: 7,
    },
    description: {
        color: Colors.primary2,
        fontFamily: "RalewayBold",
        fontSize: 18,
    },
    text6: {
        color: "#004A0E",
        fontSize: 15,
        marginBottom: 45,
        marginHorizontal: 54,
        width: 267,
    },

});