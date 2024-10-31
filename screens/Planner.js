import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Footer from "../components/NavBar";
import { useNavigation } from "@react-navigation/native";

const Planner = () => {
  const navigation = useNavigation();
  const [trips, setTrips] = useState([]); // State to store trips

  const handleAddTrip = (newTrip) => {
    setTrips((prevTrips) => [...prevTrips, newTrip]); // Add new trip to the list
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Plan A Trip!</Text>
      </View>

      <View style={styles.tripHeaderContainer}>
        <Text style={styles.tripHeaderText}>Your Trips</Text>
      </View>

      <ScrollView style={styles.tripListContainer}>
        {trips.length === 0 ? (
          <Text style={styles.noTripsText}>No trips added yet!</Text>
        ) : (
          trips.map((trip, index) => (
            <View key={index} style={styles.tripItem}>
              <View style={styles.tripDetails}>
                <Text style={styles.tripDestination}>{trip.destination}</Text>
                <Text style={styles.tripDates}>{trip.dates}</Text>
              </View>
            </View>
          ))
        )}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("PlannerNewTrip", { onAddTrip: handleAddTrip })
          }
          style={styles.addTripButton}
        >
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
    backgroundColor: "#fff",
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
    borderBottomColor: "#ddd",
  },
  tripHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  tripListContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  noTripsText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  tripItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#F9F9F9", // Light background for trip items
  },
  tripDetails: {
    padding: 10,
  },
  tripDestination: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
  },
  tripDates: {
    fontSize: 18,
    color: "#666",
  },
  addTripButton: {
    backgroundColor: "#F47966", // Change background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 20,
    alignSelf: "center",
    borderRadius: 50,
  },
  addTripButtonText: {
    fontSize: 18,
    color: "#fff", // Change text color to white
    fontWeight: "bold",
  },
});

export default Planner;
