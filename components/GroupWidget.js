import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ArrowUp from "./icons/ArrowUp";
import Colors from "../constants/colors";
import { useState } from "react";
import ArrowDown from "./icons/ArrowDown";
import GroupDropdownItem from "./GroupDropdownItem";
import ModalLeaveWidget from "./modals/ModalLeaveWidget";

function GroupWidget() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    function toggleDropdown() {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const containerHeight = isDropdownOpen ? 130 : 83;

    const onModalClose = () => {
        setIsModalVisible(false);
    };

    return (
        <View style={[styles.groupContainer, { height: containerHeight }]}>
            <View style={styles.group}>
                <Text style={styles.text}>UNI MELB GENIUS</Text>
                <TouchableOpacity onPress={toggleDropdown}>
                    {isDropdownOpen ? <ArrowUp /> : <ArrowDown />}
                </TouchableOpacity>
            </View>
            {isDropdownOpen && (
                <View style={styles.dropdown}>
                    <GroupDropdownItem text={"IMPACT"} />
                    <GroupDropdownItem text={"WARDROBE"} />
                    <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                        <GroupDropdownItem text={"LEAVE"} />
                    </TouchableOpacity>
                    <Widget
                        visible={isModalVisible}
                        onRequestClose={onModalClose}
                    />
                </View>
            )}
        </View>
    );
}

export default GroupWidget;

const styles = StyleSheet.create({
    groupContainer: {
        alignItems: "flex-start",
        paddingTop: 14,
        alignSelf: "flex-start",
        marginLeft: 30,
    },
    group: {
        flexDirection: "row",
        gap: 13,
    },
    text: {
        color: Colors.primary2,
        fontSize: 15,
        fontFamily: "RalewayMedium",
    },
    dropdown: {
        marginBottom: 40,
    },
});
