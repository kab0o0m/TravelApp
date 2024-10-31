import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  ActivityIndicator,
  Linking,
  Animated,
} from "react-native";
import { useFonts, Nunito_600SemiBold } from "@expo-google-fonts/nunito";
import { fetchLocations } from "../api/locationAPI.js";

const { width: screenWidth } = Dimensions.get("window");


const placeholderLocations = [
  { id: 1, location_name: "[offline] Eiffel Tower" },
  { id: 2, location_name: "[offline] Statue of Liberty" },
  { id: 3, location_name: "[offline] Great Wall of China" },
  { id: 4, location_name: "[offline] Sydney Opera House" },
  { id: 5, location_name: "[offline] Colosseum" },
  { id: 6, location_name: "[offline] Machu Picchu" },
  { id: 7, location_name: "[offline] Mount Fuji" },
  { id: 8, location_name: "[offline] Taj Mahal" },
  { id: 9, location_name: "[offline] Christ the Redeemer" },
  { id: 10, location_name: "[offline] Buckingham Palace" },
];


const PlannerLocationSearchbar = ({ onClose, onLocationSelect }) => {
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
  });

  const [searchText, setSearchText] = useState(""); // State to track the input
  const [filteredLocations, setFilteredLocations] = useState([]); // State to store filtered recommendations
  const [locations, setLocations] = useState([]); // Store fetched locations
  const [usePlaceholder, setUsePlaceholder] = useState(false); // Track whether to use placeholder

  // Animated value to control the search bar position
  const searchBarY = useRef(new Animated.Value(200)).current; // Starts at Y offset of 100

  // This useEffect hook will animate the search bar to the top
  useEffect(() => {
    const fetchLocationsFromAPI = async () => {
      try {
        const locationData = await fetchLocations();
        setLocations(locationData); // Update locations array with API response
        setUsePlaceholder(false);  // We successfully fetched the data
      } catch (error) {
        console.error("Error fetching locations:", error);
        setLocations(placeholderLocations); // Use placeholder data if there is an error
        setUsePlaceholder(true); // Indicate that we are using the placeholder
      }
    };

    fetchLocationsFromAPI();

    Animated.timing(searchBarY, {
      toValue: 0, // Move to the top (Y offset = 0)
      duration: 200, // Duration of animation in ms
      useNativeDriver: true,
    }).start();
  }, []);

  // Handle search input changes
  const handleSearchChange = (text) => {
    setSearchText(text);

    // Filter the locations based on the search text
    const filtered = locations.filter((location) =>
      location.location_name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredLocations(filtered);
  };

  // Handle cross icon press to go back to home
  const handleClearSearch = (isExit) => {
    setSearchText(""); // Clear search input
    if (isExit) onClose(); // Close the modal instead of navigating
  };

  // Handle navigation to LocationDetails screen with the selected location
  const handleLocationPress = (location) => {
    onLocationSelect(location); // set the location
  };
  

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Animated view for the search bar */}
      <Animated.View
        style={[
          styles.searchContainer,
          { transform: [{ translateY: searchBarY }] },
        ]}
      >
        <TouchableOpacity
          onPress={() => handleClearSearch(true)}
        >
          <Image
            source={require("../assets/icons/BackArrow.png")}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search a place"
          placeholderTextColor="#A9A9A9"
          value={searchText}
          onChangeText={handleSearchChange}
        />
        {/* Cross icon on the right of the search input */}
        <TouchableOpacity
          onPress={() => handleClearSearch(false)}
          style={styles.crossIconContainer}
        >
          <Image
            source={require("../assets/icons/Cross.png")}
            style={styles.crossIcon}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* Display filtered recommendations */}
      {searchText.length > 0 && filteredLocations.length > 0 && (
        <View style={styles.recommendationsContainer}>
          <FlatList
            data={filteredLocations}
            keyExtractor={(item) => item.id.toString()} // Use the `id` as the key, convert to string if needed
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.recommendationItem}
                onPress={() => handleLocationPress(item)}
              >
                <Text style={styles.recommendationText}>{item.location_name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* Display a message if using placeholder data */}
      {usePlaceholder && (
        <Text style={styles.offlineText}>
          You are not connected to the Server. Viewing placeholder data
        </Text>
      )}
    </View>
  );
};

export default PlannerLocationSearchbar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 50, // Add some top padding for the animation
  },
  searchContainer: {
    width: screenWidth - 40,
    height: 61,
    flexDirection: "row",
    backgroundColor: "#F4EFEF",
    borderRadius: 10,
    padding: 10,
    boxShadow: "1px 35px 83px 1px rgba(146, 183, 218, 0.12)",
    alignItems: "center",
    marginHorizontal: 20,
    position: "absolute", // To allow it to animate from any Y position
    zIndex: 1, // Ensure it's above other content
  },
  searchIcon: {
    width: 35,
    height: 35,
    marginRight: 12,
    marginLeft: 10,
  },
  searchInput: {
    color: "#006D77",
    fontSize: 20,
    fontFamily: "Nunito_600SemiBold",
    fontWeight: "600",
    flex: 1,
  },
  crossIconContainer: {
    paddingLeft: 10,
    marginRight: 5,
  },
  crossIcon: {
    width: 35,
    height: 35,
  },
  recommendationsContainer: {
    marginTop: 25, // Position below the search bar
    marginHorizontal: 20,
  },
  recommendationItem: {
    backgroundColor: "#FFF",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E6F1F2",
  },
  recommendationText: {
    fontSize: 18,
    color: "#006D77",
    fontFamily: "Nunito_600SemiBold",
  },
  offlineText: {
    marginTop: 350,
    marginHorizontal: 10,
    textAlign: "center",
    color: "#FF0000",
    fontSize: 16,
  },
});
