import { View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import Colors from "../constants/colors";
import { useRoute } from "@react-navigation/native";
import PrimaryButton from "../components/PrimaryButton";
import { useState } from "react";
import { updateUnavailability } from "../services/apiItems";

function CalendarScreen() {
    const route = useRoute();
    const { dates, itemId, owner } = route.params;
    const [markedDates, setMarkedDates] = useState(dates || {});
    const [isEditing, setIsEditing] = useState(false);
    console.log("Dates: ", dates);

    const toggleDate = (day) => {
        if (!isEditing) return;

        const newMarkedDates = { ...markedDates };

        if (newMarkedDates[day.dateString]) {
            delete newMarkedDates[day.dateString]; // Remove date if already marked
        } else {
            newMarkedDates[day.dateString] = {
                marked: true,
                dotColor: "red",
                selected: true,
            }; // Add new unavailable date
        }

        setMarkedDates(newMarkedDates);
        console.log("newMarkedDates: ", newMarkedDates);
    };
    
    const onUpdate = async() => {
        console.log("updated");
        try {
            await updateUnavailability({ dates: markedDates, id: itemId});
            setIsEditing(false);
        } catch(error) {
            console.error("Error updating unavailability: ", error);
        }
    }

    return (
        <View style={styles.container}>
            <Calendar
                markedDates={markedDates}
                onDayPress={toggleDate}
                theme={{
                    backgroundColor: "#ffffff",
                    calendarBackground: "#ffffff",
                    textSectionTitleColor: Colors.primary2,
                    selectedDayBackgroundColor: Colors.popup,
                    selectedDayTextColor: Colors.primary1,
                    todayTextColor: Colors.primary1,
                    dayTextColor: Colors.primary2,
                    textDisabledColor: "#d9e1e8",
                    dotColor: Colors.primary2,
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
            { owner && !isEditing && 
                <PrimaryButton 
                    title="Edit Unavailable Dates" 
                    onPress={() =>setIsEditing(true)} 
                    style={styles.buttonContainer} 
                    textStyle={styles.textStyle}
                />
            }
            {isEditing && 
                <PrimaryButton 
                    title="Update"  
                    onPress={() => {
                        console.log("Update button pressed");
                        onUpdate();
                    }}
                    style={styles.buttonContainer} 
                    textStyle={styles.textStyle}
                />
            }
        </View>
    );
}

export default CalendarScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.popup,
        flex: 1,
        padding: 20,
    },
    buttonContainer: {
        padding: 0,
        marginTop: 10,
        alignSelf: "flex-end"
    },
    textStyle: {
        paddingVertical: 7,
        fontSize: 15,
        fontFamily: "RalewayRegular"
    }
});
