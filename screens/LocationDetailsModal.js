import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import BASE_URL from "../config";
import {
  useFonts,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const LocationDetailsModal = ({
  visible,
  locationDetails,
  weatherData,
  onClose,
  onAddToPlanner,
}) => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchPhoto = async () => {
      if (locationDetails?.photoReference) {
        try {
          const response = await fetch(
            `${BASE_URL}/api/place-photo?photo_reference=${locationDetails.photoReference}&maxwidth=400`
          );
          setPhotoUrl(response.url);
        } catch (error) {
          console.error("Error fetching place photo:", error);
        }
      } else {
        setPhotoUrl(null);
      }
      setIsLoading(false);
    };

    if (visible) {
      fetchPhoto();
    } else {
      setPhotoUrl(null);
      setIsLoading(false);
    }
  }, [visible, locationDetails?.photoReference]);

  const handleAddToPlanner = () => {
    onAddToPlanner(locationDetails); // Pass the location details to the callback
    onClose(); // Close the modal after adding to planner
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#F47966" />
          ) : (
            <>
              <Text style={styles.title}>{locationDetails.title}</Text>
              <Text style={styles.address}>
                {locationDetails.description || "No address available"}
              </Text>

              {/* Location Photo */}
              {photoUrl && (
                <Image
                  source={{ uri: photoUrl }}
                  style={styles.locationImage}
                />
              )}

              {/* Weather Data Section */}
              <View style={styles.weatherContainer}>
                {weatherData ? (
                  <Text style={styles.weatherText}>
                    Forecast: {weatherData.forecast || "N/A"}
                    {"\n"}
                    Last Updated:{" "}
                    {weatherData.timestamp
                      ? new Date(weatherData.timestamp).toLocaleString()
                      : "N/A"}
                  </Text>
                ) : (
                  <Text style={styles.weatherText}>
                    Weather data not available
                  </Text>
                )}
              </View>

              {/* Add to Planner Button */}
              <TouchableOpacity
                onPress={handleAddToPlanner} // Corrected function call
                style={styles.addButton}
              >
                <Text style={styles.addButtonText}>Add to Planner</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontFamily: "Nunito_800ExtraBold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  address: {
    fontSize: 16,
    fontFamily: "Nunito_600SemiBold",
    color: "black",
    marginBottom: 15,
    textAlign: "center",
  },
  locationImage: {
    width: "100%",
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
  },
  weatherText: {
    fontSize: 16,
    fontFamily: "Nunito_600SemiBold",
    color: "#444",
    textAlign: "left",
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#F47966",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Nunito_700Bold",
  },
  closeButton: {
    backgroundColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#333",
    fontSize: 16,
    fontFamily: "Nunito_600SemiBold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LocationDetailsModal;
