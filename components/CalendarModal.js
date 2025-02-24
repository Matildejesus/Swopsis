import React, { useState } from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import Colors from "../constants/colors";
import PrimaryButton from "./PrimaryButton";

function CalendarModal({ visible, onSave, onBackdropPress }) {
    const [selectedDates, setSelectedDates] = useState({});

    const toggleDateSelection = (day) => {
        const date = day.dateString;
        setSelectedDates((prev) => ({
            ...prev,
            [date]: prev[date]
                ? undefined 
                : { selected: true, marked: true, dotColor: "red" },
        }));
    };

    return (
        <Modal visible={visible} transparent animationType="slide" onBackdropPress={onBackdropPress}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Select Unavailable Dates</Text>
                    <Calendar
                        onDayPress={toggleDateSelection}
                        markedDates={selectedDates}
                        theme={{
                            opacity: 0.5,
                            textSectionTitleColor: Colors.primary2,
                            selectedDayBackgroundColor: Colors.impact,
                            selectedDayTextColor: Colors.primary1,
                            todayTextColor: Colors.primary2,
                            dayTextColor: Colors.primary1,
                            textDisabledColor: Colors.popup,
                            selectedDotColor: "#fff",
                            arrowColor: Colors.primary1,
                            monthTextColor: Colors.primary1,
                            textDayFontFamily: "InterRegular",
                            textMonthFontFamily: "InterRegular",
                            textDayHeaderFontFamily: "InterSemiBold",
                            textDayFontSize: 16,
                            textMonthFontSize: 25,
                    textDayHeaderFontSize: 16,
                        }}
                    />
                    <View style={styles.buttonContainer}>
                        <PrimaryButton title="Save" onPress={() => onSave(selectedDates)} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default CalendarModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        backgroundColor:    Colors.popup,
        padding: 20,
        borderRadius: 10,
        marginHorizontal: 20,
    },
    title: {
        fontSize: 18,
        fontFamily: "RalewayBold",
        color: Colors.primary2,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    calendar: {
        backgroundColor: "#ffffff",
        calendarBackground: "#ffffff",
        textSectionTitleColor: Colors.primary2,
        selectedDayBackgroundColor: "#C67C9D",
        selectedDayTextColor: "#fff",
        todayTextColor: "#00adf5",
        dayTextColor: Colors.primary2,
        textDisabledColor: "#d9e1e8",
        dotColor: Colors.primary2,
        selectedDotColor: "#fff",
        arrowColor: Colors.primary1,
        monthTextColor: Colors.primary1,
        textDayFontFamily: "InterRegular",
        textMonthFontFamily: "InterRegular",
        textDayHeaderFontFamily: "InterSemiBold",
        textDayFontSize: 16,
        textMonthFontSize: 25,
        textDayHeaderFontSize: 16,
    }
});