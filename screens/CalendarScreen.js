import { View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import Colors from "../constants/colors";

function CalendarScreen() {
  return (
    <View style={styles.container}>
      <Calendar
        markedDates={{
          "2023-11-25": { selected: true, marked: true },
          "2023-11-24": { marked: true },
          "2023-11-26": {
            marked: true,
            dotColor: "red",
            activeOpacity: 0,
          },
        }}
        theme={{
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
        }}
      />
    </View>
  );
}

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
});
