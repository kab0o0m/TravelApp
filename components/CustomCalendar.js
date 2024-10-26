import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

LocaleConfig.locales["custom"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};
LocaleConfig.defaultLocale = "custom";

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

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const onDaySelect = (day) => {
    const today = new Date();
    const selectedDate = new Date(day.dateString);

    if (selectedDate < today.setHours(0, 0, 0, 0)) {
      return; // Ignore past dates
    }

    let newMarkedDates = { ...markedDates };

    // Clear previous markings for non-disabled dates
    Object.keys(newMarkedDates).forEach((date) => {
      if (!newMarkedDates[date].disabled) {
        delete newMarkedDates[date];
      }
    });

    if (!selectedRange.startDate || (selectedRange.startDate && selectedRange.endDate)) {
      newMarkedDates[day.dateString] = {
        selected: true,
        startingDay: true,
        color: "#FFA07A",
        textColor: "#fff",
        borderRadius: 8,
      };
      setSelectedRange({ startDate: formatDate(day.dateString), endDate: "" });
    } else if (selectedRange.startDate && !selectedRange.endDate) {
      const start = selectedRange.startDate;
      const end = formatDate(day.dateString);

      if (new Date(day.dateString) < new Date(start.split("/").reverse().join("-"))) {
        return;
      }

      const rangeDates = getDatesInRange(start, end);
      rangeDates.forEach((date, index) => {
        newMarkedDates[date] = {
          selected: true,
          color: "#FFA07A",
          textColor: "#000",
          ...(index === 0 ? { startingDay: true } : {}),
          ...(index === rangeDates.length - 1 ? { endingDay: true, borderRadius: 8 } : {}),
        };
      });

      setSelectedRange({ startDate: start, endDate: end });
    }

    setMarkedDates(newMarkedDates);
  };

  const getDatesInRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate.split("/").reverse().join("-"));
    const end = new Date(endDate.split("/").reverse().join("-"));

    while (currentDate <= end) {
      dates.push(currentDate.toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const handleConfirm = () => {
    if (selectedRange.startDate && selectedRange.endDate) {
      onDateSelect(selectedRange.startDate, selectedRange.endDate);
    }
  };

  return (
    <View style={styles.container}>
      <Calendar
        current={new Date().toISOString().split("T")[0]}
        onDayPress={onDaySelect}
        markedDates={markedDates}
        markingType={"period"}
        theme={{
          todayTextColor: "#FF4500",
          arrowColor: "#333",
          monthTextColor: "#333",
          textDayFontWeight: "bold",
          textDayFontSize: 22,
          textMonthFontSize: 20,
          textMonthFontWeight: "bold",
          textDayHeaderFontSize: 15,
        }}
        style={styles.calendarStyle}
      />
      {selectedRange.startDate && selectedRange.endDate && (
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirm Date</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  calendarStyle: {
    width: 350,
    height: 400,
  },
  confirmButton: {
    backgroundColor: "#F47966",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default CustomCalendar;
