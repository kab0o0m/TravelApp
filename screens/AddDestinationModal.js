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
import BASE_URL from "../config"; // Ensure this points to your backend URL

const AddDestinationModal = ({ visible, locationDetails, onClose, onAdd }) => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPhoto = async () => {
      setIsLoading(true); // Start loading
      if (locationDetails?.photoReference) {
        try {
          const response = await fetch(
            `${BASE_URL}/api/place-details?photo_reference=${locationDetails.photoReference}&maxwidth=400`
          );
          setPhotoUrl(response.url); // This will be the direct URL to display the photo
        } catch (error) {
          console.error("Error fetching place photo:", error);
        }
      } else {
        setPhotoUrl(null); // No photo reference available
      }
      setIsLoading(false); // Stop loading
    };

    if (visible) {
      fetchPhoto();
    } else {
      setPhotoUrl(null); // Reset photo URL when modal closes
      setIsLoading(false); // Ensure loading state is reset
    }
  }, [visible, locationDetails?.photoReference]);

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
              {/* Location Title and Description */}
              <Text style={styles.title}>
                {locationDetails?.title || "No Title"}
              </Text>
              <Text style={styles.description}>
                {locationDetails?.description || "No description available"}
              </Text>

              {/* Location Photo */}
              {photoUrl ? (
                <Image
                  source={{ uri: photoUrl }}
                  style={styles.locationImage}
                />
              ) : (
                <Text style={styles.noImageText}>No Image Available</Text>
              )}

              {/* Add and Close Buttons */}
              <TouchableOpacity onPress={onAdd} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add</Text>
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
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  locationImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  noImageText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#F47966",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "black",
    fontSize: 16,
  },
});

export default AddDestinationModal;
