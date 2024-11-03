import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Toast from "react-native-toast-message";
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
import {
  removeSavedLocation,
  addSavedLocation,
} from "../api/locationAPI";
import { fetchSublocationsByLocationId } from "../api/subLocationsAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../config";

const { width: screenWidth } = Dimensions.get("window");

const HomePopular = ({ route }) => {
  const locationId = route.params?.locationId || 1;
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_400Regular_Italic,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
    Nunito_800ExtraBold_Italic,
  });

  const navigation = useNavigation();
  const [savedItems, setSavedItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [skipConfirmation, setSkipConfirmation] = useState(false);
  const [subLocations, setSublocations] = useState([]);
  
  const Images = {
    "spectra.png": require("../assets/sublocations/spectra.png"),
    "shoppes.png": require("../assets/sublocations/shoppes.png"),
    "fountainofwealth.png": require("../assets/sublocations/fountainofwealth.png"),
    "esplanademall.png": require("../assets/sublocations/esplanademall.png"),
    "theatresonthebay.png": require("../assets/sublocations/theatresonthebay.png"),
    "esplanadepark.png": require("../assets/sublocations/esplanadepark.png"),
    "jurassicmile.png": require("../assets/sublocations/jurassicmile.png"),
    "passionwave.png": require("../assets/sublocations/passionwave.png"),
    "yogainc.png": require("../assets/sublocations/yogainc.png"),
    "thrillingrides.png": require("../assets/sublocations/thrillingrides.png"),
    "showsandentertainment.png": require("../assets/sublocations/showsandentertainment.png"),
    "meetandgreet.png": require("../assets/sublocations/meetandgreet.png"),
  };

  useEffect(() => {
    const fetchSublocations = async () => {
      try {
        const data = await fetchSublocationsByLocationId(locationId);
        setSublocations(data);
      } catch (error) {
        console.error("Error fetching sublocations:", error);
        Alert.alert("Error", "There was a problem loading sublocations.");
      } finally {
        setLoading(false);
      }
    };
    fetchSublocations();
  }, [locationId]);

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  const toggleSave = async (location_id) => {
    const userId = await AsyncStorage.getItem("userData");
    const user = JSON.parse(userId);

    if (!user?.id) {
      Alert.alert("User ID missing", "Unable to find user information.");
      return;
    }

    const updateSaveStatus = async (status) => {
      setSavedItems((prevState) => ({ ...prevState, [location_id]: status }));
      const action = status ? addSavedLocation : removeSavedLocation;
      const toastMessage = status ? "saved to" : "removed from";
      try {
        await action(user.id, location_id);
        Toast.show({
          type: status ? "success" : "error",
          text1: status ? "Saved" : "Removed",
          text2: `Location has been ${toastMessage} your list.`,
          position: "bottom",
        });
      } catch (error) {
        console.error(`Error ${status ? "saving" : "removing"} location:`, error);
        Alert.alert("Error", `There was a problem ${status ? "saving" : "removing"} the location.`);
        setSavedItems((prevState) => ({ ...prevState, [location_id]: !status }));
      }
    };

    if (savedItems[location_id]) {
      if (skipConfirmation) {
        await updateSaveStatus(false);
      } else {
        Alert.alert("Remove from Saved Locations", "Are you sure?", [
          { text: "Cancel", style: "cancel" },
          {
            text: "Don't show again",
            onPress: async () => {
              setSkipConfirmation(true);
              await AsyncStorage.setItem("skipConfirmation", "true");
              await updateSaveStatus(false);
            },
          },
          { text: "Remove", onPress: () => updateSaveStatus(false), style: "destructive" },
        ]);
      }
    } else {
      await updateSaveStatus(true);
    }
  };

  const renderImage = (imgUrl) => {
    return imgUrl in Images ? Images[imgUrl] : { uri: `${BASE_URL}/api/assets/${imgUrl}` };
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.topContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate("Home")}
            >
              <Image source={require("../assets/icons/BackArrow.png")} style={styles.arrowIcon} />
              <Text style={styles.backText}>BACK</Text>
            </TouchableOpacity>
            <Text style={styles.header}>Mapp!t</Text>
            <Image source={require("../assets/images/HomePageBGWaves.png")} style={styles.headerImage} />
          </View>
          <View style={styles.popularContainer}>
            <Image source={require("../assets/images/TopPlacesSGBG.png")} style={styles.popularImage} />
            <LinearGradient colors={["#FFFFFF00", "rgba(0, 0, 0, 0.4)"]} style={styles.popularOverlay} />
            <Text style={styles.popularTitle}>Top Places to Visit</Text>
          </View>
        </View>
        {loading ? (
          <View style={styles.noLocationsContainer}>
            <Text style={styles.noLocationsText}>Loading...</Text>
          </View>
        ) : (
          <View style={styles.bottomContainer}>
            {subLocations.map((subLocation) => (
              <View key={subLocation.id} style={styles.infoContainer}>
                <View style={styles.infoHeader}>
                  <Image source={require("../assets/icons/LocationIcon.png")} style={styles.icon} />
                  <Text style={styles.infoTitle}>{subLocation.location_name}</Text>
                  <TouchableOpacity style={styles.saveButton} onPress={() => toggleSave(subLocation.id)}>
                    <Image
                      source={savedItems[subLocation.id] ? require("../assets/icons/SavingIcon.png") : require("../assets/icons/ToSave.png")}
                      style={styles.saveIcon}
                    />
                    <Text style={styles.saveText}>{savedItems[subLocation.id] ? "Saved" : "Save"}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.contentContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.description}>{subLocation.about}</Text>
                    <Text style={styles.notToBeMissedBold}>Not-to-be-Missed:</Text>
                    <Text style={styles.notToBeMissed}>{subLocation.additional_info}</Text>
                    <View style={styles.rectangle} />
                  </View>
                  <Image source={renderImage(subLocation.img_url)} style={styles.topPlacesImage} />
                </View>
              </View>
            ))}
          </View>
        )}
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
    paddingBottom: 20,
  },
  topContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    marginHorizontal: 25,
  },
  noLocationsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  noLocationsText: {
    fontSize: 18,
    color: "#006D77",
    fontFamily: "Nunito_700Bold",
  },
  headerContainer: {
    position: "relative",
    marginBottom: 10,
  },
  backButton: {
    position: "absolute",
    left: 30,
    top: 130,
    zIndex: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  arrowIcon: {
    width: 35,
    height: 35,
  },
  backText: {
    color: "#3A4646",
    fontSize: 16,
    fontFamily: "Nunito_700Bold",
    marginLeft: 10,
  },
  header: {
    fontSize: 24,
    color: "white",
    fontFamily: "Nunito_900Black",
    position: "absolute",
    left: 291,
    top: 17,
    zIndex: 1,
  },
  headerImage: {
    width: screenWidth,
    height: 181,
    resizeMode: "cover",
  },
  popularContainer: {
    width: 351,
    height: 204,
    position: "relative",
    marginBottom: 15,
  },
  popularImage: {
    width: 351,
    height: 204,
    borderRadius: 30,
  },
  popularOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 30,
    zIndex: 1,
    shadowColor: "#92B7DA",
    shadowOffset: { width: 1, height: 35 },
    shadowOpacity: 0.12,
    shadowRadius: 83,
  },
  popularTitle: {
    position: "absolute",
    left: 17,
    top: 171,
    color: "white",
    fontSize: 18,
    fontFamily: "Nunito_800ExtraBold",
    fontWeight: '800',
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

export default HomePopular;
