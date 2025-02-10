import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../constants/colors";
import SettingsIcon from "../components/icons/SettingsIcon";
import { useUser } from "../components/authentication/useUser";
import Line from "../components/Line";
import { getItems } from "../services/apiItems";
import { useEffect } from "react";
import RectangleButton from "../components/RectangleButton";
import ItemIcon from "../components/icons/adminicons/ItemIcon";
import MemberIcon from "../components/icons/adminicons/MemberIcon";
import GroupIcon from "../components/icons/adminicons/GroupIcon";
import FeedbackIcon from "../components/icons/adminicons/FeedbackIcon";
import LmsIcon from "../components/icons/adminicons/LmsIcon";
import RequestStatistic from "../components/RequestStatistic";
import DashboardIcon from "../components/icons/DashboardIcon";

function AdminProfileScreen({ navigation }) {
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

  const { userName, avatar } = user.user_metadata;
  const email = user.email; 

  const handleAddIconPress = () => {
    setModalVisible(true);
  };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image style={styles.image} source={avatar ? { uri: avatar } : null} />
                <View style={styles.userInfo}>
                    <Text style={styles.userName}>{userName}</Text>
                    <Text style={styles.userEmail}>{email}</Text>
                </View>
            </View>
            <View style={styles.iconsContainer}>
            {user.user_metadata.ambassador && (
              <DashboardIcon
                location={{
                  name: "InApp",
                  // params: {
                  //   screen: "Profile",
                  //   initial: false,
                  // },
                }}
              />
            )}

                <SettingsIcon />
            </View>
            <Line style={styles.line} />
            <View style={styles.iconContainer}>
                <RectangleButton icon={<ItemIcon />} text="Total Items" color="#FB5099" number="0"/>
                <RectangleButton icon={<MemberIcon />} text="Members" color="#31CE36" number="0"/>
                <RectangleButton icon={<FeedbackIcon />} text="Feedback" color="#F25961" number="0"/>
                <RectangleButton icon={<GroupIcon />} text="Groups" color="#FFAD46" number="0"/>
                <RectangleButton icon={<LmsIcon />} text="LMS" color="#357738" number="0"/>
            </View>
            <Text style={styles.title}>Overall Statistics</Text>
            <Text style={styles.subtitle}>Daily information about statistics in system</Text>
            <Line style={styles.line} />
            <View style={styles.layout}>
                <RequestStatistic number="0" text="Accepted Requests" />
                <RequestStatistic number="0" text="Pending Requests" />
                <RequestStatistic number="0" text="Rejected Requests" />
            </View>
        </View>
    );
}

export default AdminProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  //  alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    marginTop: 24,
    marginLeft: 44,
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
    fontWeight: '700',
  },
  userEmail: {
    color: Colors.primary2,
    fontFamily: "RalewayMedium",
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 11,
  },
  coins: {
    flexDirection: "row",
    gap: 11,
  },
  iconsContainer: {
    marginHorizontal: 50,
    gap: 30,
    marginTop: 15,
    marginBottom: 17,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  line: {
    width: 327,
    height: 1,
    backgroundColor: Colors.primary2,
    marginLeft: 25,
  },
  iconContainer: {
    alignItems: "center",
    gap: 10,
    marginTop: 23,
  },
  title: {
    fontFamily: "RalewayBold",
    fontSize: 18,
    color: Colors.primary2,
    marginBottom: 10,
    marginTop: 33,
    marginLeft: 23,
  },
  subtitle: {
    fontFamily: "RalewayRegular",
    fontSize: 15,
    color: Colors.primary2,
    marginBottom: 15,
    marginLeft: 23,
  },
  layout: {
      flexDirection: "row", 
      gap: 10,
      justifyContent: "center",
      gap: 40,
      marginTop: 20,
   },
});
