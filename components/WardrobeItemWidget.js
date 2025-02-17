import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import Colors from "../constants/colors";
import HeartSwitch from "./HeartSwitch";
import ContactIcon from "./icons/ContactIcon";
import dateFormatting from "./dateFormatting";
import { useEffect, useState } from "react";
import { findUserById } from "../services/apiAdmin";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "./authentication/useUser";
import { getItemsInfo } from "../services/apiItems";

function WardrobeitemWidget({ item }) {
    console.log("ITEM", item);
    const [user, setUser] = useState();
    const { currentUser } = useUser();
    const navigation = useNavigation();
    const [owner, setOwner] = useState(false);
    const [itemData, setItemData] = useState([]);

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const user = await findUserById({ id: item.userId });
                const itemDetails = await getItemsInfo({
                    category: item.category,
                    itemId: item.id,
                });
                console.log(user);
                setUser(user);
                setItemData(itemDetails);
                if (currentUser.id === item.userId) {
                    setOwner(true);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchInfo();
    }, [item]); // Dependency array to re-run effect when `item` changes

    console.log(user);
    console.log("Created At:", item.created_at);
    const date = dateFormatting(item.created_at);

    return (
        user && (
            <View style={styles.itemContainer}>
                <View style={styles.row3}>
                    {/* <Image style={styles.avatar} source={avatar ? { uri: avatar } : null} /> */}
                    <Image style={styles.avatar} source={null} />
                    <View style={styles.column}>
                        <Text style={styles.userName}>
                            {user.user_metadata.userName}
                        </Text>
                        <Text style={styles.date}>{date}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("ProfileItem", {
                            itemData: item,
                            owner,
                            user,
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
                    <HeartSwitch />
                    <ContactIcon width={26} height={26} />
                </View>
            </View>
        )
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
        fontFamily: "RalewayBold",
    },
    date: {
        color: Colors.primary2,
        fontSize: 12,
        fontFamily: "RalewayMedium",
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
