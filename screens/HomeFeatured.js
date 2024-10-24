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

const HomeFeatured = () => {
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
      "https://www.rwsentosa.com/en/attractions/universal-studios-singapore#:~:text=Experience%20the%20thrill%20of%20Hollywood,%20New%20York,%20Sci-Fi%20City,%20Ancient";
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const handlePhonePress = () => {
    const phoneNumber = "tel:65778888";
    Linking.openURL(phoneNumber).catch((err) =>
      console.error("Failed to open phone dialer:", err)
    );
  };

  const handleAddressPress = () => {
    const address = "8 Sentosa Gateway, 098269";
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open maps:", err)
    );
  };

  const handleKlookPress = () => {
    const url =
      "https://www.klook.com/en-SG/activity/117-universal-studios-singapore/";
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open Klook URL:", err)
    );
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
            source={require("../assets/BackArrow.png")}
            style={styles.arrowIcon}
          />
          <Text style={styles.backText}>BACK</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Mapp!t</Text>
        <Image
          source={require("../assets/HomePageBGWaves.png")}
          style={styles.headerImage}
        />
      </View>

      <View style={styles.featuredContainer}>
        <Image
          source={require("../assets/USSimage.png")}
          style={styles.featuredImage}
        />
        <LinearGradient
          colors={["#FFFFFF00", "rgba(0, 0, 0, 0.4)"]} // Linear gradient from white to black with 40% opacity
          style={styles.featuredOverlay}
        />
        <Text style={styles.featuredTitle}>
          Universal Studios Singapore (USS)
        </Text>
      </View>

      <View style={styles.infoMainContainer}>
        <Text style={styles.about}>About:</Text>

        <Text style={styles.description}>
          USS offers thrilling rides, live shows, and attractions based on your
          favourite movies and TV shows. Perfect for families and
          adventure-seekers!
        </Text>

        <View style={styles.infoContainer}>
          <Image
            source={require("../assets/LocationIcon.png")}
            style={styles.icon}
          />
          <TouchableOpacity onPress={handleAddressPress}>
            <Text style={styles.infoText}>8 Sentosa Gateway, 098269</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Image
            source={require("../assets/PhoneIcon.png")}
            style={styles.icon}
          />
          <TouchableOpacity onPress={handlePhonePress}>
            <Text style={styles.infoText}>6577 8888</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Image
            source={require("../assets/TimeIcon.png")}
            style={styles.icon}
          />
          <Text style={styles.infoText}>Mon - Sun: 10AM - 8PM</Text>
        </View>

        <View style={styles.infoContainer}>
          <Image
            source={require("../assets/WebsiteIcon.png")}
            style={styles.icon}
          />
          <TouchableOpacity onPress={handleWebsitePress}>
            <Text style={styles.website}>USS Website</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bookNowContainer}>
        <TouchableOpacity
          style={styles.bookNowButton}
          onPress={handleKlookPress}
        >
          <Text style={styles.bookNowText}>Book Now via Klook</Text>
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
    fontSize: 12,
    fontFamily: "Nunito_400Regular",
  },
  website: {
    color: "#F47966",
    fontSize: 12,
    fontFamily: "Nunito_400Regular",
    textDecorationLine: "underline",
  },
});

export default HomeFeatured; // Ensure the component is exported
