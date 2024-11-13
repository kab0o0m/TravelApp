import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Alert,
} from "react-native";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import PlannerTabs from "../components/PlannerTabs";
import NavBar from "../components/NavBar";
import { Swipeable } from "react-native-gesture-handler";
import {
  getPlacePhotoByPlaceId,
  createPlaceInTrip,
  deletePlaceById,
} from "../api/places";
import axios from "axios";
import BASE_URL from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchUserData } from "../api/authAPI";

const PlannerOverview = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { trip } = route.params || {};
  const destination = trip?.location_name || "Unknown Destination";

  // Directly set `userId` from `trip` data, or initialize it as null if not available
  const [userId, setUserId] = useState(trip?.userId || trip?.user_id || null);
  const [places, setPlaces] = useState([]);

  // console.log("Received trip data:", trip);
  console.log("Extracted userId:", userId);

  const [notes, setNotes] = useState("");
  const [tempNotes, setTempNotes] = useState("");
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [isPlacesOpen, setIsPlacesOpen] = useState(false);
  const [titles, setTitles] = useState(["Untitled"]);
  const [isAddTitleOpen, setIsAddTitleOpen] = useState(false);

  const toggleNotes = () => {
    setIsNotesOpen(!isNotesOpen);
    if (!isNotesOpen) {
      setTempNotes(notes);
    }
  };

  const handleDoneNotes = () => {
    setNotes(tempNotes);
    setIsEditingNotes(false);
  };

  useEffect(() => {
    const loadUserId = async () => {
      if (userId) return; // Skip loading if userId is already set

      try {
        let storedUserData = await AsyncStorage.getItem("userData");
        if (!storedUserData) {
          console.log("Fetching user data...");
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
  }, [userId]);

  const fetchPlaces = async () => {
    if (!userId || !trip?.id) {
      console.warn("Warning: Missing userId or trip data.");
      return;
    }
    try {
      const response = await axios.get(
        `${BASE_URL}/api/users/${userId}/${trip.id}/places`
      );

      const placesWithPhotos = await Promise.all(
        response.data.map(async (place) => {
          const placeDetails = await getPlacePhotoByPlaceId(place.places_id);

          return {
            id: place.id,
            location_name: placeDetails.placeDetails.name || "Unknown Location",
            description: placeDetails.placeDetails.formatted_address || "No description available",
            photoUrl: placeDetails.photoUrl,
          };
        })
      );
      setPlaces(placesWithPhotos);
    } catch (error) {
      console.error("Error fetching places:", error);
      Alert.alert("Error", "Failed to load places.");
    }
  };

  useEffect(() => {
  }, [places]);

  useFocusEffect(
    useCallback(() => {
      fetchPlaces();
    }, [userId, trip])
  );

  const handlePlaceSelect = async (place) => {
    console.log("Handling place selection:", place); // Debug log
    try {
      const placeId = place.placeId;
      await createPlaceInTrip(userId, trip.id, { placeId });

      const newPlace = {
        id: placeId, // Use `placeId` as unique ID
        location_name: place.location_name,
        description: place.description,
        photoUrl: place.photoUrl || "https://via.placeholder.com/150",
      };

      setPlaces((prevPlaces) => [...prevPlaces, newPlace]);
      Alert.alert("Success", "Place added to trip!");
    } catch (error) {
      console.error("Error handling place selection:", error);
      Alert.alert("Error", "Failed to add place to trip.");
    }
  };

  const navigateToExplore = () => {
    navigation.navigate("Explore", {
      trip,
      onPlaceSelect: handlePlaceSelect,
    });
  };

  const handleDeletePlace = async (placeId) => {
    try {
      console.log("Attempting to delete place with id:", placeId);
      await deletePlaceById(placeId);
      setPlaces((prevPlaces) =>
        prevPlaces.filter((place) => place.id !== placeId)
      );
      Alert.alert("Deleted", "Place deleted successfully.");
    } catch (error) {
      console.error("Error deleting place:", error);
      Alert.alert("Error", "Failed to delete place.");
    }
  };

  const renderRightActions = (placeId) => (
    <TouchableOpacity
      style={styles.deleteContainer}
      onPress={() => handleDeletePlace(placeId)}
    >
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  );

  const addNewTitleSection = () => {
    setTitles([...titles, "Untitled"]);
  };

  return (
    <View style={styles.container}>
      <PlannerTabs destination={destination} activeTab="Overview" />

      <ScrollView style={styles.contentContainer}>
        <TouchableOpacity
          onPress={toggleNotes}
          style={styles.sectionHeaderContainer}
        >
          <AntDesign
            name={isNotesOpen ? "up" : "down"}
            size={16}
            color="black"
          />
          <Text style={styles.sectionHeader}>Notes</Text>
        </TouchableOpacity>
        {isNotesOpen && (
          <View>
            {isEditingNotes ? (
              <View>
                <TextInput
                  style={styles.sectionContentInput}
                  placeholder="Write or paste general notes here, e.g., how to get there"
                  value={tempNotes}
                  onChangeText={setTempNotes}
                  multiline
                />
                <TouchableOpacity
                  onPress={handleDoneNotes}
                  style={styles.doneButton}
                >
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setIsEditingNotes(true);
                  setTempNotes(notes);
                }}
              >
                <Text style={styles.notesDisplay}>
                  {notes || "No notes added"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <TouchableOpacity
          onPress={() => setIsPlacesOpen(!isPlacesOpen)}
          style={styles.sectionHeaderContainer}
        >
          <AntDesign
            name={isPlacesOpen ? "up" : "down"}
            size={16}
            color="black"
          />
          <Text style={styles.sectionHeader}>Places to visit</Text>
        </TouchableOpacity>
        {isPlacesOpen && (
          <View>
            {places.length === 0 ? (
              <Text style={styles.noPlacesText}>No places added yet.</Text>
            ) : (
              places.map((place, index) => (
                <View key={index}>
                  <Swipeable
                    key={index}
                    renderRightActions={() => renderRightActions(place.id)}
                  >
                    <View style={styles.placeItem}>
                      <Image
                        source={{
                          uri:
                            place.photoUrl || "https://via.placeholder.com/150",
                        }}
                        style={styles.placeImage}
                      />
                      <View style={styles.placeInfo}>
                        <Text style={styles.placeTitle}>
                          {place.location_name}
                        </Text>
                        <Text style={styles.placeDescription}>
                          {place.description}
                        </Text>
                      </View>
                    </View>
                  </Swipeable>
                </View>
              ))
            )}
            <TouchableOpacity
              onPress={navigateToExplore}
              style={styles.addPlaceInput}
            >
              <Text style={styles.addPlaceInputText}>Add a place</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  contentContainer: { paddingHorizontal: 20, paddingVertical: 10 },
  sectionHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionHeader: { fontSize: 18, fontWeight: "bold", paddingLeft: 10 },
  sectionContentInput: {
    padding: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
    backgroundColor: "#f9f9f9",
  },
  doneButton: {
    alignSelf: "flex-end",
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "#FF7043",
    borderRadius: 5,
  },
  doneButtonText: { color: "#fff" },
  notesDisplay: { padding: 10, color: "#666", fontStyle: "italic" },
  addPlaceInput: {
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },
  addPlaceInputText: { fontSize: 16, color: "#9CA3AF" },
  placeItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  placeImage: { width: 50, height: 50, borderRadius: 8, marginRight: 10 },
  placeInfo: { flex: 1 },
  placeTitle: { fontWeight: "bold", fontSize: 16 },
  placeDescription: { color: "#666", marginTop: 2 },
  newListButton: {
    backgroundColor: "#FF7043",
    borderRadius: 8,
    alignItems: "center",
    padding: 10,
    marginVertical: 20,
  },
  newListButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  deleteContainer: {
    backgroundColor: "#F47966",
    justifyContent: "center",
    width: 80,
    height: "80%",
    borderRadius: 5,
    marginTop: 13,
    alignItems: "center",
  },
  deleteButtonText: { color: "#fff", fontWeight: "bold" },
});

export default PlannerOverview;
