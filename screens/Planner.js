import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Toast from 'react-native-toast-message';
import NavBar from "../components/NavBar";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import BASE_URL from "../config";
import { format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchUserData } from "../api/authAPI";
import { getPlacePhotoByPlaceId, deleteTripById } from "../api/places";

const Planner = () => {
  const navigation = useNavigation();
  const [trips, setTrips] = useState([]);
  const [userId, setUserId] = useState(null);

  const fetchTrips = async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`${BASE_URL}/api/users/${userId}/trips`);
      
      const tripsWithPhotos = await Promise.all(
        response.data.map(async (trip) => {
          const photoUrl = await getPlacePhotoByPlaceId(trip.places_id);
          return { ...trip, photoUrl };
        })
      );

      setTrips(tripsWithPhotos);
    } catch (error) {
      console.error("Error loading trips:", error);
      Alert.alert("Error", "Failed to load trips.");
    }
  };

  const handleDeleteTrip = async (tripId) => {
    try {
      await deleteTripById(tripId);
      setTrips(trips.filter((trip) => trip.id !== tripId));
      Toast.show({
        type: 'error',
        text1: 'Deleted',
        text2: 'Trip deleted successfully.',
      });
    } catch (error) {
      console.error("Error deleting trip:", error);
      Alert.alert("Error", "Failed to delete trip.");
    }
  };

  const calculateDaysLeft = (startDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const differenceInTime = start - today;
    const daysLeft = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  
    if (daysLeft <= 0) return "Today"; // Starts today
    if (daysLeft === 1) return "1 day left"; // Only 1 day left
    return `${daysLeft} days left`; // More than 1 day
  };
  
  useFocusEffect(
    useCallback(() => {
      fetchTrips();
    }, [userId])
  );

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

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return isNaN(date.getTime()) ? "Invalid Date" : format(date, "d MMM yyyy");
  };

  const handleAddTrip = (newTrip) => {
    setTrips((prevTrips) => [...prevTrips, newTrip]);
  };

  const handleTripPress = (trip) => {
    navigation.navigate("PlannerOverview", { trip });
  };

  const renderRightActions = (tripId) => (
    <TouchableOpacity
      style={styles.deleteContainer}
      onPress={() => handleDeleteTrip(tripId)}
    >
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Plan A Trip!</Text>
      </View>

      <View style={styles.tripHeaderContainer}>
        <Text style={styles.tripHeaderText}>Your Trips</Text>
      </View>

      <ScrollView
        style={styles.tripListContainer}
        contentContainerStyle={styles.scrollViewContent}
      >
        {trips.length === 0 ? (
          <Text style={styles.noTripsText}>No trips added yet!</Text>
        ) : (
          trips.map((trip, index) => (
            <View key={index}>
              <Swipeable renderRightActions={() => renderRightActions(trip.id)}>
                <TouchableOpacity onPress={() => handleTripPress(trip)}>
                  <View style={styles.tripItem}>
                    <View style={styles.tripDetails}>
                      {trip.photoUrl ? (
                        <Image source={{ uri: trip.photoUrl }} style={styles.tripImage} />
                      ) : (
                        <View style={styles.tripImagePlaceholder} />
                      )}
                      <View style={styles.tripInfo}>
                        <View style={styles.daysLeftContainer}>
                          <Text style={styles.daysLeftText}>
                            {calculateDaysLeft(trip.start_date)}
                          </Text>
                        </View>
                        <Text
                          style={styles.tripDestination}
                          numberOfLines={2}
                          ellipsizeMode="tail"
                        >
                          {trip.location_name}
                        </Text>
                        <Text style={styles.tripDates}>
                          {`${formatDate(trip.start_date)} - ${formatDate(trip.end_date)}`}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </Swipeable>
              {index < trips.length - 1 && <View style={styles.tripSeparator} />}
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("PlannerNewTrip", { onAddTrip: handleAddTrip })
          }
          style={styles.addTripButton}
        >
          <Text style={styles.addTripButtonText}>+ Add Trip</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AIRandomiser")
          }}
          style={styles.randomButton}
        >
          <Text style={styles.randomButtonText}>🎲 Random</Text>
        </TouchableOpacity>
      </View>


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
  noTripsText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  tripListContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    paddingBottom: 70,
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  addTripButton: {
    backgroundColor: "#F47966",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 50,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  addTripButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  randomButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F47966",
  },
  randomButtonText: {
    fontSize: 18,
    color: "#F47966",
    fontWeight: "bold",
  },
  
  tripItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 5,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    elevation: 3,
  },
  tripSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tripDetails: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  daysLeftContainer: {
    backgroundColor: "#FFD4CD",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  daysLeftText: {
    color: "#FF512B",
    fontWeight: "600",
    fontSize: 12,
  },
  tripImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 15,
  },
  tripImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 5,
    backgroundColor: "#ddd",
    marginRight: 15,
  },
  tripInfo: {
    flex: 1,
  },
  tripDestination: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    flexShrink: 1,
  },
  tripDates: {
    fontSize: 16,
    color: "#666",
  },
  bottomButtonsContainer: {
    position: "absolute",
    bottom: 90,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    paddingHorizontal: 20,
  },
  deleteContainer: {
    backgroundColor: "#F47966",
    justifyContent: "center",
    width: 80,
    height: "80%",
    borderRadius: 5,
    marginTop: 13,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Planner;
