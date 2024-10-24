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
import { useNavigation } from "@react-navigation/native";

const { width: screenWidth } = Dimensions.get("window");

// Sample list of recommendations (you can replace this with actual data or an API call)
const locations = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Congo (Democratic Republic of the Congo)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor (Timor-Leste)",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini (Swaziland)",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const LocationSearch = () => {
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
  });

  const [searchText, setSearchText] = useState(""); // State to track the input
  const [filteredLocations, setFilteredLocations] = useState([]); // State to store filtered recommendations
  const navigation = useNavigation();

  // Animated value to control the search bar position
  const searchBarY = useRef(new Animated.Value(100)).current; // Starts at Y offset of 100

  // This useEffect hook will animate the search bar to the top
  useEffect(() => {
    Animated.timing(searchBarY, {
      toValue: 0, // Move to the top (Y offset = 0)
      duration: 300, // Duration of animation in ms
      useNativeDriver: true,
    }).start();
  }, []);

  // Handle search input changes
  const handleSearchChange = (text) => {
    setSearchText(text);

    // Filter the locations based on the search text
    const filtered = locations.filter((location) =>
      location.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredLocations(filtered);
  };

  // Handle cross icon press to go back to home
  const handleClearSearch = () => {
    setSearchText(""); // Clear search input
    navigation.navigate("Home"); // Assuming your home screen is named 'Home'
  };

  // Handle navigation to LocationDetails screen with the selected location
  const handleLocationPress = (location) => {
    navigation.navigate("HomePopular", { location }); // Pass the location as a parameter
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
        <Image
          source={require("../assets/icons/Search.png")}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Discover a country"
          placeholderTextColor="#A9A9A9"
          value={searchText}
          onChangeText={handleSearchChange}
        />
        {/* Cross icon on the right of the search input */}
        <TouchableOpacity
          onPress={handleClearSearch}
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
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.recommendationItem}
                onPress={() => handleLocationPress(item)}
              >
                <Text style={styles.recommendationText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default LocationSearch;

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
    backgroundColor: "#E6F1F2",
    borderRadius: 20,
    padding: 10,
    boxShadow: "1px 35px 83px 1px rgba(146, 183, 218, 0.12)",
    alignItems: "center",
    marginHorizontal: 20,
    position: "absolute", // To allow it to animate from any Y position
    zIndex: 1, // Ensure it's above other content
    marginTop: 50,
  },
  searchIcon: {
    width: 25,
    height: 25,
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
  },
  crossIcon: {
    width: 38,
    height: 38,
  },
  recommendationsContainer: {
    marginTop: 80, // Position below the search bar
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
});
