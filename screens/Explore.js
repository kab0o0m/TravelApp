import React, { useState, useEffect } from "react";
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
import {
  useFonts,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const Button = ({
  title,
  onPress,
  backgroundColor = "#F47966",
  textColor = "#FFFFFF",
}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={[styles.button, { backgroundColor }]}>
      <Text
        style={{
          color: textColor,
          textAlign: "center",
          fontFamily: "Nunito_700Bold",
        }}
      >
        {title}
      </Text>
    </View>
  </TouchableWithoutFeedback>
);

const Explore = () => {
  const route = useRoute();
  const { trip, onPlaceSelect } = route.params || {};
  const destination = trip?.location_name || "Unknown Destination";
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
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

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

        await fetchWeatherDataForLocation(location.lat, location.lng);
        setIsLoading(false);
        setModalVisible(true); // Automatically show the modal after search
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

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F47966" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <PlannerTabs trip={trip} activeTab="Explore" />
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#F47966" />
            <Text style={styles.loadingText}>Searching...</Text>
          </View>
        ) : (
          <>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search for a location..."
                placeholderTextColor="#A9A9A9"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <Button title="Search" onPress={handleSearch} />
            </View>

            <View style={styles.mapContainer}>
              <MapView style={styles.map} region={mapRegion}>
                {markerPosition && (
                  <Marker
                    coordinate={markerPosition}
                    title={locationDetails.title}
                    description={locationDetails.description}
                    onPress={() => setModalVisible(true)}
                  />
                )}
              </MapView>
            </View>

            <LocationDetailsModal
              visible={modalVisible}
              locationDetails={locationDetails}
              weatherData={weatherData}
              onClose={() => setModalVisible(false)}
              onAddToPlanner={() => {
                if (onPlaceSelect) {
                  onPlaceSelect(locationDetails);
                  navigation.goBack();
                }
              }}
            />
          </>
        )}
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
    fontFamily: "Nunito_600SemiBold",
  },
  mapContainer: {
    flex: 1,
    height: "80%",
  },
  map: { width: "100%", height: "100%" },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 25,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#666",
    fontFamily: "Nunito_700Bold",
  },
});

export default Explore;
