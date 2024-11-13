import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  Animated,
  Alert,
} from "react-native";
import {
  useFonts,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
} from "@expo-google-fonts/nunito";
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import BASE_URL from "../config";

const { width: screenWidth } = Dimensions.get("window");

SplashScreen.preventAutoHideAsync();

const AIRandomiser = () => {
  const [fontsLoaded] = useFonts({
    Nunito_900Black,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  const [showMessage, setShowMessage] = useState(false);
  const [locationName, setLocationName] = useState("Marina Bay Sands"); // Default location name
  const [activities, setActivities] = useState([]);
  const [locationId, setLocationId] = useState(null); // Store location ID to fetch sublocations

  const navigation = useNavigation();

  const cup1Anim = useRef(new Animated.Value(0)).current;
  const cup2Anim = useRef(new Animated.Value(0)).current;
  const cup3Anim = useRef(new Animated.Value(0)).current;
  const frogAnim = useRef(new Animated.Value(0)).current;

  const frogAnimationRef = useRef(null);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    startFrogAnimation();
    return () => frogAnimationRef.current.stop();
  }, []);

  const startFrogAnimation = () => {
    frogAnimationRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(frogAnim, {
          toValue: -20,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(frogAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    );
    frogAnimationRef.current.start();
  };

  const fetchRandomLocation = async () => {
    console.log("Fetching random location...");
    try {
      const response = await axios.get(`${BASE_URL}/api/locations/random`);
      if (response.data && response.data.location_name && response.data.id) {
        setLocationName(response.data.location_name);
        setLocationId(response.data.id); // Store the location ID for sublocation fetch
        await fetchSublocations(response.data.id); // Fetch related sublocations as activities
      } else {
        Alert.alert("Error", "Failed to fetch random location.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch random location.");
      console.error("Error fetching random location:", error);
    }
  };

  const fetchSublocations = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/sublocations/${id}`);
      if (response.data) {
        setActivities(
          response.data.map((sublocation) => sublocation.location_name)
        );
      }
    } catch (error) {
      console.error("Error fetching sublocations:", error);
    }
  };

  const animateCups = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(cup1Anim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(cup2Anim, {
          toValue: -1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(cup2Anim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(cup3Anim, {
          toValue: -1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(cup1Anim, {
          toValue: -1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(cup3Anim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(cup1Anim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(cup2Anim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(cup3Anim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start(async () => {
      await fetchRandomLocation(); // Fetch random location after animation
      console.log("Setting showMessage to true");
      setShowMessage(true); // Show message after animation and fetch
    });
  };

  const handleShuffle = () => {
    setShowMessage(false);
    if (frogAnimationRef.current) {
      frogAnimationRef.current.stop();
      frogAnim.setValue(0);
    }
    animateCups();
  };

  const handleCancel = () => {
    setShowMessage(false);
    startFrogAnimation();
  };

  const navigateToPlannerNewTrip = () => {
    navigation.navigate("PlannerNewTrip", { destination: locationName });
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#006D77" />
      </View>
    );
  }

  const cup1Style = {
    transform: [
      {
        translateX: cup1Anim.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [100, 0, -100],
        }),
      },
    ],
  };

  const cup2Style = {
    transform: [
      {
        translateX: cup2Anim.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [100, 0, -100],
        }),
      },
    ],
  };

  const cup3Style = {
    transform: [
      {
        translateX: cup3Anim.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [100, 0, -100],
        }),
      },
    ],
  };

  const frogStyle = {
    transform: [{ translateY: frogAnim }],
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/AITopBG.png")}
          style={styles.headerImage}
        />
        <Text style={styles.header}>Discover Your Next Adventure!</Text>
      </View>

      <View style={styles.cupsContainer}>
        <Animated.Image
          source={require("../assets/Cup.png")}
          style={[styles.cup, cup1Style]}
        />
        <Animated.Image
          source={require("../assets/Cup.png")}
          style={[styles.cup, cup2Style]}
        />
        <Animated.Image
          source={require("../assets/Cup.png")}
          style={[styles.cup, cup3Style]}
        />
      </View>

      <View style={styles.bottomContainer}>
        <Image
          source={require("../assets/AIBottomBG.png")}
          style={styles.bottomImage}
        />
        <Animated.Image
          source={require("../assets/Frog.png")}
          style={[styles.frogImage, frogStyle]}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.shuffleButton}
            onPress={handleShuffle}
          >
            <Text style={styles.shuffleText}>Shuffle Me!</Text>
          </TouchableOpacity>
        </View>

        {showMessage && (
          <ImageBackground
            source={require("../assets/MessageBox.png")}
            style={styles.messageContainer}
          >
            <Text style={styles.messageText}>FROLIC TO</Text>
            <Text style={styles.destinationText}>{locationName}</Text>
            <Text style={styles.activityHeader}>Activity Recommendations:</Text>

            <View style={styles.activityContainer}>
              {activities.map((activity, index) => (
                <View key={index} style={styles.activityItem}>
                  <Text style={styles.activityText}>{activity}</Text>
                </View>
              ))}
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addToPlannerButton}
                onPress={navigateToPlannerNewTrip}
              >
                <Text style={styles.addToPlannerText}>Add to Planner</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FCF7F7", alignItems: "center" },
  headerContainer: {
    position: "relative",
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    position: "absolute",
    top: 55,
    left: 21,
    fontSize: 28,
    fontFamily: "Nunito_900Black",
    color: "#006D77",
    width: 252,
  },
  headerImage: { width: screenWidth, height: 181, resizeMode: "cover" },
  cupsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginVertical: 100,
  },
  cup: { width: 100, height: 130 },
  bottomContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomImage: { height: 450, width: 500 },
  frogImage: { position: "absolute", bottom: 270, zIndex: 1 },
  buttonContainer: {
    position: "absolute",
    width: 214,
    height: 47,
    bottom: 230,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "#006D77",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
  },
  shuffleButton: { justifyContent: "center", alignItems: "center" },
  shuffleText: { color: "white", fontSize: 20, fontFamily: "Nunito_700Bold" },
  messageContainer: {
    position: "absolute",
    width: 352,
    height: 460.98,
    borderRadius: 24,
    justifyContent: "space-evenly",
    alignItems: "center",
    top: -325,
    // left: screenWidth / 2 - 176,
    zIndex: 2,
  },
  messageText: {
    top: -15,
    width: 300,
    fontSize: 20,
    fontFamily: "Nunito_800ExtraBold",
    color: "#006D77",
    textAlign: "center",
  },
  destinationText: {
    top: -50,
    width: 300,
    fontSize: 36,
    fontFamily: "Nunito_900Black",
    color: "#006D77",
    textAlign: "center",
  },
  activityHeader: {
    top: -70,
    width: 300,
    fontSize: 20,
    fontFamily: "Nunito_800ExtraBold",
    color: "#006D77",
    textAlign: "center",
  },
  activityContainer: { alignItems: "center" },
  activityItem: { marginBottom: -10 },
  activityText: {
    top: -100,
    width: 300,
    fontSize: 24,
    fontFamily: "Nunito_900Black",
    color: "#006D77",
    textAlign: "center",
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    paddingHorizontal: 50,
    position: "absolute",
    bottom: 75,
    gap: 60,
  },
  cancelButton: { justifyContent: "center", alignItems: "center" },
  cancelText: {
    color: "#A0A0A0",
    fontSize: 16,
    fontFamily: "Nunito_700Bold",
    textDecorationLine: "underline",
  },
  addToPlannerButton: {
    backgroundColor: "#F47966",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  addToPlannerText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Nunito_700Bold",
  },
});

export default AIRandomiser;
