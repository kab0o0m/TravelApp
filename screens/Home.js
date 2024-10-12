import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import { useFonts, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold, Nunito_900Black } from '@expo-google-fonts/nunito';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');
const { height: screenHeight } = Dimensions.get('window');

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
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Mapp!t</Text>
        <Image source={require('../assets/HomePageBGWaves.png')} style={styles.headerImage} />
      </View>

      <View style={styles.searchContainer}>
        <Image source={require('../assets/Search.png')} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Discover a Country"
          placeholderTextColor="#A9A9A9" 
        />
      </View>

      <View style={styles.relativeContainer}>
        <View style={styles.absoluteBox} />
        <Image source={require('../assets/AroundtheWorldBG.png')} style={styles.absoluteImage} />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>Popular Destinations</Text>

        {/* ScrollView for Destinations */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>

         {/* Japan Destination */}
          <View style={styles.destinationContainer}>
            <View style={styles.destinationBackground} />
            <Image source={require('../assets/JapanBG.png')} style={styles.destinationImage} />
            <View style={styles.textContainer}>
             <Text style={styles.destinationText}>Japan</Text>
            </View>
          </View>

          {/* Singapore Destination - NOTE: replace "Profile" with appropriate Popz Home Pg*/}
          <TouchableOpacity style={styles.destinationContainer} onPress={() => navigation.navigate('Profile')}>   
            <View style={styles.destinationBackground} />
            <Image source={require('../assets/SingaporeBG.png')} style={styles.destinationImage} />
            <View style={styles.textContainer}>
             <Text style={styles.destinationText}>Singapore</Text>
            </View>
          </TouchableOpacity>

          {/*London Destination */}
          <View style={styles.destinationContainer}>
            <View style={styles.destinationBackground} />
            <Image source={require('../assets/LondonBG.png')} style={styles.destinationImage} />
            <View style={styles.textContainer}>
             <Text style={styles.destinationText}>London</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>Featured</Text>

        {/* ScrollView for Featured Destinations */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>

          {/* Sightseeing Section */}
          <View style={styles.featuredContainer}>
            <View style={styles.featuredBackground} />
            <Image source={require('../assets/SightseeingBG.png')} style={styles.featuredImage} />
            <View style={styles.featuredTextContainer}>
              <Text style={styles.featuredText}>Sightseeing</Text>
              <View style={styles.subTextContainer}>
                <Image source={require('../assets/HomeIcon.png')} style={styles.homeIcon} />
                <Text style={styles.featuredSubText}>Norway, Europe</Text>
              </View>
            </View>
          </View>

          {/* Theme Park Section */}
          <TouchableOpacity 
            style={styles.featuredContainer} 
            onPress={() => navigation.navigate('HomeFeatured')} 
          >
            <View style={styles.featuredBackground} />
            <Image source={require('../assets/ThemeParkBG.png')} style={styles.featuredImage} />
            <View style={styles.featuredTextContainer}>
              <Text style={styles.featuredText}>Theme Park</Text>
              <View style={styles.subTextContainer}>
                <Image source={require('../assets/HomeIcon.png')} style={styles.homeIcon} />
                <Text style={styles.featuredSubText}>Singapore, Asia</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Snorkeling Section */}
          <View style={styles.featuredContainer}>
          <View style={styles.featuredBackground} />
            <Image source={require('../assets/SnorkelingBG.png')} style={styles.featuredImage} />
            <View style={styles.featuredTextContainer}>
              <Text style={styles.featuredText}>Snorkeling</Text>
              <View style={styles.subTextContainer}>
                <Image source={require('../assets/HomeIcon.png')} style={styles.homeIcon} />
                <Text style={styles.featuredSubText}>Singapore, Asia</Text>
              </View>
            </View>
          </View>

          {/* Feasting Section */}
          <View style={styles.featuredContainer}>
            <View style={styles.featuredBackground} />
            <Image source={require('../assets/FeastingBG.png')} style={styles.featuredImage} />
            <View style={styles.featuredTextContainer}>
              <Text style={styles.featuredText}>Feasting</Text>
              <View style={styles.subTextContainer}>
                <Image source={require('../assets/HomeIcon.png')} style={styles.homeIcon} />
                <Text style={styles.featuredSubText}>Thailand, Asia</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default Home; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollViewContent: {
    flexGrow: 1, // Allows the content to grow and be scrollable
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    position: 'relative',
    marginBottom: 5,
  },
  header: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Nunito_900Black',
    position: 'absolute',
    left: 291, // Set the x-coordinate
    top: 17,   // Set the y-coordinate
    zIndex: 1,
  },
  headerImage: {
    width: screenWidth,
    height: 181,
    resizeMode: 'cover',
  },
  searchContainer: {
    width: 375, // Set the width
    height: 61, // Set the height
    flexDirection: 'row', // Align children horizontally
    backgroundColor: '#E6F1F2',
    borderRadius: 20,
    padding: 10,
    boxShadow: '1px 35px 83px 1px rgba(146, 183, 218, 0.12)',
    alignItems: 'center',
    marginHorizontal: (screenWidth - 375) / 2, // Center the container horizontally
    marginBottom: 12,
  },
  searchIcon: {
    width: 25, // Set the width of the icon
    height: 25, // Set the height of the icon
    marginRight: 12, // Space between icon and text
    marginLeft: 10, // Shift the icon to the right
  },
  searchInput: {
    color: '#006D77',
    fontSize: 20,
    fontFamily: 'Nunito_600SemiBold',
    fontWeight: '600'
  },
  relativeContainer: {
    width: '100%',
    height: 252,
    position: 'relative',
    alignItems: 'center', // Center the absolute elements
  },
  absoluteBox: {
    width: 351,
    height: 204,
    left: 0,
    top: 24,
    position: 'absolute',
    backgroundColor: 'rgba(16, 58, 62, 0.78)',
    shadowColor: 'rgba(146, 183, 218, 0.12)',
    shadowOffset: { width: 1, height: 35 },
    shadowOpacity: 1,
    shadowRadius: 83,
    borderRadius: 30,
    top: 24, // Positioning from the top
    left: (screenWidth - 351) / 2, // Center the box 
  },
  absoluteImage: {
    width: 320,
    height: 252,
    left: (screenWidth - 320) / 2, // Center the image horizontally
    top: 0,
    position: 'absolute',
  },
  sectionContainer: {
    marginBottom: 20,
    marginTop: 12, // Add margin to create space between the image and the section header (Popular Destinations)
  },
  sectionHeader: {
    fontSize: 24,
    color: '#3A4646',
    fontFamily: 'Nunito_700Bold',
    marginLeft: 20,
    marginBottom: 10,
  },
  destinationContainer: {
    position: 'relative', // Set position relative for absolute children
    marginBottom: 10,
    marginLeft: 20,
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute', // Position text absolutely
    bottom: 5, // Align text to the bottom
    width: '100%', // Take full width of the parent
    alignItems: 'center', // Center text horizontally
  },
  destinationBackground: {
    width: 148,
    height: 204,
    position: 'absolute',
    backgroundColor: 'rgba(230, 241, 242, 1)', // Background color for the gradient effect
    borderRadius: 30,
    shadowColor: 'rgba(146, 183, 218, 0.12)',
    shadowOffset: { width: 1, height: 35 },
    shadowOpacity: 1,
    shadowRadius: 83,
  },
  destinationImage: {
    width: 148,
    height: 204,
    borderRadius: 30,
    marginRight: 5,
  },
  destinationText: {
    fontSize: 20,
    color: '#FBFCFE',
    fontFamily: 'Nunito_800ExtraBold',
    textAlign: 'center', // Center the text
    zIndex: 2, // Ensure text is above the background
    lineHeight: 24, // Set line height for better spacing
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Black color with 50% opacity
    textShadowOffset: { width: 0, height: 2 }, // x: 0, y: 2
    textShadowRadius: 4, // Blur radius 
  },
  featuredContainer: {
    position: 'relative',
    marginBottom: 20,
    marginLeft: 40,
    alignItems: 'center',
  },
  featuredBackground: {
    width: 148,
    height: 204,
    position: 'absolute',
    backgroundColor: 'rgba(230, 241, 242, 1)', // Background color for the gradient effect
    borderRadius: 30,
    shadowColor: 'rgba(146, 183, 218, 0.12)',
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
    bottom: -14, // Align text to the bottom
    width: '100%', // Take full width of the parent
    marginTop: 150,
    marginBottom: -10,
    alignItems: 'flex-start',
  },
  featuredText: {
    fontSize: 20,
    color: '#3A4646',
    fontFamily: 'Nunito_600SemiBold',
    textAlign: 'left',
    marginTop: -146,
    zIndex: 2,
    lineHeight: 30, // Set line height for better spacing
  },
  subTextContainer: {
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center', // Center vertically
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
    color: '#006D77',
    fontFamily: 'Nunito_600SemiBold',
    textAlign: 'left',
    zIndex: 2,
    marginTop: -5,
    marginBottom: -20,
  },

});