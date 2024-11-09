import { View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import HeartIcon from "../components/icons/HeartIcon";
import Colors from "../constants/colors";
import { Divider } from '@rneui/themed';
import { useUser } from "../components/authentication/useUser";
import PinkNextArrow from "../components/icons/PinkNextArrow";
import SegmentedBar from "../components/SegmentedBar";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import ProfileItemDetails from "../components/ProfileItemDetails";

function ProfileItemScreen( ) {

    const [selectedOption, setSelectedOption] = useState(0); 

    const handleChange = (index) => {
        setSelectedOption(index); 
    };

    const route = useRoute();
    const { id } = route.params;

    return (
    <View style={styles.container}>
        {selectedOption === 0 ? ( <ProfileItemDetails itemID={id} />) :
        (<Text> This is the reviews page</Text>)}
        
        <View style={styles.column2}>
            <SegmentedBar option1="Details" option2="Reviews" selectedIndex={selectedOption}
                    onChange={handleChange}  />
        </View>
    </View>
            
        );
    }

export default ProfileItemScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
      },
});
