import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import Colors from '../constants/colors';
import PrimaryButton from '../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import MemberIcon from '../components/icons/MemberIcon';
import SmallPinIcon from '../components/icons/SmallPinIcon';
import { updateGroup } from '../services/apiAuth';

function GroupDetailsScreen({ route }) {

  const navigation = useNavigation();
  const { group } = route.params;

  const submitHandler = async () => {
      console.log("submitting!!!");
      const group = "Pending";
      console.log("GROUP: ", group);
      const data = updateGroup({group});
      console.log(data);
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "InApp",
            params: {
              screen: "Profile",
              initial: false,
            },
          },
        ],
      });
  }

  return (
  // const isAdmin = user && user.id === group.adminId;
  // console.log("group: ", group);
  // return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: group.avatar}} />
      <Text style={styles.title}>{group.name}</Text>
      <Text style={styles.header}>Description</Text>
      <View style={{height: 270}}>
      <ScrollView>
        <Text style={styles.content}>{group.description}</Text>
      </ScrollView>
      <Text style={[styles.header, { marginTop: 10 }]}>Rules</Text>
      <ScrollView>
        <Text style={[styles.content, { width: 170 }]}>{group.rules}</Text>
      </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton title="REQUEST TO JOIN" onPress={submitHandler}/>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.row}> 
          <View style={{marginTop: 10}}>
            <SmallPinIcon />
          </View>
          <Text style={styles.info}>{group.location}</Text>
        </View>
        <View style={styles.row}>
          <MemberIcon/>
          <Text style={styles.info}>{group.numberOfMem}</Text>
        </View>
        
      </View>

       {/* {isAdmin && (
  //       <Button 
  //         title="Manage Group" 
  //         onPress={() => navigation.navigate('AdminPage', { groupId: groupId })}
  //       />
  //     )} */}
      </View>
   
  );
}

export default GroupDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
  },
  title:{
    fontWeight:'bold',
    marginBottom: 10,
    textTransform: "uppercase",
    alignSelf: "center",
    fontFamily: 'RalewayBold',
    fontSize: 30,
    color: Colors.primary1,
    marginTop: 10,
    marginBottom: 80,
  },
  image: {
    height: "38%",
    width: "100%",
  },
  header: {
    fontFamily: "RalewayBold",
    fontSize: 18,
    color: Colors.primary2,
    marginLeft: 23,
  },
  content: {
    width: 296,
    //height: 73,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontFamily: 'RalewayRegular',
    fontSize: 15,
    color: Colors.primary2,
    paddingTop: 14,
    marginLeft: 33,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginRight: 30,
    position: "absolute",
    bottom: 30,
    right: 0,
  },
  infoContainer: {
    flexDirection: "column",
    position: 'absolute',
    top: 340,
    left: 227,
    width: 108,
   // zIndex: 5,
    gap: 10,
  },
  info: {
    fontFamily: 'RalewayRegular',
    fontSize: 15,
    color: Colors.primary2,
  },
  row: {
    flexDirection: "row",
    gap: 20,
  }
});
