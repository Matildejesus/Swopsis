import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/colors";
import SegmentedControlTabs from 'react-native-segmented-control-tabs';
import {useState} from "react";
import { fonts } from "@rneui/base";
import ReviewStar from "./icons/ReviewStar";

function SegmentedBar( {option1, option2, selectedIndex, onChange } ) {
    return (
        <View>
            <SegmentedControlTabs
            values={[
                <Text style={[styles.optionStyle, selectedIndex === 0 && { color: Colors.primary1 }]}>{option1}</Text>,
                <Text style={[styles.optionStyle, selectedIndex === 1 && { color: Colors.primary1 }]}>{option2}</Text>
            ]}
            //values={[option1, option2]}
            handleOnChangeIndex={onChange}
            activeIndex={selectedIndex}
            tabsContainerStyle={{
                width: '100%',
                height: 34,
                backgroundColor: '#D9D9D9',
                borderTopLeftRadius: 30,
                borderBottomLeftRadius: 30,
                borderTopRightRadius: 30,
                borderBottomRightRadius: 30,
                shadowColor: "#000",
                shadowOffset: {
	                width: 0,
	                height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            }}
            activeTabStyle={{
                backgroundColor: "white",
            }}
            firstTabStyle={{
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
               // backgroundColor: '#D9D9D9',
            }}
            lastTabStyle={{
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
            }}
            activeTabTextStyle={
                styles.activeOptionStyle
            }
        />
      </View>
    );
}

export default SegmentedBar;

const styles = StyleSheet.create({
    optionContainer: {
        width: 127,
        justifyContent: "center",
        alignItems: "center",
    },
    optionStyle: {
        fontFamily: "RalewayBold",
        fontSize: 15,
        color: Colors.primary2,
        opacity: 0.53,
    },
    activeOptionStyle: {
        color: Colors.primary1,
    }
})