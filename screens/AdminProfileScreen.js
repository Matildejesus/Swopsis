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
import { getAllJoinRequests, getJoinRequests } from "../services/apiJoinRequests";
import CoinIcon from "../components/icons/adminicons/CoinIcon";
import NewsIcon from "../components/icons/adminicons/NewsIcon";
import { getAllUsers, getGroupMembers } from "../services/apiAdmin";

function AdminProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [requests, setRequests] = useState([]);
  const [members, setMembers] = useState([]);
  const [requestCount, setRequestCount] = useState();
  const [membersCount, setMembersCount] = useState();
  const [loading, setLoading] = useState();
  const { user } = useUser();
  const [userName, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [ambassador, setAmbassador] = useState(null);
  const [group, setGroup] = useState("");
  const [email, setEmail] = useState("");
 // console.log(user.app_metadata);
  
  useEffect(() => {
    if (!user) return; 

    if (user.app_metadata?.role == "super-admin") {  
      console.log("USER: ", user);
      setUsername("Super Admin");
    } else {
      setUsername(user.user_metadata.userName);
      setAvatar(user.user_metadata.avatar);
      setGroup(user.user_metadata.group);
      setAmbassador(user.user_metadata.ambassador);
    }
    setEmail(user.email);
    setRequests(null);
    setRequestCount(0);
    setMembers(null);
    setMembersCount(0);
    console.log(group);
    if (group) {
      const fetchRequests = async () => {
        try {
          const fetchedRequests = await getJoinRequests({ groupId: group });
          const fetchedMembers = await getGroupMembers({groupId: group, id: user.id});
          setRequests(fetchedRequests);
          setRequestCount(fetchedRequests.length);
          setMembers(fetchedMembers);
          console.log("FETCHED MEMBERS: ", fetchedMembers);
          setMembersCount(fetchedMembers.length);
        } catch (error) {
          console.error("Error fetching requests: ", error);
        }
      };
      fetchRequests();
    } else {
      const fetchRequests = async () => {
        try {
          const fetchedRequests = await getAllJoinRequests();
          const fetchedMembers = await getAllUsers();
         // setRequests(fetchedRequests);
          setRequestCount(fetchedRequests.length);
          setMembers(fetchedMembers);
          setMembersCount(fetchedMembers.users.length);
        } catch (error) {
          console.error("Error fetching requests: ", error);
        }
      };
      fetchRequests();
    }
  }, [user, group]);


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
            {ambassador && (
              <DashboardIcon text="Profile"
                location={{
                  name: "InApp",
                }}
              />
            )}

                <SettingsIcon />
            </View>
            <Line style={styles.line} />
            <View style={styles.iconContainer}>
                <RectangleButton icon={<ItemIcon />} text="Total Items" color="#FB5099" number="0" location="Items"/>
                <RectangleButton icon={<MemberIcon />} text="Members" color="#31CE36" number={membersCount} location="Members" data={members} requests={requests}/>
                <RectangleButton icon={<FeedbackIcon />} text="Feedback" color="#F25961" number="0" location="Feedback"/>
                {ambassador ? (
                  <>
                    <RectangleButton icon={<CoinIcon />} text="Total Coins" color="#357738" number="0" location="Coins" />
                    <RectangleButton icon={<NewsIcon />} text="News" color="#FFAD46" number="0" location="News" />
                  </>
                ) : (
                  <>
                    <RectangleButton icon={<GroupIcon />} text="Groups" color="#FFAD46" number="0" location="Groups" />
                    <RectangleButton icon={<LmsIcon />} text="LMS" color="#357738" number="0" location="Lms" />
                  </>
                )}
            </View>
            <Text style={styles.title}>Overall Statistics</Text>
            <Text style={styles.subtitle}>Daily information about statistics in system</Text>
            <Line style={styles.line} />
            <View style={styles.layout}>
                <RequestStatistic number="0" text="Accepted Requests" />
                <RequestStatistic number={requestCount} text="Pending Requests" />
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
   // alignItems: "center",
    justifyContent: "center"
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
