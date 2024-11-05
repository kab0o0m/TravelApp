import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Image,
  Alert
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import AddDestinationModal from "./AddDestinationModal";
import axios from "axios";
import BASE_URL from "../config";
import NavBar from "../components/NavBar";
import { useNavigation } from "@react-navigation/native";

const PlannerAddDestination = ({ route }) => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [mapRegion, setMapRegion] = useState({
    latitude: 1.3521,
    longitude: 103.8198,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markerPosition, setMarkerPosition] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [locationDetails, setLocationDetails] = useState({});

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/places`, {
        params: { query: searchQuery },
      });
      const data = response.data;

      if (data && data.length > 0) {
        const location = data[0].geometry.location;
        const placeDetails = {
          title: data[0].name,
          address: data[0].formatted_address,
          placeId: data[0].place_id,
          photoReference: data[0].photos
            ? data[0].photos[0].photo_reference
            : null,
        };

        setMapRegion({
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setMarkerPosition({ latitude: location.lat, longitude: location.lng });

        const detailsResponse = await axios.get(
          `${BASE_URL}/api/place-details`,
          {
            params: { place_id: placeDetails.placeId },
          }
        );

        setLocationDetails({
          ...placeDetails,
          description:
            detailsResponse.data.description ||
            "No additional description available",
        });
      } else {
        Alert.alert("No results found", "Please try a different location.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to search for the location");
      console.error("Error fetching location:", error);
    }
  };

  const handleAddLocation = () => {
    const onLocationSelect = route.params?.onLocationSelect;
    if (onLocationSelect) {
      onLocationSelect(locationDetails);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Exit Button */}
      <TouchableOpacity
        style={styles.exitButton}
        onPress={() => navigation.goBack()}
      >
        <Image source={require("../assets/icons/Cross.png")} />
      </TouchableOpacity>

      {/* Search Bar and Search Button */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a location..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Map View */}
      <MapView style={styles.map} region={mapRegion}>
        {markerPosition && (
          <Marker
            coordinate={markerPosition}
            title={locationDetails.title}
            description={locationDetails.address}
            onPress={() => setModalVisible(true)}
          />
        )}
      </MapView>

      {/* Add Destination Modal */}
      <AddDestinationModal
        visible={modalVisible}
        locationDetails={locationDetails}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddLocation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  exitButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10, // Ensure it stays on top of other components
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginTop: 60, // Space for the exit button at the top
  },
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  map: { width: "100%", height: "100%" },
  button: {
    backgroundColor: "#F47966",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default PlannerAddDestination;
