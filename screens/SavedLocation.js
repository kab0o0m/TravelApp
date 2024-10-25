import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
  Nunito_800ExtraBold_Italic,
  Nunito_400Regular_Italic,
} from "@expo-google-fonts/nunito";
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchSavedLocations } from "../api/locationAPI";
import BASE_URL from "../config";

const { width: screenWidth } = Dimensions.get("window");
const { height: screenHeight } = Dimensions.get("window");

SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from auto-hiding

const SavedLocation = () => {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_400Regular_Italic,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
    Nunito_800ExtraBold_Italic,
  });

  const navigation = useNavigation(); // Get the navigation object

  // State to track if each item is saved
  // State to store location data and save states
  const [locations, setLocations] = useState([]);
  const [savedItems, setSavedItems] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Hide the splash screen once fonts are loaded
    }
  }, [fontsLoaded]);

  // Fetch locations from API on component mount
  useEffect(() => {
    const loadLocations = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        const userData = JSON.parse(storedUserData);

        const user_id = userData.id;

        const data = await fetchSavedLocations(user_id);
        setLocations(data);

        const initialSavedItems = data.reduce((acc, location) => {
          acc[location.id] = true; // TODO: check with saved-location db
          return acc;
        }, {});
        setSavedItems(initialSavedItems);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
      }
    };
    loadLocations();
  }, []);

  // Function to toggle the save state for a specific item
  const toggleSave = (id) => {
    setSavedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  if (loading || !fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#006D77" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Image
              source={require("../assets/icons/BackArrow.png")}
              style={styles.arrowIcon}
            />
            <Text style={styles.backText}>Saved Locations</Text>
          </TouchableOpacity>
        </View>



        {/* Populate data from API */}

        <View style={styles.bottomContainer}>
          {locations.map((location) => (
            <View key={location.id} style={styles.infoContainer}>
              <View style={styles.infoHeader}>
                <Image
                  source={require("../assets/icons/LocationIcon.png")}
                  style={styles.icon}
                />
                <Text style={styles.infoTitle}>{location.location_name}</Text>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => toggleSave(location.id)}
                >
                  <Image
                    source={
                      savedItems[location.id]
                        ? require("../assets/icons/SavingIcon.png")
                        : require("../assets/icons/ToSave.png")
                    }
                    style={styles.saveIcon}
                  />
                  <Text style={styles.saveText}>
                    {savedItems[location.id] ? "Saved" : "Save"}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.contentContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.description}>{location.about}</Text>
                  <Text style={styles.notToBeMissedBold}>Not-to-be-Missed: </Text>
                  <Text style={styles.notToBeMissed}>{location.additional_info}</Text>
                  <View style={styles.rectangle} />
                </View>
                <Image
                  source={{ uri: `${BASE_URL}/api/assets/${location.img_url}` }}
                  style={styles.topPlacesImage}
                  />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
    backgroundColor: "white",
  },
  scrollViewContent: {
    flex: 1,
    paddingBottom: 20,
    marginHorizontal: 25,
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    position: "relative",
    marginBottom: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrowIcon: {
    width: 38,
    height: 38,
  },
  backText: {
    color: "#3A4646",
    fontSize: 24,
    fontFamily: "Nunito_700Bold",
    marginLeft: 12,
    top: 0.2,
  },
  header: {
    fontSize: 24,
    color: "white",
    fontFamily: "Nunito_900Black",
    position: "absolute",
    left: 291, // Set the x-coordinate
    top: 17, // Set the y-coordinate
    zIndex: 1,
  },
  headerImage: {
    width: screenWidth,
    height: 181,
    resizeMode: "cover",
  },

  popularContainer: {
    width: 351,
    height: 204.22,
    position: "relative",
    marginTop: -5,
    marginLeft: 21,
  },
  popularImage: {
    width: 351,
    height: 204.22,
    borderRadius: 30,
  },
  popularOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 30,
    zIndex: 1,
    // Shadow properties
    shadowColor: "#92B7DA",
    shadowOffset: { width: 1, height: 35 },
    shadowOpacity: 0.12, // 12% opacity
    shadowRadius: 83,
  },
  popularTitle: {
    position: "absolute",
    left: 17,
    top: 171,
    color: "white",
    fontSize: 18,
    fontFamily: "Nunito_800ExtraBold",
    zIndex: 2,
  },
  infoContainer: {
    marginHorizontal: 8,
    marginTop: 22,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 5,
    marginLeft: -1,
  },
  infoTitle: {
    color: "#006D77",
    fontSize: 18,
    fontFamily: "Nunito_700Bold",
  },
  saveButton: {
    marginLeft: "auto",
    backgroundColor: "#f47866",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
  },
  saveIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  saveText: {
    color: "white",
    fontSize: 12,
    fontFamily: "Nunito_800ExtraBold",
  },
  contentContainer: {
    flexDirection: "row",
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  description: {
    color: "#006D77",
    fontSize: 16,
    fontFamily: "Nunito_400Regular",
    marginBottom: 10,
    lineHeight: 18,
  },
  notToBeMissed: {
    color: "#006D77",
    fontSize: 12,
    lineHeight: 14,
    fontFamily: "Nunito_400Regular_Italic",
    marginBottom: 5,
    marginTop: 1,
  },
  notToBeMissedBold: {
    color: "#006D77",
    fontSize: 12,
    fontFamily: "Nunito_800ExtraBold_Italic",
  },
  rectangle: {
    width: 363,
    height: 2,
    backgroundColor: "#E6F1F2",
    marginTop: 14,
  },
  topPlacesImage: {
    width: 110,
    height: 110,
    borderRadius: 10,
    marginBottom: 15,
  },
});

export default SavedLocation; // Ensure the component is exported
