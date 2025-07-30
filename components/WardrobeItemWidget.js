import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Colors from "../constants/colors";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../hooks/auth/useUser";
import HeartSwitch from "./HeartSwitch";
import ContactIcon from "./icons/ContactIcon";

function WardrobeitemWidget({ item }) {
    const [user, setUser] = useState();
    const navigation = useNavigation();
    const [ owner, setOwner ] = useState(false);
    const [ date, setDate ] = useState();

    console.log("ITEM: ", item.available);
    return (
        <>
         {item.available && (
            <View style={styles.itemContainer}>
                <View style={styles.row3}>
                    <Image style={styles.avatar} source={{uri: item.avatar}} />
                    <View style={styles.column}>
                        <Text style={styles.userName}>
                            {item.userName}
                        </Text>
                        <Text style={styles.date}>{date}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("ProfileItem", {
                            itemData: item
                        })
                    }
                >
                    <View style={styles.view}>
                        <Image
                            style={styles.itemImage}
                            source={{ uri: item.image }}
                        />
                    </View>
                </TouchableOpacity>
                <Text style={[styles.userName, { paddingLeft: 15 }]}>
                    {item.title}
                </Text>
                <View style={styles.iconContainer}>
                  <HeartSwitch isWishListItem={item.wishlist} />
                    <ContactIcon width={26} height={26} />
                </View>
            </View>
         )}
        </>
    );
}

export default WardrobeitemWidget;

const styles = StyleSheet.create({
    itemContainer: {
        width: 149,
        height: 300,
        backgroundColor: "white",
        borderColor: Colors.primary2,
        borderRadius: 15,
        borderWidth: 1,
        paddingVertical: 9,
        marginTop: 20,
        marginLeft: 20,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
        backgroundColor: Colors.secondary2,
        marginLeft: 5,
    },
    userName: {
        color: Colors.primary2,
        fontSize: 15,
        fontFamily: "Raleway_700Bold",
    },
    date: {
        color: Colors.primary2,
        fontSize: 12,
        fontFamily: "Raleway_500Medium",
        width: 90,
    },
    row3: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 15,
    },
    itemImage: {
        width: 147,
        height: 160,
        marginBottom: 10,
    },
    iconContainer: {
        flexDirection: "row",
        alignSelf: "center",
        paddingTop: 5,
        gap: 20,
    },
    column: {
        marginTop: 3,
    },
    view: {
        borderRadius: 4,
        borderColor: "black",
    },
});
