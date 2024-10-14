import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Footer from "../components/Footer";

const PlannerMain = () => {
  // Example trip data
  const trips = [
    { id: 1, destination: "Bali", dates: "Oct 14 - Oct 20" },
    { id: 2, destination: "Singapore", dates: "Nov 5 - Nov 10" },
    { id: 3, destination: "Tokyo", dates: "Dec 1 - Dec 7" },
  ];

  const handleSort = () => {
    // Sorting logic can be implemented here
    console.log("Sort button pressed");
  };

  const handleAddTrip = () => {
    // Add trip logic here
    console.log("+ Add Trip button pressed");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Plan A Trip!</Text>
      </View>

      <View style={styles.tripHeaderContainer}>
        <Text style={styles.tripHeaderText}>Your Trips</Text>
        <TouchableOpacity onPress={handleSort} style={styles.sortButton}>
          <Text style={styles.sortButtonText}>Sort</Text>
        </TouchableOpacity>
      </View>

      {/* Trips List */}
      <ScrollView style={styles.tripListContainer}>
        {trips.map((trip) => (
          <View key={trip.id} style={styles.tripItem}>
            <Text style={styles.tripDestination}>{trip.destination}</Text>
            <Text style={styles.tripDates}>{trip.dates}</Text>
          </View>
        ))}

        {/* Add Trip Button */}
        <TouchableOpacity onPress={handleAddTrip} style={styles.addTripButton}>
          <Text style={styles.addTripButtonText}>+ Add Trip</Text>
        </TouchableOpacity>
      </ScrollView>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerContainer: {
    padding: 20,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    paddingTop: 40,
  },
  tripHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tripHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  sortButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  sortButtonText: {
    color: "#000",
    fontSize: 16,
  },
  tripListContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  tripItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tripDestination: {
    fontSize: 20,
    fontWeight: "500",
    color: "#333",
  },
  tripDates: {
    fontSize: 16,
    color: "#666",
  },
  addTripButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 20,
    alignSelf: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#F47966",
  },
  addTripButtonText: {
    fontSize: 18,
    color: "#F47966",
    fontWeight: "bold",
  },
});

export default PlannerMain;
