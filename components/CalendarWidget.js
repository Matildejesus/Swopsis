import { Calendar } from "react-native-calendars";
import Colors from "../constants/colors";

function CalendarWidget({ markedDates, toggleDate}) {
    return (
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
    )
}

export default CalendarWidget;