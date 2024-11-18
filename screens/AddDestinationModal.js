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

const AddDestinationModal = ({ visible, locationDetails, onClose, onAdd }) => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  useEffect(() => {
    const fetchPhoto = async () => {
      setIsLoading(true);
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

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F47966" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

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
              {/* Location Title */}
              <Text style={styles.title}>
                {locationDetails?.title || "No Title"}
              </Text>

              {/* Location Address and Description */}
              <Text style={styles.address}>
                {locationDetails?.address || "No address available"}
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
    fontFamily: "Nunito_800ExtraBold",
    marginBottom: 4,
    textAlign: "center",
    color: "#333",
  },
  address: {
    fontSize: 16,
    fontFamily: "Nunito_600SemiBold",
    color: "black",
    marginBottom: 8,
    textAlign: "center", // Aligns to the left
  },
  description: {
    fontSize: 16,
    fontFamily: "Nunito_600SemiBold",
    color: "#666",
    marginBottom: 20,
    textAlign: "justify", // Aligns to the left
  },
  locationImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  noImageText: {
    textAlign: "center",
    fontFamily: "Nunito_600SemiBold",
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
    fontFamily: "Nunito_700Bold",
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
    fontFamily: "Nunito_600SemiBold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: "Nunito_600SemiBold",
    color: "#666",
  },
});

export default AddDestinationModal;
