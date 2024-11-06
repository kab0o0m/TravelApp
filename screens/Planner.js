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
      Alert.alert("Success", "Trip deleted successfully.");
    } catch (error) {
      console.error("Error deleting trip:", error);
      Alert.alert("Error", "Failed to delete trip.");
    }
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
    return isNaN(date.getTime()) ? "Invalid Date" : format(date, "dd/MM/yyyy");
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

      <ScrollView style={styles.tripListContainer}>
        {trips.length === 0 ? (
          <Text style={styles.noTripsText}>No trips added yet!</Text>
        ) : (
          trips.map((trip, index) => (
            <Swipeable
              key={index}
              renderRightActions={() => renderRightActions(trip.id)}
            >
              <TouchableOpacity onPress={() => handleTripPress(trip)}>
                <View style={styles.tripItem}>
                  <View style={styles.tripDetails}>
                    {trip.photoUrl ? (
                      <Image source={{ uri: trip.photoUrl }} style={styles.tripImage} />
                    ) : (
                      <View style={styles.tripImagePlaceholder} />
                    )}
                    <View style={styles.tripInfo}>
                      <Text
                        style={styles.tripDestination}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        {trip.location_name}
                      </Text>
                      <Text style={styles.tripDates}>
                        {`${formatDate(trip.start_date)} to ${formatDate(trip.end_date)}`}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Swipeable>
          ))
        )}
      </ScrollView>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PlannerNewTrip", { onAddTrip: handleAddTrip })
        }
        style={styles.addTripButton}
      >
        <Text style={styles.addTripButtonText}>+ Add Trip</Text>
      </TouchableOpacity>
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
    marginTop: 10,
    paddingBottom: 30,
    backgroundColor: "#fff",
  },
  noTripsText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  tripItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#F9F9F9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  tripDetails: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  tripImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 15,
  },
  tripImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ddd",
    marginRight: 15,
  },
  tripInfo: {
    flex: 1,
  },
  tripDestination: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    flexShrink: 1,
  },
  tripDates: {
    fontSize: 16,
    color: "#666",
  },
  addTripButton: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    backgroundColor: "#F47966",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  addTripButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
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
