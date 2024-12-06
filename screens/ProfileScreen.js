import { View, Text, StyleSheet, Image } from "react-native";
import { useDispatch } from "react-redux";

import Colors from "../constants/colors";
import CoinIcon from "../components/icons/CoinIcon";
import SettingsIcon from "../components/icons/SettingsIcon";
import CalendarIcon from "../components/icons/CalendarIcon";
import ImpactIcon from "../components/icons/ImpactIcon";
import AddIcon from "../components/icons/AddIcon";
import { useUser } from "../components/authentication/useUser";
import Line from "../components/Line";
import ProfileItemWidget from "../components/ProfileItemWidget";
import { getItems } from "../services/apiItems";
import { useState, useEffect } from "react";

function ProfileScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const fetchItems = async () => {
        try {
          const fetchedItems = await getItems({ userId: user.id });
          setItems(fetchedItems); 
        } catch (error) {
          console.error("Error fetching items: ", error);
        } finally {
          setLoading(false); 
        }
      };

      fetchItems(); 
    }
  }, [user]); 

    
  if (!user) {
    return <Text>Loading user data...</Text>;
  }

  //const { items } = getItems({userId: user.id});
  console.log("user:", JSON.stringify(user, null, 2));
  const { userName, avatar, coins } = user.user_metadata;
  const email = user.email; 
  console.log("avatar on profile: " + avatar);

  console.log(user.id);
  console.log("THE ITEMS: ", items);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image style={styles.image} source={avatar ? { uri: avatar } : null} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{email}</Text>
          <View style={styles.coins}>
            <CoinIcon />
            <Text style={styles.userName}>{coins}</Text>
          </View>
        </View>
      </View>
      <View style={styles.iconsContainer}>
        <ImpactIcon />
        <CalendarIcon />
        <SettingsIcon />
      </View>
        <Line style={styles.line} />
        <ProfileItemWidget items={items}/>
        <AddIcon />
    </View>
    // </ScrollView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
  headerContainer: {
    // flex:  1,
    flexDirection: "row",
    marginTop: 24,
    marginLeft: 44,
    alignSelf: "flex-start",
    // marginLeft: 44,
  },
  userInfo: {
    marginLeft: 16,
  },
  image: {
    width: 85,
    height: 87,
    backgroundColor: Colors.impact,
    borderRadius: 21,
  },
  userName: {
    color: Colors.primary2,
    fontFamily: "RalewayBold",
    fontSize: 20,
    fontWeight: 700,
  },
  userEmail: {
    color: Colors.primary2,
    fontFamily: "RalewayMedium",
    fontSize: 15,
    fontWeight: 500,
    marginBottom: 11,
  },
  coins: {
    flexDirection: "row",
    gap: 11,
  },
  iconsContainer: {
    marginHorizontal: 30,
    gap: 45,
    marginTop: 15,
    marginBottom: 17,
    // marginBottom: 330,
    flexDirection: "row",
    // fontFamily: "RalewayBold",
  },
  line: {
    width: 327,
    height: 1,
    backgroundColor: Colors.primary2,
    marginTop: 17,
  },
  groupText: {
    color: Colors.primary2,
    fontSize: 20,
    fontWeight: 700,
    marginTop: 16,
    marginLeft: 17,
    alignSelf: "flex-start",
    fontFamily: "RalewayBold",
  },
  line: {
    width: 327,
    height: 1,
    backgroundColor: Colors.primary2,
    // marginTop: 17,
    alignItems: "center",
  },
});