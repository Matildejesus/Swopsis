import React from 'react';
import { View, Text } from 'react-native';

const GroupDetailsScreen = ({ route }) => {
  const { groupId } = route.params;

  return (
    <View>
      <Text>Group ID: {groupId}</Text>
      {/* You can fetch and display more details about the group using the groupId */}
    </View>
  );
};

export default GroupDetailsScreen;