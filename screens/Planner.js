import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Toast from "react-native-toast-message";
import NavBar from "../components/NavBar";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import BASE_URL from "../config";
import { format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchUserData } from "../api/authAPI";
import { getPlacePhotoByPlaceId } from "../api/places";
import { deleteTripById } from "../api/tripsAPI";

const Planner = () => {
  const navigation = useNavigation();
  const [trips, setTrips] = useState([]);
  const [userId, setUserId] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    const loadUserId = async () => {
      try {
        let storedUserData = await AsyncStorage.getItem("userData");
        if (!storedUserData) {
          storedUserData = await fetchUserData();
          await AsyncStorage.setItem(
            "userData",
            JSON.stringify(storedUserData)
          );
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

  useFocusEffect(
    useCallback(() => {
      fetchTrips();
    }, [userId])
  );

  const fetchTrips = async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`${BASE_URL}/api/users/${userId}/trips`);
      const tripsWithPhotos = await Promise.all(
        response.data.map(async (trip) => {
          const placeDetails = await getPlacePhotoByPlaceId(trip.places_id);
          return { ...trip, photoUrl: placeDetails.photoUrl };

        })
      );
      setTrips(sortTrips(tripsWithPhotos));
    } catch (error) {
      console.error("Error loading trips:", error);
      Alert.alert("Error", "Failed to load trips.");
    }
  };

  const sortTrips = (trips) => {
    const today = new Date();
    return trips.sort((a, b) => {
      const isPastA = new Date(a.end_date) < today;
      const isPastB = new Date(b.end_date) < today;

      if (!isPastA && !isPastB) {
        return new Date(a.start_date) - new Date(b.start_date); // Upcoming trips
      } else if (isPastA && isPastB) {
        return new Date(b.end_date) - new Date(a.end_date); // Past trips
      } else {
        return isPastA ? 1 : -1; // Place upcoming before past
      }
    });
  };

  const confirmDeleteTrip = (tripId) => {
    Alert.alert(
      "Delete Confirmation",
      "Are you sure you want to delete this trip?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => handleDeleteTrip(tripId),
        },
      ]
    );
  };

  const handleDeleteTrip = async (tripId) => {
    try {
      await deleteTripById(tripId);
      setTrips(trips.filter((trip) => trip.id !== tripId));
      Toast.show({
        type: "error",
        text1: "Deleted",
        text2: "Trip deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting trip:", error);
      Alert.alert("Error", "Failed to delete trip.");
    }
  };

  const handleEditTrip = (tripId) => {
    setDropdownVisible(false);
    const tripToEdit = trips.find((trip) => trip.id === tripId);
    console.log("tripToEdit in handleEditTrip: ", tripToEdit);
    navigation.navigate("PlannerNewTrip", {
      selectedLocation: tripToEdit,
      mode: "edit",
    });
  };

  const handleMenuPress = (trip) => {
    setDropdownVisible((prev) => !prev || selectedTrip?.id !== trip.id);
    setSelectedTrip(trip);
  };

  const calculateDaysLeft = (startDate) => {
    const today = new Date();
    const daysLeft = Math.ceil(
      (new Date(startDate) - today) / (1000 * 3600 * 24)
    );

    if (daysLeft <= 0) return "Today";
    return daysLeft === 1 ? "1 day left" : `${daysLeft} days left`;
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return isNaN(date.getTime()) ? "Invalid Date" : format(date, "d MMM yyyy");
  };

  const renderRightActions = (tripId) => (
    <TouchableOpacity
      style={styles.deleteContainer}
      onPress={() => confirmDeleteTrip(tripId)}
    >
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  );

  const handleAddTrip = (newTrip) => {
    setTrips((prevTrips) => sortTrips([...prevTrips, newTrip]));
  };

  const handleTripPress = (trip) => {
    console.log("Navigating with trip:", trip);
    if (userId) {
      navigation.navigate("PlannerOverview", { trip: { ...trip, userId } });
    } else {
      console.warn("User ID is not available");
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setDropdownVisible(false);
        Keyboard.dismiss();
      }}
    >
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
                <TouchableOpacity onPress={() => handleTripPress(trip)}>
                  <View style={styles.tripItem}>
                    <View style={styles.tripDetails}>
                      {trip.photoUrl ? (
                        <Image
                          source={{ uri: trip.photoUrl }}
                          style={styles.tripImage}
                        />
                      ) : (
                        <View style={styles.tripImagePlaceholder} />
                      )}
                      <View style={styles.tripInfo}>
                        <View style={styles.daysLeftContainer}>
                          <Text style={styles.daysLeftText}>
                            {new Date(trip.end_date) < new Date()
                              ? "Past Trip"
                              : calculateDaysLeft(trip.start_date)}
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
                          {`${formatDate(trip.start_date)} - ${formatDate(
                            trip.end_date
                          )}`}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => handleMenuPress(trip)}
                        style={styles.menuIcon}
                      >
                        <Icon name="more-horiz" size={20} color="#333" />
                      </TouchableOpacity>
                    </View>
                    {dropdownVisible && selectedTrip?.id === trip.id && (
                      <View style={styles.dropdownMenu}>
                        <TouchableOpacity
                          onPress={() => handleEditTrip(trip.id)}
                          style={styles.dropdownItem}
                        >
                          <Text style={styles.dropdownItemText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => confirmDeleteTrip(trip.id)}
                          style={styles.dropdownItem}
                        >
                          <Text style={styles.dropdownItemText}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
                {index < trips.length - 1 && (
                  <View style={styles.tripSeparator} />
                )}
              </View>
            ))
          )}
        </ScrollView>

        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("PlannerNewTrip", {
                onAddTrip: handleAddTrip,
              })
            }
            style={styles.addTripButton}
          >
            <Text style={styles.addTripButtonText}>+ Add Trip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("AIRandomiser")}
            style={styles.randomButton}
          >
            <Text style={styles.randomButtonText}>🎲 Random</Text>
          </TouchableOpacity>
        </View>

        <NavBar />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  scrollViewContent: {
    paddingBottom: 70,
  },
  bottomButtonsContainer: {
    position: "absolute",
    bottom: 70,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    paddingHorizontal: 20,
  },
  addTripButton: {
    backgroundColor: "#F47966",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 50,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
    marginBottom: 40,
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
    marginBottom: 40,
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
    paddingHorizontal: 10,
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
  dropdownMenu: {
    position: "absolute",
    right: 40,
    top: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#333",
    elevation: 5,
    padding: 10,
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#F47966",
    padding: 8,
  },
  menuIcon: {
    position: "absolute",
    top: 10,
    right: 5,
  },
});

export default Planner;
