import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import {
  useFonts,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
} from "@expo-google-fonts/nunito";
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";
import NavBar from "../components/NavBar";
import EastCoastPark from "../assets/thunderstorm.jpg";
import MarinaBaySands from "../assets/MarinaBaySands.jpg";
import Esplanade from "../assets/Esplanade.jpg";
import USS from "../assets/USS.webp";
import SingaporeHome from "../assets/SingaporeHome.jpg";
import Laksa from "../assets/Laksa.jpg";
import Chickenrice from "../assets/Chickenrice.jpg";
import Mutarbak from "../assets/ZamZam.jpg";
import BeefKwayteow from "../assets/Geylang.jpg";
import { LinearGradient } from "expo-linear-gradient";
import Chatbot from "../components/ChatbotButton";
import ArrowLeft from "../assets/icons/ArrowLeft.png";
import FrogIcon from "../assets/Frog.png";
import Mappit from "../components/Mappit";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from auto-hiding

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
  });

  const navigation = useNavigation(); // Get the navigation object

  const handlePress = (locationId) => {
    navigation.navigate("HomePopular", { locationId: locationId });
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Hide the splash screen once fonts are loaded
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#006D77" />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
        <Mappit colour="#fff" />
        <View style={styles.headerContainer}>
          <Image
            source={require("../assets/images/HomePageBGWaves.png")}
            style={styles.headerImage}
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("LocationSearch")}>
          <View style={styles.searchContainer}>
            <Image source={require("../assets/icons/Search.png")} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Discover Singapore"
              placeholderTextColor="#A9A9A9"
              editable={false}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.relativeContainer}>
          <View style={styles.absoluteBox} />
          <Image source={SingaporeHome} style={styles.absoluteImage} resizeMode="cover" />
          <Image source={SingaporeHome} style={styles.absoluteImage} resizeMode="cover" />
        </View>

        {/* Popular Destinations */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Popular Destinations</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.popularScrollView}>
            {/* Marina Bay Sands */}

            <TouchableOpacity style={styles.destinationContainer} onPress={() => handlePress(1)}>
              <View style={styles.destinationBackground} />
              <Image source={MarinaBaySands} style={styles.destinationImage} />
              <LinearGradient
                colors={["#FFFFFF00", "rgba(0, 0, 0, 0.4)"]}
                style={styles.gradientOverlay}
              />
              <View style={styles.textContainer}>
                <Text style={styles.destinationText}>Marina Bay Sands</Text>
              </View>
            </TouchableOpacity>

            {/* The Esplanade */}

            <TouchableOpacity style={styles.destinationContainer} onPress={() => handlePress(2)}>
              <View style={styles.destinationBackground} />
              <Image source={Esplanade} style={styles.destinationImage} />
              <LinearGradient
                colors={["#FFFFFF00", "rgba(0, 0, 0, 0.4)"]}
                style={styles.gradientOverlay}
              />
              <View style={styles.textContainer}>
                <Text style={styles.destinationText}>The Esplanade</Text>
              </View>
            </TouchableOpacity>

            {/* East Coast Park */}

            <TouchableOpacity style={styles.destinationContainer} onPress={() => handlePress(3)}>
              <View style={styles.destinationBackground} />
              <Image source={EastCoastPark} style={styles.destinationImage} />
              <LinearGradient
                colors={["#FFFFFF00", "rgba(0, 0, 0, 0.4)"]}
                style={styles.gradientOverlay}
              />
              <View style={styles.textContainer}>
                <Text style={styles.destinationText}>East Coast Park</Text>
              </View>
            </TouchableOpacity>

            {/* Universal Studios */}

            <TouchableOpacity
              style={styles.destinationContainerLast}
              onPress={() => handlePress(4)}>
              <View style={styles.destinationBackground} />
              <Image source={USS} style={styles.destinationImage} />
              <LinearGradient
                colors={["#FFFFFF00", "rgba(0, 0, 0, 0.4)"]}
                style={styles.gradientOverlay}
              />
              <View style={styles.textContainer}>
                <Text style={styles.destinationText}>Universal Studios</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Food choices */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Food Choices</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.featuredScrollView}>
            {/* Hainanese Chicken Rice */}
            <TouchableOpacity
              style={styles.featuredContainer}
              onPress={() => navigation.navigate("HomeFeatured1")}>
              <View style={styles.featuredBackground} />
              <Image source={Chickenrice} style={styles.featuredImage} />
              <View style={styles.featuredTextContainer}>
                <Text style={styles.featuredText}>Chicken Rice</Text>
                <View style={styles.subTextContainer}>
                  <Image source={require("../assets/icons/HomeIcon.png")} style={styles.homeIcon} />
                  <Text style={styles.featuredSubText}>Maxwell Hawker</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Katong Laksa */}
            <TouchableOpacity
              style={styles.featuredContainer}
              onPress={() => navigation.navigate("HomeFeatured2")}>
              <View style={styles.featuredBackground} />
              <Image source={Laksa} style={styles.featuredImage} />
              <View style={styles.featuredTextContainer}>
                <Text style={styles.featuredText}>Katong Laksa</Text>
                <View style={styles.subTextContainer}>
                  <Image source={require("../assets/icons/HomeIcon.png")} style={styles.homeIcon} />
                  <Text style={styles.featuredSubText}>Roxy Square</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Murtabak */}
            <TouchableOpacity
              style={styles.featuredContainer}
              onPress={() => navigation.navigate("HomeFeatured3")}>
              <View style={styles.featuredBackground} />
              <Image source={Mutarbak} style={styles.featuredImage} />
              <View style={styles.featuredTextContainer}>
                <Text style={styles.featuredText}>Murtabak</Text>
                <View style={styles.subTextContainer}>
                  <Image source={require("../assets/icons/HomeIcon.png")} style={styles.homeIcon} />
                  <Text style={styles.featuredSubText}>Zam Zam</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Beef Kway Teow */}
            <TouchableOpacity
              style={styles.featuredContainerLast}
              onPress={() => navigation.navigate("HomeFeatured4")}>
              <View style={styles.featuredBackground} />
              <Image source={BeefKwayteow} style={styles.featuredImage} />
              <View style={styles.featuredTextContainer}>
                <Text style={styles.featuredText}>Beef Kway Teow</Text>
                <View style={styles.subTextContainer}>
                  <Image source={require("../assets/icons/HomeIcon.png")} style={styles.homeIcon} />
                  <Text style={styles.featuredSubText}>Geylang</Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
      <Chatbot />

      <View style={styles.NavBarContainer}>
        <NavBar />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFF",
    position: "relative",
  },
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1, // Allows the content to grow and be scrollable
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
  header: {
    fontSize: 24,
    color: "white",
    fontFamily: "Nunito_900Black",
    position: "absolute",
    left: 291, // Set the x-coordinate
    top: 32, // Set the y-coordinate
    zIndex: 1,
  },
  headerImage: {
    width: screenWidth,
    height: 181,
    resizeMode: "cover",
  },
  searchContainer: {
    width: 375,
    height: 61,
    flexDirection: "row",
    backgroundColor: "#E6F1F2",
    borderRadius: 20,
    padding: 10,
    boxShadow: "1px 35px 83px 1px rgba(146, 183, 218, 0.12)",
    alignItems: "center",
    marginHorizontal: (screenWidth - 375) / 2,
    marginBottom: 12,
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
    width: 290,
  },
  relativeContainer: {
    width: "100%",
    height: 252,
    position: "relative",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 50,
  },
  absoluteImage: {
    width: "94%",
    height: 280,
    top: 0,
    position: "absolute",
    borderRadius: 50,
    marginBottom: 50,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 24,
    color: "#3A4646",
    fontFamily: "Nunito_700Bold",
    marginLeft: 30,
    marginBottom: 10,
    marginTop: 25,
  },
  textContainer: {
    position: "absolute",
    bottom: 5,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  destinationBackground: {
    width: 148,
    height: 204,
    position: "absolute",
    borderRadius: 30,
    shadowColor: "rgba(146, 183, 218, 0.12)",
    shadowOffset: { width: 1, height: 35 },
    shadowOpacity: 1,
    shadowRadius: 83,
  },
  destinationImage: {
    width: 250,
    height: 150,
    borderRadius: 30,
    marginRight: 5,
  },
  gradientOverlay: {
    position: "absolute",
    width: 250,
    height: 150,
    borderRadius: 30,
  },
  destinationText: {
    fontSize: 20,
    color: "#FBFCFE",
    fontFamily: "Nunito_800ExtraBold",
    textAlign: "center",
    zIndex: 2,
    lineHeight: 24,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  featuredContainer: {
    position: "relative",
    marginBottom: 20,
    marginRight: 30,
    marginLeft: 16,
    alignItems: "center",
  },
  featuredBackground: {
    width: 210,
    height: 230,
    position: "absolute",
    backgroundColor: "rgba(230, 241, 242, 1)",
    borderRadius: 30,
    shadowColor: "rgba(146, 183, 218, 0.12)",
    shadowOffset: { width: 1, height: 35 },
    shadowOpacity: 1,
    shadowRadius: 83,
  },
  featuredImage: {
    width: 180,
    height: 150,
    borderRadius: 20,
    top: 12,
  },
  featuredTextContainer: {
    bottom: -14, // Align text to the bottom
    width: 170,
    marginTop: 150,
    marginBottom: -10,
    alignItems: "flex-start",
  },
  featuredText: {
    fontSize: 20,
    color: "#3A4646",
    fontFamily: "Nunito_600SemiBold",
    textAlign: "left",
    marginTop: -146,
    zIndex: 2,
    lineHeight: 30, // Set line height for better spacing
  },
  subTextContainer: {
    flexDirection: "row", // Align icon and text horizontally
    alignItems: "center", // Center vertically
  },
  homeIcon: {
    width: 16, // Set the width of the icon
    height: 16, // Set the height of the icon
    marginRight: 5, // Space between icon and text
    marginTop: 0,
    marginBottom: -20,
  },
  featuredSubText: {
    fontSize: 12,
    color: "#006D77",
    fontFamily: "Nunito_600SemiBold",
    textAlign: "left",
    zIndex: 2,
    marginTop: 0,
    marginBottom: -20,
  },
  popularScrollView: {
    paddingHorizontal: 25,
  },
  destinationContainer: {
    position: "relative",
    marginRight: 10,
    alignItems: "flex-start",
  },
  destinationContainerLast: {
    position: "relative",
    marginRight: 55,
    alignItems: "flex-start",
  },
  featuredScrollView: {
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  featuredContainerLast: {
    position: "relative",
    marginBottom: 20,
    marginLeft: 16,
    marginRight: 60,
    alignItems: "center",
  },
  NavBarContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  iconContainer: {
    position: "absolute",
    bottom: 80, // Adjust this to move it above the navbar if needed
    right: 30,
    backgroundColor: "#002C30",
    padding: 10,
    borderRadius: 30,
    zIndex: 999,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    top: 80,
    left: 30,
    zIndex: 999,
    padding: 15,
    backgroundColor: "#D9D9D9",
    borderRadius: 30,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  icon: {
    height: 40,
    width: 40,
  },
  fixedIconContainer: {
    position: "absolute",
    bottom: 100, // Distance from the bottom of the screen
    right: 30,
    backgroundColor: "#002C30",
    padding: 10,
    borderRadius: 30,
    zIndex: 999,
  },
});
