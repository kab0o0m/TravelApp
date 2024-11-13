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
              <Text style={styles.description}>
                {locationDetails.description}
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
  },
  closeButton: {
    backgroundColor: "#ccc",
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
