import { View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import Colors from "../constants/colors";
import { useRoute } from "@react-navigation/native";
import MainButton from "../components/MainButton";
import { useState } from "react";
import { updateUnavailability } from "../services/apiItems";
import CalendarWidget from "../components/CalendarWidget";

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

    console.log("MARKED DATES: ", markedDates);
    return (
        <View style={styles.container}>
           <CalendarWidget markedDates={markedDates} toggleDate={toggleDate} />
            { owner && !isEditing &&  
                <MainButton 
                    title="Edit Unavailable Dates" 
                    onPress={() =>setIsEditing(true)} 
                    style={styles.buttonContainer} 
                    textStyle={styles.textStyle}
                    variant="primary"
                />
            }
            {isEditing && 
                <MainButton 
                    title="Update"  
                    onPress={() => {
                        console.log("Update button pressed");
                        onUpdate();
                    }}
                    style={styles.buttonContainer} 
                    textStyle={styles.textStyle}
                    variant="primary"
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
