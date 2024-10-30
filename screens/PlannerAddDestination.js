import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AddLDestinationModal from "./AddDestinationModal";
import axios from "axios";
import BASE_URL from "../config"; // Ensure this points to your backend URL
import Footer from "../components/Footer";

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

const PlannerAddDestination = () => {
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

  const dismissKeyboard = () => Keyboard.dismiss();

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
      } else {
        Alert.alert("No results found", "Please try a different location.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to search for the location");
      console.error("Error fetching location:", error);
    }
  };

  const openDetailsModal = () => {
    setModalVisible(true);
  };

  const closeDetailsModal = () => {
    setModalVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for a location..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Button title="Search" onPress={handleSearch} />
        </View>

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

        <AddLocationModal
          visible={modalVisible}
          locationDetails={locationDetails}
          onClose={closeDetailsModal}
        />
      </View>

      <View style={styles.footerContainer}>
        <Footer />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 32,
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
  map: { width: "100%", height: "100%" },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 25,
  },
  /*footerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },*/
});

export default PlannerAddDestination;
