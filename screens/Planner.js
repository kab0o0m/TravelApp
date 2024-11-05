import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import NavBar from "../components/NavBar";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import BASE_URL from "../config";
import { format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchUserData } from "../api/authAPI"; // Assuming this function is defined

const Planner = () => {
  const navigation = useNavigation();
  const [trips, setTrips] = useState([]); // State to store trips
  const [userId, setUserId] = useState(null); // State to store user ID

  // Function to fetch trips from the backend
  const fetchTrips = async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`${BASE_URL}/api/users/${userId}/trips`);
      setTrips(response.data);
    } catch (error) {
      console.error("Error loading trips:", error);
      Alert.alert("Error", "Failed to load trips.");
    }
  };

  // Fetch trips when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchTrips();
    }, [userId])
  );

  // Load user ID from AsyncStorage or API
  useEffect(() => {
    const loadUserId = async () => {
      try {
        let storedUserData = await AsyncStorage.getItem("userData");
        if (!storedUserData) {
          console.log("Fetching user data...");
          storedUserData = await fetchUserData();
          await AsyncStorage.setItem("userData", JSON.stringify(storedUserData));
        }
        const userData = JSON.parse(storedUserData);
        setUserId(userData.id);
      } catch (error) {
        console.error("Error loading user data:", error);
        Alert.alert("Error", "Failed to retrieve user data.");
      }
    };
    loadUserId();
  }, []);

  // Helper function to format dates
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return isNaN(date.getTime()) ? "Invalid Date" : format(date, "dd/MM/yyyy");
  };

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
                {/* Display the location name fetched from the database */}
                <Text style={styles.tripDestination}>{trip.location_name}</Text>
                <Text style={styles.tripDates}>
                  {`${formatDate(trip.start_date)} to ${formatDate(trip.end_date)}`}
                </Text>
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

      <NavBar />
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
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#F9F9F9", // Light background for trip items
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  tripDetails: {
    flexDirection: "column",
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
    backgroundColor: "#F47966", // Button background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 20,
    alignSelf: "center",
    borderRadius: 50,
  },
  addTripButtonText: {
    fontSize: 18,
    color: "#fff", // Text color for add button
    fontWeight: "bold",
  },
});

export default Planner;
