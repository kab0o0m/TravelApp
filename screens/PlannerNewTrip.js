import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomCalendar from "../components/CustomCalendar"; // Import your CustomCalendar
import PlannerLocationSearchbar from "../components/PlannerLocationSearchbar";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"]);

const PlannerNewTrip = ({ route }) => {
  const navigation = useNavigation();
  const { onAddTrip } = route.params || {};
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [isSearchbarVisible, setSearchbarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [destination, setDestination] = useState("");
  const [destinationID, setDestinationID] = useState("");

  useEffect(() => {
    console.log("Destination ID updated:", destinationID);
  }, [destinationID]); // This will run every time destinationID is updated

  const openCalendar = () => {
    setCalendarVisible(true);
  };

  const closeCalendar = () => {
    setCalendarVisible(false);
  };

  const openSearchBar = () => {
    setSearchbarVisible(true);
  };

  const closeSearchBar = () => {
    setSearchbarVisible(false);
  };

  const handleDateSelection = (startDate, endDate) => {
    setSelectedDate(`${startDate} to ${endDate}`);
    closeCalendar();
  };

  const handleLocationSelection = (location) => {
    setDestination(location.location_name);
    setDestinationID(location.id);
    closeSearchBar();
  };

  const handleConfirmTrip = () => {
    if (destination && selectedDate) {
      onAddTrip({ destination, dates: selectedDate });
      navigation.navigate("Planner");
    } else {
      alert("Please fill in all details.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Left X Button */}
      <TouchableOpacity style={styles.exitButton} onPress={() => navigation.navigate("Planner")}>
        <Image source={require("../assets/Cross.png")} />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Plan a new trip</Text>
        <Text style={styles.subheaderText}>Fill in the details below</Text>
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={openSearchBar} style={styles.input}>
          <Text style={[styles.inputText, { color: destination ? "#323232" : "#A9A9A9" }]}>
            {destination || "Where to?"}
          </Text>
        </TouchableOpacity>

        {/* Date Input Field */}
        <TouchableOpacity onPress={openCalendar} style={styles.input}>
          <Text style={[styles.inputText, { color: selectedDate ? "#323232" : "#A9A9A9" }]}>
            {selectedDate || "Date?"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity onPress={handleConfirmTrip} style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Confirm Trip</Text>
      </TouchableOpacity>

      {/* Calendar Modal */}
      <Modal visible={isCalendarVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {/* Calendar and Close Button Container */}
          <View style={styles.calendarWithClose}>
            {/* Calendar */}
            <CustomCalendar onDateSelect={handleDateSelection} />
          </View>
        </View>
      </Modal>

      {/* Searchbar Modal */}
      {/* <Modal visible={isSearchbarVisible}>
        <View style={styles.modalSearchContainer}>
          <PlannerLocationSearchbar
            onLocationSelect={handleLocationSelection}
            onClose={closeSearchBar}
          />
        </View>
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  // Add your styles here
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  exitButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  exitButtonText: {
    fontSize: 24,
    color: "#000",
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 80,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  subheaderText: {
    fontSize: 18,
    color: "#666",
    marginTop: 10,
  },
  inputContainer: {
    marginTop: 50,
  },
  input: {
    justifyContent: "center", // Center text vertically
    color: "#000",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    height: 60,
  },
  inputText: {
    fontSize: 20,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    backgroundColor: "#fff",
  },

  calendarContainer: {
    width: "100%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  closeButton: {
    backgroundColor: "#F47966",
    padding: 15,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default PlannerNewTrip;
