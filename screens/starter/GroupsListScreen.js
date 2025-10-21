import { useEffect, useMemo } from "react";
import { getGroups } from "../../services/apiGroups";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GroupWidget from "../../components/adminWidget/GroupWidget";
import { FlatList } from "react-native";
import Colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../components/Screen";
import { useResponsive } from "../../utils/responsive";

function GroupsListScreen({ route }) {
    const { width, height, isTablet, horizontalScale: hs, verticalScale: vs, moderateScale: ms, scaleFont } = useResponsive();

    const dynamicStyles = useMemo(() => {
        return StyleSheet.create({
            container: {
                flex: 1,
                paddingVertical: vs(40),
                backgroundColor: Colors.impact,
                alignItems: "center",
                justifyContent: "center",
            },
            link: {
                color: Colors.primary1,
                fontSize: 15,
                fontFamily: "Raleway_700Bold",
                marginTop: vs(10),
                marginLeft: hs(20),
                width: hs(200),
                paddingLeft: hs(5),
                backgroundColor: Colors.impact
            },
        }, [width, height, isTablet, hs, vs, ms, scaleFont]);
    })

    const navigation = useNavigation();
    const allGroups = route.params.groups.filter(groups => groups.status == "approved");
    return (
        <View style={dynamicStyles.container}>
            
            <FlatList
                data={allGroups}
                renderItem={({ item }) => (
                    <GroupWidget group={item} screen="maps" />
                )}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                bounce={false}
            />
            <TouchableOpacity onPress={() => navigation.navigate("AmbassadorRequest")}>
                <Text style={dynamicStyles.link}>
                    Be an Ambassador Instead
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default GroupsListScreen;
