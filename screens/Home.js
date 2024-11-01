import React, { useEffect } from "react";
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

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from auto-hiding

const Home = () => {
  const [fontsLoaded] = useFonts({
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

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#006D77" />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollViewContent}
      >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Mapp!t</Text>
          <Image
            source={require("../assets/images/HomePageBGWaves.png")}
            style={styles.headerImage}
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("LocationSearch")}>
          <View style={styles.searchContainer}>
            <Image
              source={require("../assets/icons/Search.png")}
              style={styles.searchIcon}
            />
            <Image
              source={require("../assets/icons/Search.png")}
              style={styles.searchIcon}
            />
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
          <Image
            source={SingaporeHome}
            style={styles.absoluteImage}
            resizeMode="cover"
          />
          <Image
            source={SingaporeHome}
            style={styles.absoluteImage}
            resizeMode="cover"
          />
        </View>

        {/* Popular Destinations */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Popular Destinations</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.popularScrollView}
          >
            <TouchableOpacity
              style={styles.destinationContainer}
              onPress={() => navigation.navigate("HomePopular")}
            >
              onPress={() => navigation.navigate("HomePopular")}
            >
              <View style={styles.destinationBackground} />
              <Image source={MarinaBaySands} style={styles.destinationImage} />
              <View style={styles.textContainer}>
                <Text style={styles.destinationText}>Marina Bay Sands</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.destinationContainer}
              onPress={() => navigation.navigate("HomePopular")}
            >
              onPress={() => navigation.navigate("HomePopular")}
            >
              <View style={styles.destinationBackground} />
              <Image source={Esplanade} style={styles.destinationImage} />
              <View style={styles.textContainer}>
                <Text style={styles.destinationText}>The Esplanade</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.destinationContainer}
              onPress={() => navigation.navigate("HomePopular")}
            >
              <View style={styles.destinationBackground} />
              <Image source={EastCoastPark} style={styles.destinationImage} />
              <View style={styles.textContainer}>
                <Text style={styles.destinationText}>East Coast Park</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.destinationContainerLast}
              onPress={() => navigation.navigate("HomePopular")}
            >
              <View style={styles.destinationBackground} />
              <Image source={USS} style={styles.destinationImage} />
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
            style={styles.featuredScrollView}
          >
            <TouchableOpacity
              style={styles.destinationContainer}
              onPress={() => navigation.navigate("HomePopular")}
            >
              <View style={styles.destinationBackground} />
              <Image source={Chickenrice} style={styles.destinationImage} />
              <View style={styles.featuredTextContainer}>
                <Text style={styles.featuredText}>Hainanese Chicken Rice</Text>
                <View style={styles.subTextContainer}>
                  <Image
                    source={require("../assets/icons/HomeIcon.png")}
                    style={styles.homeIcon}
                  />
                  <Text style={styles.featuredSubText}>Maxwell Hawker</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.destinationContainer}
              onPress={() => navigation.navigate("HomePopular")}
            >
              <View style={styles.destinationBackground} />
              <Image source={Laksa} style={styles.destinationImage} />
              <View style={styles.featuredTextContainer}>
                <Text style={styles.featuredText}>Katong Laksa</Text>
                <View style={styles.subTextContainer}>
                  <Image
                    source={require("../assets/icons/HomeIcon.png")}
                    style={styles.homeIcon}
                  />
                  <Text style={styles.featuredSubText}>Roxy Square</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.destinationContainer}
              onPress={() => navigation.navigate("HomePopular")}
            >
              <View style={styles.destinationBackground} />
              <Image source={Mutarbak} style={styles.destinationImage} />
              <View style={styles.featuredTextContainer}>
                <Text style={styles.featuredText}>Murtabak</Text>
                <View style={styles.subTextContainer}>
                  <Image
                    source={require("../assets/icons/HomeIcon.png")}
                    style={styles.homeIcon}
                  />
                  <Text style={styles.featuredSubText}>Zam Zam</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.destinationContainerLast}
              onPress={() => navigation.navigate("HomePopular")}
            >
              <View style={styles.destinationBackground} />
              <Image source={BeefKwayteow} style={styles.destinationImage} />
              <View style={styles.featuredTextContainer}>
                <Text style={styles.featuredText}>Beef Kway Teow</Text>
                <View style={styles.subTextContainer}>
                  <Image
                    source={require("../assets/icons/HomeIcon.png")}
                    style={styles.homeIcon}
                  />
                  <Text style={styles.featuredSubText}>Geylang</Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>

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
    fontSize: 30,
    color: "white",
    fontFamily: "Nunito_900Black",
    position: "absolute",
    left: 291, // Set the x-coordinate
    top: 32, // Set the y-coordinate
    zIndex: 1,
  },
  headerImage: {
    width: screenWidth,
    height: 240,
    resizeMode: "cover",
  },
  searchContainer: {
    width: 375, // Set the width
    height: 61, // Set the height
    flexDirection: "row", // Align children horizontally
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
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  destinationBackground: {
    width: 148,
    height: 204,
    position: "absolute",
    borderRadius: 30,
  },
  destinationImage: {
    width: 250,
    height: 150,
    borderRadius: 30,
    marginRight: 5,
  },
  destinationText: {
    fontSize: 20,
    color: "#000",
    fontFamily: "Nunito_700Bold",
    textAlign: "center",
    lineHeight: 24,
    marginTop: 14,
    marginLeft: 10,
  },
  featuredBackground: {
    width: "100%",
    height: 204,
    position: "absolute",
    backgroundColor: "rgba(230, 241, 242, 1)", // Background color for the gradient effect
    borderRadius: 30,
    shadowColor: "rgba(146, 183, 218, 0.12)",
    shadowOffset: { width: 1, height: 35 },
    shadowOpacity: 1,
    shadowRadius: 83,
  },
  featuredImage: {
    width: 124,
    height: 124,
    borderRadius: 20,
    top: 12,
  },
  featuredTextContainer: {
    bottom: -14,
    width: "100%", // Take full width of the parent
    marginTop: 150,
    marginBottom: -10,
    alignItems: "flex-start", // Align text container to the start (left)
    paddingHorizontal: 10, // Add some padding if needed
  },
  featuredText: {
    fontSize: 20,
    color: "#3A4646",
    fontFamily: "Nunito_600SemiBold",
    textAlign: "left", // Align text to the left
    marginTop: -155,
    zIndex: 2,
    lineHeight: 30,
  },
  subTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Align icon and text to the left
  },
  homeIcon: {
    width: 16, // Set the width of the icon
    height: 16, // Set the height of the icon
    marginRight: 5, // Space between icon and text
    marginTop: -5,
    marginBottom: -20,
  },
  featuredSubText: {
    fontSize: 12,
    color: "#006D77",
    fontFamily: "Nunito_600SemiBold",
    textAlign: "left",
    zIndex: 2,
    marginTop: -5,
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
  featuredContainer: {
    marginBottom: 40,
    marginRight: 20,
    marginLeft: 16,
  },
  featuredContainerLast: {
    marginBottom: 20,
    marginLeft: 16,
    marginRight: 60,
  },
  NavBarContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
