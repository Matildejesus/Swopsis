// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import Colors from '../constants/colors';
// import { useUser } from '../components/authentication/useUser';
// import { getGroupsForUser } from '../services/groupService'; // You'll need to implement this

// export default function MyGroupsScreen({ navigation }) {
//   const { user } = useUser();
//   const [groups, setGroups] = useState([]);

//   useEffect(() => {
//     if (user) {
//       (async () => {
//         const userGroups = await getGroupsForUser(user.id);
//         setGroups(userGroups);
//       })();
//     }
//   }, [user]);

//   if (!user) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>My Groups</Text>
//       {groups.length === 0 ? (
//         <Text>You are not a member of any groups.</Text>
//       ) : (
//         groups.map(group => (
//           <TouchableOpacity
//             key={group.id}
//             style={styles.groupButton}
//             onPress={() => navigation.navigate('Wardrobe', { groupId: group.id })}
//           >
//             <Text style={styles.groupText}>{group.name}</Text>
//           </TouchableOpacity>
//         ))
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container:{
//     flex:1,
//     backgroundColor:'white',
//     padding:20
//   },
//   title:{
//     fontSize:20,
//     fontWeight:'bold',
//     marginBottom:20,
//     color: Colors.primary1
//   },
//   groupButton:{
//     backgroundColor:Colors.primary1,
//     padding:15,
//     borderRadius:5,
//     marginBottom:10
//   },
//   groupText:{
//     color:'white',
//     fontWeight:'bold'
//   }
// });
