import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import LocationDetailsModal from "./LocationDetailsModal";
import axios from "axios";
import BASE_URL from "../config";
import { fetchWeatherData } from "../api/weather";
import { useNavigation, useRoute } from "@react-navigation/native";
import PlannerTabs from "../components/PlannerTabs";
import NavBar from "../components/NavBar";

const Button = ({
  title,
  onPress,
  backgroundColor = "#F47966",
  textColor = "#FFFFFF",
}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={[styles.button, { backgroundColor }]}>
      <Text style={{ color: textColor, textAlign: "center" }}>{title}</Text>
    </View>
  </TouchableWithoutFeedback>
);

const Explore = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { onPlaceSelect } = route.params || {}; // Destructure the callback from route params
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
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { destination } = route.params || {};

  const dismissKeyboard = () => Keyboard.dismiss();

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/places`, {
        params: { query: searchQuery },
      });
      const data = response.data;

      if (data && data.length > 0) {
        const location = data[0].geometry.location;
        const placeDetails = {
          title: data[0].name,
          description: data[0].formatted_address,
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
        setLocationDetails(placeDetails);

        // Fetch the weather data for the selected location
        await fetchWeatherDataForLocation(location.lat, location.lng);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        Alert.alert("No results found", "Please try a different location.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to search for the location");
      console.error("Error fetching location:", error);
      setIsLoading(false);
    }
  };

  const handlePlaceSelection = () => {
    if (onPlaceSelect) {
      onPlaceSelect({
        title: locationDetails.title,
        description: locationDetails.description,
        photoReference: locationDetails.photoReference,
      });
    }
    navigation.goBack(); // Return to PlannerOverview
  };

  const fetchWeatherDataForLocation = async (latitude, longitude) => {
    try {
      const result = await fetchWeatherData(latitude, longitude);
      setWeatherData(result.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData({
        area: "N/A",
        forecast: "N/A",
        timestamp: "N/A",
      });
    }
  };

  const openDetailsModal = () => {
    setModalVisible(true);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        {/* Use PlannerTabs with the destination and activeTab="Explore" */}
        <PlannerTabs destination={destination} activeTab="Explore" />

        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search for a location..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <Button title="Search" onPress={handleSearch} />
            </View>

            {/* Wrap MapView in a flex container with specific height */}
            <View style={styles.mapContainer}>
              <MapView style={styles.map} region={mapRegion}>
                {markerPosition && (
                  <Marker
                    coordinate={markerPosition}
                    title={locationDetails.title}
                    description={locationDetails.description}
                    onPress={openDetailsModal}
                  />
                )}
              </MapView>
            </View>

            <LocationDetailsModal
              visible={modalVisible}
              locationDetails={locationDetails}
              weatherData={weatherData}
              onClose={() => setModalVisible(false)}
              onAddToPlanner={handlePlaceSelection} // Use handlePlaceSelection to add to PlannerOverview
            />
          </>
        )}

        {/* NavBar at the bottom */}
        <NavBar />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  mapContainer: {
    flex: 1,
    height: "80%", // Adjust the height to leave space for the NavBar
  },
  map: { width: "100%", height: "100%" },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 25,
  },
});

export default Explore;
