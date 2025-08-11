import { Text, View, StyleSheet, FlatList } from "react-native";
import SideBarNav from "../../components/SideBarNav";
import { useNavigation, useRoute } from "@react-navigation/native";
import Colors from "../../constants/colors";
import { useAllItems } from "../../hooks/useAllItems";
import ItemReviewWidget from "../../components/ItemWidgets/ItemReviewWidget";
import ItemWidget from "../../components/adminWidget/ItemWidget";

function ItemsScreen() {
    const route = useRoute();
    // const { items } = route.params;
    const navigation = useNavigation();
    const { items } = useAllItems();
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.navbar}>
                    <SideBarNav navigation={navigation} />
                </View>
            </View>
            <FlatList
                 data={items}
                 renderItem={({ item }) => (
                     <ItemWidget item={item} />
                 )}
                 keyExtractor={(item) => item.id}
                 showsVerticalScrollIndicator={false}
                 bounce={false}
             />
{/* 
        //<View style={styles.container}>
        //     <View style={styles.header}>
                 <View style={styles.navbar}>
                    <SideBarNav navigation={navigation} />
                 </View>
        //         <MainButton
        //             title="Create Group"
        //             textStyle={styles.button}
        //             style={styles.buttonSpot}
        //             onPress={() => navigation.navigate("GroupCreate")}
        //             variant="primary"
        //         />
        //     </View>
        //     <FlatList
        //         data={items}
        //         renderItem={({ item }) => (
        //             < group={item} />
        //         )}
        //         keyExtractor={(item) => item.id}
        //         showsVerticalScrollIndicator={false}
        //         bounce={false}
        //     />
        //     <View style={styles.bottom}>
        //         <RectangleButton
        //             icon={<GroupIcon />}
        //             text="Groups"
        //             color="#FFAD46"
        //             number={groups.length}
        //         />
        //     </View> */}
         </View>
    );
}

export default ItemsScreen;

const styles = StyleSheet.create({
    image: {
        width: 60,
        height: 60,
        backgroundColor: Colors.impact,
    },
    container: {
        backgroundColor: "white",
        flex: 1,
        paddingTop: 40,
    },
    textContainer: {
        flexDirection: "column",
    },
    searchContainer: {
        borderWidth: 1,
        borderColor: Colors.primary2,
        width: 150,
        height: 35,
        marginRight: 50,
        alignSelf: "flex-end",
    },
    button: {
        fontSize: 17,
    },
    buttonSpot: {
        alignSelf: "flex-end",
        marginRight: 23,
        height: 45,
        padding: 12,
        // marginBottom: 40,
    },
    bottom: {
        alignItems: "flex-end",
        paddingBottom: 50,
        gap: 20,
        paddingRight: 20,
        paddingTop: 20,
    },
    navbar: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        paddingTop: 20,
        // alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginBottom: 20,
    },
});
