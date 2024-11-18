import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  Alert,
} from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import CustomCalendar from "../components/CustomCalendar"; // Import your CustomCalendar
import BASE_URL from "../config"; // Assuming BASE_URL is defined in a config file
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchUserData } from "../api/authAPI";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";
import * as SplashScreen from "expo-splash-screen";

const PlannerNewTrip = ({ route }) => {
  const navigation = useNavigation();
  const { onAddTrip, destination, placeId } = route.params || {};
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [tripDestination, setTripDestination] = useState(destination || ""); // Use destination from params
  const [locationId, setLocationId] = useState(placeId || ""); // Use placeId from params
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userId, setUserId] = useState(null); // State to store dynamic user ID

  const { selectedLocation, mode } = route.params || {};

  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (selectedLocation) {
      // setDestination(selectedLocation.title);
      setTripDestination(selectedLocation.location_name);
      setLocationId(selectedLocation.placeId); // Assuming placeId represents the location ID
      const formattedStartDate = formatDate(selectedLocation.start_date);
      const formattedEndDate = formatDate(selectedLocation.end_date);

      setSelectedDate(`${formattedStartDate} to ${formattedEndDate}`);
      setStartDate(formattedStartDate);
      setEndDate(formattedEndDate);
    }
  }, [selectedLocation]);

  // Fetch user ID from AsyncStorage or API
  useEffect(() => {
    const loadUserId = async () => {
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
      }
    };

    loadUserId();
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const openCalendar = () => setCalendarVisible(true);
  const closeCalendar = () => setCalendarVisible(false);

  const handleDateSelection = (start, end) => {
    setSelectedDate(`${start} to ${end}`);
    setStartDate(start);
    setEndDate(end);
    closeCalendar();
  };

  function formatDateToISO(dateStr) {
    // Split the input date string by "/"
    const [day, month, year] = dateStr.split("/");

    // Return the formatted date as "yyyy-mm-dd"
    return `${year}-${month}-${day}`;
  }

  const handleConfirmTrip = async () => {
    if (!userId) {
      Alert.alert("User ID Missing", "Failed to retrieve user ID.");
      return;
    }

    if (!tripDestination || !startDate || !endDate || !locationId) {
      Alert.alert("Incomplete Details", "Please fill in all details.");
      return;
    }

    const tripData = {
      places_id: locationId,
      location_name: tripDestination, // Use tripDestination directly as location name
      start_date: formatDateToISO(startDate),
      end_date: formatDateToISO(endDate),
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/api/users/${userId}/trips`,
        tripData
      );

      if (response.status === 201) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Trip created successfully.",
        });
        setTripDestination("");
        setLocationId("");
        setSelectedDate("");
        setStartDate("");
        setEndDate("");
        navigation.navigate("Planner");
      } else {
        console.log("Server response:", response.data);
      }
    } catch (error) {
      console.error("Error adding trip:", error);
      Alert.alert("Error", "Failed to add trip.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Left X Button */}
      <TouchableOpacity
        style={styles.exitButton}
        onPress={() => navigation.navigate("Planner")}
      >
        <Image source={require("../assets/icons/Cross.png")} />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Plan a new trip</Text>
        <Text style={styles.subheaderText}>Fill in the details below</Text>
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("PlannerAddDestination", {
              onLocationSelect: (location) => {
                setTripDestination(location.title);
                setLocationId(location.placeId); // Use placeId as locationId
              },
            })
          }
          style={styles.input}
        >
          <Text
            style={[
              styles.inputText,
              { color: tripDestination ? "#323232" : "#A9A9A9" },
            ]}
          >
            {tripDestination || "Where to?"}
          </Text>
        </TouchableOpacity>

        {/* Date Input Field */}
        <TouchableOpacity onPress={openCalendar} style={styles.input}>
          <Text
            style={[
              styles.inputText,
              { color: selectedDate ? "#323232" : "#A9A9A9" },
            ]}
          >
            {selectedDate || "Date?"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity
        onPress={handleConfirmTrip}
        style={styles.confirmButton}
      >
        <Text style={styles.confirmButtonText}>Confirm Trip</Text>
      </TouchableOpacity>

      {/* Calendar Modal */}
      <Modal visible={isCalendarVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <CustomCalendar onDateSelect={handleDateSelection} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  exitButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 80,
  },
  headerText: {
    fontSize: 32,
    fontFamily: "Nunito_800ExtraBold", // Nunito Extra Bold for the main header
    color: "#333",
  },
  subheaderText: {
    fontSize: 18,
    fontFamily: "Nunito_400Regular", // Nunito Regular for the subheader
    color: "#666",
    marginTop: 10,
  },
  inputContainer: {
    marginTop: 50,
  },
  input: {
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    height: 60,
  },
  inputText: {
    fontSize: 20,
    fontFamily: "Nunito_600SemiBold", // Nunito SemiBold for input text
  },
  confirmButton: {
    backgroundColor: "#F47966",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  confirmButtonText: {
    fontSize: 20,
    fontFamily: "Nunito_700Bold", // Nunito Bold for button text
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PlannerNewTrip;
