import { Text, View, Image, StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";
import Colors from "../../constants/colors";
import ViewIcon from "../../components/icons/ViewIcon";
import { useState } from "react";
import RectangleButton from "../../components/RectangleButton";
import GroupIcon from "../../components/icons/adminicons/GroupIcon";
import PrimaryButton from "../../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { getGroups } from "../../services/apiGroups";
import SideBarNav from "../../components/SideBarNav";

function GroupsScreen() {
  const avatar = [];
  const [search, setSearch] = useState('');

  const navigation = useNavigation();

  const groups = getGroups();
  console.log("Groups: ", groups);
  function addSearch(newSearch) {
      setSearch(newSearch);
    }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.navbar}>
          <SideBarNav navigation={navigation}/>
        </View>
        <PrimaryButton 
          title="Create Group" 
          textStyle={styles.button} 
          style={styles.buttonSpot}
          onPress={() => navigation.navigate("GroupCreate")}
        />
      </View>
      <View  style={{
        width: 284,
        height: 60,
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
        }}
      >
        <Image style={styles.image} source={avatar ? { uri: avatar } : null} />
        <View style={styles.textContainer}>
          <Text>xxxx Group</Text>
          <Text>xx Members</Text>
          <Text>20xx-xx-xx</Text>
        </View> 
        <ViewIcon />
      </View>
      <View style={styles.bottom}>
        <RectangleButton icon={<GroupIcon />} text="Groups" color="#FFAD46" number="0"/>    
      </View>
    </View>
  )
}

export default GroupsScreen;

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
      alignContent: "flex-end",
      alignSelf: "flex-end",
      alignItems: "flex-end",
      justifyContent: "flex-end",
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
    }
})