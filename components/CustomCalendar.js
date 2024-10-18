import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

const CustomCalendar = ({ onDateSelect }) => {
  const [selectedRange, setSelectedRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    markPastDates();
  }, []);

  const markPastDates = () => {
    const today = new Date();
    const pastDaysLimit = 300;
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

    if (selectedDate < today.setHours(0, 0, 0, 0)) {
      return;
    }

    let newMarkedDates = { ...markedDates };

    Object.keys(newMarkedDates).forEach((date) => {
      if (!newMarkedDates[date].disabled) {
        delete newMarkedDates[date];
      }
    });

    if (
      !selectedRange.startDate ||
      (selectedRange.startDate && selectedRange.endDate)
    ) {
      newMarkedDates = {
        ...newMarkedDates,
        [day.dateString]: {
          selected: true,
          startingDay: true,
          color: "#D0D0D0",
          textColor: "#fff",
        },
      };
      setSelectedRange({ startDate: day.dateString, endDate: "" });
    } else if (selectedRange.startDate && !selectedRange.endDate) {
      const start = selectedRange.startDate;
      const end = day.dateString;

      const rangeDates = getDatesInRange(start, end);
      rangeDates.forEach((date, index) => {
        newMarkedDates[date] = {
          selected: true,
          color: "#eeeeee",
          textColor: "#000",
          ...(index === 0 ? { startingDay: true, color: "#e6e6e6" } : {}),
          ...(index === rangeDates.length - 1
            ? { endingDay: true, color: "#e6e6e6" }
            : {}),
        };
      });

      setSelectedRange({ startDate: start, endDate: end });
      onDateSelect(start, end); // Pass the selected start and end dates to parent
    }

    setMarkedDates(newMarkedDates);
  };

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
      <Calendar
        current={new Date().toISOString().split("T")[0]}
        onDayPress={onDaySelect}
        markedDates={markedDates}
        markingType={"period"}
        theme={{
          selectedDayBackgroundColor: "#007BFF",
          todayTextColor: "#FF6347",
          arrowColor: "#000",
          monthTextColor: "#333",
          textDayFontWeight: "bold",
          textDayHeaderFontWeight: "500",
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textMonthFontWeight: "bold",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});

export default CustomCalendar;
