import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

const CustomCalendar = () => {
  const [selectedRange, setSelectedRange] = useState({ startDate: "", endDate: "" });
  const [markedDates, setMarkedDates] = useState({});

  const onDaySelect = (day) => {
    let newMarkedDates = { ...markedDates };

    if (!selectedRange.startDate || (selectedRange.startDate && selectedRange.endDate)) {
      // When no startDate is selected or both start and end are selected, reset
      newMarkedDates = {
        [day.dateString]: {
          selected: true,
          startingDay: true,
          color: "#D0D0D0", // Darker grey for the start date
          textColor: "#fff",
        },
      };
      setSelectedRange({ startDate: day.dateString, endDate: "" });
    } else if (selectedRange.startDate && !selectedRange.endDate) {
      // If a start date is selected, now select the end date
      const start = selectedRange.startDate;
      const end = day.dateString;

      // Mark all the dates between startDate and endDate
      const rangeDates = getDatesInRange(start, end);
      rangeDates.forEach((date, index) => {
        newMarkedDates[date] = {
          selected: true,
          color: "#eeeeee", // Lighter grey for dates in between
          textColor: "#000",
          ...(index === 0 ? { startingDay: true, color: "#e6e6e6" } : {}), // Darker grey for the start date
          ...(index === rangeDates.length - 1 ? { endingDay: true, color: "#e6e6e6" } : {}), // Darker grey for the end date
        };
      });

      setSelectedRange({ startDate: start, endDate: end });
    }

    setMarkedDates(newMarkedDates);
  };

  // Helper function to get all dates between startDate and endDate
  const getDatesInRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);
    const end = new Date(endDate);

    while (currentDate <= end) {
      dates.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
          current={"2024-09-13"}
          onDayPress={onDaySelect}
          markedDates={markedDates}
          markingType={"period"}
          theme={{
            selectedDayBackgroundColor: "#007BFF", // Blue background for selected dates
            todayTextColor: "#FF6347", // Tomato color for today's date
            arrowColor: "#000", // Blue arrows
            monthTextColor: "#333", // Dark grey month text color
            textDayFontWeight: "bold",
            textDayHeaderFontWeight: "500",
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textMonthFontWeight: "bold",
            todayBackgroundColor: "#FFF5F5", // Light red background for today's date
            calendarBackground: "#FFF", // White background for the calendar
          }}
          style={styles.calendar}
        />
      </View>
      {selectedRange.startDate && selectedRange.endDate && (
        <View style={styles.tripSummary}>
          <Text style={styles.tripText}>
            Trip: {selectedRange.startDate} - {selectedRange.endDate}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  calendarContainer: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    padding: 10,
  },
  calendar: {
    borderRadius: 15,
  },
  tripSummary: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tripText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
});

export default CustomCalendar;
