import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomCalendar from "../components/CustomCalendar"; // Import your CustomCalendar

const PlannerNewTrip = ({ route }) => {
  const navigation = useNavigation();
  const { onAddTrip } = route.params; 
  const [isCalendarVisible, setCalendarVisible] = useState(false); 
  const [selectedDate, setSelectedDate] = useState(""); 
  const [destination, setDestination] = useState(""); 

  const openCalendar = () => {
    setCalendarVisible(true); 
  };

  const closeCalendar = () => {
    setCalendarVisible(false); 
  };

  const handleDateSelection = (startDate, endDate) => {
    setSelectedDate(`${startDate} to ${endDate}`);
    closeCalendar(); 
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
        <Text style={styles.exitButtonText}>X</Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Plan a new trip</Text>
        <Text style={styles.subheaderText}>Fill in the details below</Text>
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Where to?"
          value={destination}
          onChangeText={setDestination} // Update destination state
        />

        {/* Date Input Field */}
        <TouchableOpacity onPress={openCalendar} style={styles.input}>
          <Text>{selectedDate || "Date?"}</Text>
        </TouchableOpacity>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity onPress={handleConfirmTrip} style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Confirm Trip</Text>
      </TouchableOpacity>

      {/* Calendar Modal */}
      <Modal visible={isCalendarVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <CustomCalendar
            onDateSelect={handleDateSelection} // Pass the handler to the CustomCalendar
          />
          <TouchableOpacity onPress={closeCalendar} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close Calendar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: "#F47966",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    marginTop: 20,
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
