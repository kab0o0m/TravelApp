import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from "react-native";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
} from "@expo-google-fonts/nunito";
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const { width: screenWidth } = Dimensions.get("window");
const { height: screenHeight } = Dimensions.get("window");

SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from auto-hiding

const HomeFeatured3 = () => {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
  });

  const navigation = useNavigation(); // Get the navigation object

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Hide the splash screen once fonts are loaded
    }
  }, [fontsLoaded]);

  {
    /* Handle Clicking of Information */
  }

  const handleWebsitePress = () => {
    const url =
      "https://zamzam.sg/";
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const handlePhonePress = () => {
    const phoneNumber = "tel:+65 6298 6320";
    Linking.openURL(phoneNumber).catch((err) =>
      console.error("Failed to open phone dialer:", err)
    );
  };

  const handleMapPress = () => {
    const address = "697-699 North Bridge Rd, Singapore 198675";
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open maps:", err)
    );
  };

  const navigateToPlannerNewTrip = () => {
    navigation.navigate("PlannerNewTrip", {
        destination: "Zam Zam Murtabak" // Pass the destination
    });
  };

  

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#006D77" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Image
            source={require("../assets/icons/BackArrow.png")}
            style={styles.arrowIcon}
          />
          <Text style={styles.backText}>BACK</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Mapp!t</Text>
        <Image
          source={require("../assets/images/HomePageBGWaves.png")}
          style={styles.headerImage}
        />
      </View>

      <View style={styles.featuredContainer}>
        <Image
          source={require("../assets/ZamZam.jpg")}
          style={styles.featuredImage}
        />
        <LinearGradient
          colors={["#FFFFFF00", "rgba(0, 0, 0, 0.4)"]} // Linear gradient from white to black with 40% opacity
          style={styles.featuredOverlay}
        />
        <Text style={styles.featuredTitle}>
        Zam Zam Murtabak
        </Text>
      </View>

      <View style={styles.infoMainContainer}>
        <Text style={styles.about}>About:</Text>

        <Text style={styles.description}>
        Perfected over a century, Zam Zam’s Murtabak delivers authentic Indian-Muslim flavours, with a diverse menu of vegetarian & halal options for all!
        </Text>

        <View style={styles.infoContainer}>
          <Image
            source={require("../assets/icons/LocationIcon.png")}
            style={styles.icon}
          />
          <TouchableOpacity onPress={handleMapPress}>
            <Text style={styles.infoText}>697 North Bridge Road, S198675</Text>
          </TouchableOpacity>
          
          
        </View>

        <View style={styles.infoContainer}>
          <Image
            source={require("../assets/icons/PhoneIcon.png")}
            style={styles.icon}
          />
          <TouchableOpacity onPress={handlePhonePress}>
            <Text style={styles.infoText}>+65 6298 6320</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Image
            source={require("../assets/icons/WebsiteIcon.png")}
            style={styles.icon}
          />
          <TouchableOpacity onPress={handleWebsitePress}>
            <Text style={styles.website}>Our Website</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Image
            source={require("../assets/icons/TimeIcon.png")}
            style={styles.icon}
          />
          <Text style={styles.infoText}>Mon - Sun: 7AM - 11PM</Text>
        </View>

        
      </View>

      <View style={styles.bookNowContainer}>
        <TouchableOpacity
          style={styles.bookNowButton}
          onPress={navigateToPlannerNewTrip}
        >
          <Text style={styles.bookNowText}>Add to Planner!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
    backgroundColor: "white",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    position: "relative",
    marginBottom: 5,
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 130,
    zIndex: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  arrowIcon: {
    width: 32,
    height: 32,
  },
  backText: {
    color: "#3A4646",
    fontSize: 16,
    fontFamily: "Nunito_700Bold",
    marginLeft: 8,
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

  featuredContainer: {
    width: 351,
    height: 204,
    position: "relative",
  },
  featuredImage: {
    width: 351,
    height: 204,
    borderRadius: 30,
  },
  featuredOverlay: {
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
  featuredTitle: {
    position: "absolute",
    left: 17,
    top: 171,
    color: "white",
    fontSize: 18,
    fontFamily: "Nunito_800ExtraBold",
    zIndex: 2,
  },
  bookNowContainer: {
    marginTop: 35,
    width: 339,
    height: 43,
    backgroundColor: "#F47966",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.20)",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  bookNowButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  bookNowText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Nunito_700Bold",
  },
  about: {
    width: 167,
    color: "#006D77",
    fontSize: 20,
    fontFamily: "Nunito_700Bold",
    marginLeft: 21,
    marginTop: 22,
  },
  description: {
    width: 351,
    color: "#006D77",
    fontSize: 16,
    fontFamily: "Nunito_400Regular",
    marginVertical: 8,
    marginLeft: 21,
    lineHeight: 20,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 21,
    marginTop: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  infoText: {
    color: "#F47966",
    fontSize: 14,
    fontFamily: "Nunito_400Regular",
  },
  website: {
    color: "#F47966",
    fontSize: 14,
    fontFamily: "Nunito_400Regular",
    textDecorationLine: "underline",
  },
});

export default HomeFeatured3; // Ensure the component is exported
