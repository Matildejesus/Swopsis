import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import ProfileItem from "./ProfileItem";
import { useNavigation } from "@react-navigation/native";
import AddIcon from "./icons/AddIcon";
import Svg, { Circle, Path } from "react-native-svg";
import Colors from "../constants/colors";

function ProfileItemWidget({ items }) {
    const navigation = useNavigation();
    const dataWithAdd = [{ id: "add"}, ...(items || [])];
    
    return (
        <View style={styles.container}>
            <FlatList
                data={dataWithAdd}
                numColumns={3}
                renderItem={({ item }) => (
                    item.id === "add" ? (
                        <TouchableOpacity
                            style={styles.itemContainer}
                            onPress={() => navigation.navigate("CreateItem")}
                            activeOpacity={0.8}
                        >
                            <Svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="100"
                                height="100"
                                viewBox="0 0 50 50"
                                fill="none"
                            >
                                <Path
                                    d="M22.5 12V22.5H12V29.5H22.5V40H29.5V29.5H40V22.5H29.5V12H22.5Z"
                                    fill={Colors.primary1}
                                />
                            </Svg>
                        </TouchableOpacity>

                    ): (
                        <ProfileItem
                            style={styles.itemContainer}
                            source={item.image}
                            itemID={item.id}
                            itemData={item}
                        />
                    )
                )}
                keyExtractor={(item) => String(item.id)}
                showsVerticalScrollIndicator={false}
                bounce={false}
            />
        </View>
    );
}

export default ProfileItemWidget;

const styles = StyleSheet.create({
    itemContainer: {
        // flex: 1,
        width: 95,
        height: 96,
        backgroundColor: "white",
        marginLeft: 25,
        marginTop: 21,
        marginRight: 2,
        // margin: 8,
        alignSelf: "center",
        backgroundColor: "#FFFFFF",
        marginHorizontal: -15,
        borderRadius: 10,
        shadowColor: "#00000040",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
    },
    container: {
        height: "65%",
    },
});
