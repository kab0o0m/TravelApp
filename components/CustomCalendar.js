import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

const CustomCalendar = () => {
  const [selectedRange, setSelectedRange] = useState({ startDate: "", endDate: "" });
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    markPastDates();
  }, []);

  // Function to mark past dates as greyed out
  const markPastDates = () => {
    const today = new Date();
    const pastDaysLimit = 30; // Limit to last 30 days
    let pastDatesMarked = {};

    for (let i = 1; i <= pastDaysLimit; i++) {
      const pastDate = new Date();
      pastDate.setDate(today.getDate() - i);
      const dateString = pastDate.toISOString().split("T")[0];

      pastDatesMarked[dateString] = {
        disabled: true,
        disableTouchEvent: true,
        textColor: "#a9a9a9",
      };
    }

    setMarkedDates(pastDatesMarked);
  };

  const onDaySelect = (day) => {
    const today = new Date();
    const selectedDate = new Date(day.dateString);

    // Prevent selecting past dates
    if (selectedDate < today.setHours(0, 0, 0, 0)) {
      return;
    }

    let newMarkedDates = { ...markedDates }; // Keep past dates greyed out

    // Clear previous selected range but preserve greyed-out past dates
    Object.keys(newMarkedDates).forEach((date) => {
      if (!newMarkedDates[date].disabled) {
        delete newMarkedDates[date];
      }
    });

    if (!selectedRange.startDate || (selectedRange.startDate && selectedRange.endDate)) {
      // When no startDate is selected or both start and end are selected, reset
      newMarkedDates = {
        ...newMarkedDates, // Preserve past greyed out dates
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
          color: "#eeeeee",
          textColor: "#000",
          ...(index === 0 ? { startingDay: true, color: "#e6e6e6" } : {}),
          ...(index === rangeDates.length - 1 ? { endingDay: true, color: "#e6e6e6" } : {}),
        };
      });

      setSelectedRange({ startDate: start, endDate: end });
    }

    setMarkedDates(newMarkedDates); // Update marked dates while keeping past dates
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
