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

const LocationDetailsModal = ({
  visible,
  locationDetails,
  weatherData,
  onClose,
}) => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchPhoto = async () => {
      if (locationDetails.photoReference) {
        try {
          const response = await fetch(
            `${BASE_URL}/api/place-photo?photo_reference=${locationDetails.photoReference}&maxwidth=400`
          );
          setPhotoUrl(response.url); // This will be the direct URL to display the photo
          console.log(response.url);
        } catch (error) {
          console.error("Error fetching place photo:", error);
        }
      }
    };

    if (visible) {
      fetchPhoto();
    } else {
      setPhotoUrl(null); // Reset photo URL when modal closes
    }
    setIsLoading(false);
  }, [visible, locationDetails.photoReference]);

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>{locationDetails.title}</Text>
            <Text style={styles.description}>
              {locationDetails.description}
            </Text>

            {/* Location Photo */}
            {photoUrl && (
              <Image source={{ uri: photoUrl }} style={styles.locationImage} />
            )}

            {/* Weather Data Section */}
            <View style={styles.weatherContainer}>
              <Text style={styles.weatherTitle}>Weather Forecast</Text>
              {weatherData ? (
                <>
                  <Text style={styles.weatherText}>
                    Area: {weatherData.area}
                  </Text>
                  <Text style={styles.weatherText}>
                    Forecast: {weatherData.forecast}
                  </Text>
                  <Text style={styles.weatherText}>
                    Last Updated:{" "}
                    {new Date(weatherData.timestamp).toLocaleString()}
                  </Text>
                </>
              ) : (
                <Text style={styles.weatherText}>
                  Weather data not available
                </Text>
              )}
            </View>

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 5, // Shadow for Android
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  locationImage: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  weatherContainer: {
    marginBottom: 20,
  },
  weatherTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  weatherText: {
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "#F47966",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default LocationDetailsModal;
