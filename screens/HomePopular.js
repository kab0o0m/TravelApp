import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ActivityIndicator, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { useFonts, Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold, Nunito_900Black, Nunito_800ExtraBold_Italic, Nunito_400Regular_Italic } from '@expo-google-fonts/nunito';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; 

const { width: screenWidth } = Dimensions.get('window');
const { height: screenHeight } = Dimensions.get('window');

SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from auto-hiding

const HomePopular = () => {
  
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
  const [savedItems, setSavedItems] = useState({
    singaporeZoo: false,
    singaporeCableCar: false,
    megaAdventurePark: false,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); // Hide the splash screen once fonts are loaded
    }
  }, [fontsLoaded]);

  // Function to toggle the save state for a specific item
  const toggleSave = (item) => {
    setSavedItems((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
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
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                    <Image source={require('../assets/icons/BackArrow.png')} style={styles.arrowIcon} />
                    <Text style={styles.backText}>BACK</Text>
                </TouchableOpacity>
                <Text style={styles.header}>Mapp!t</Text>
                <Image source={require('../assets/images/HomePageBGWaves.png')} style={styles.headerImage} />
            </View>
        
            <View style={styles.popularContainer}>
                <Image source={require('../assets/images/TopPlacesSGBG.png')} style={styles.popularImage} />
                <LinearGradient
                    colors={['#FFFFFF00', 'rgba(0, 0, 0, 0.4)']} // Linear gradient from white to black with 40% opacity
                    style={styles.popularOverlay}
                />
                <Text style={styles.popularTitle}>Top Places in Singapore</Text>
            </View>


            {/* Information on Singapore Zoo */}

            <View style={styles.infoContainer}>
                <View style={styles.infoHeader}>
                    <Image source={require('../assets/icons/LocationIcon.png')} style={styles.icon} />
                    <Text style={styles.infoTitle}>Singapore Zoo</Text>
                    <TouchableOpacity style={styles.saveButton} onPress={() => toggleSave('singaporeZoo')}>
                        <Image source={savedItems.singaporeZoo ? require('../assets/icons/SavingIcon.png') : require('../assets/icons/ToSave.png')} style={styles.saveIcon} />
                        <Text style={styles.saveText}>{savedItems.singaporeZoo ? 'Saved' : 'Save'}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.description}>
                            Open concept enclosures and immersive wildlife make it a must-see for nature-lovers!
                        </Text>
                        <Text style={styles.notToBeMissedBold}>Not-to-be-Missed: </Text>
                        <Text style={styles.notToBeMissed}>
                            Witness adorable performances from talented animals and get up close during feeding sessions
                        </Text>
                        <View style={styles.rectangle} />
                    </View>
                    <Image source={require('../assets/SingaporeZoo.png')} style={styles.topPlacesImage} />
                </View>
            </View>


            {/* Information on Singapore Cable Car */}

            <View style={styles.infoContainer}>
                <View style={styles.infoHeader}>
                    <Image source={require('../assets/icons/LocationIcon.png')} style={styles.icon} />
                    <Text style={styles.infoTitle}>Singapore Cable Car</Text>
                    <TouchableOpacity style={styles.saveButton} onPress={() => toggleSave('singaporeCableCar')}>
                        <Image source={savedItems.singaporeCableCar ? require('../assets/icons/SavingIcon.png') : require('../assets/icons/ToSave.png')} style={styles.saveIcon} />
                        <Text style={styles.saveText}>{savedItems.singaporeCableCar ? 'Saved' : 'Save'}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.description}>
                            Take in the splendour of Singapore’s cityscape through this 30-minute cable car ride.
                        </Text>
                        <Text style={styles.notToBeMissedBold}>Not-to-be-Missed: </Text>
                        <Text style={styles.notToBeMissed}>
                            Enjoy a romantic 4-course, private cable car dining experience with your partner.
                        </Text>
                        <View style={styles.rectangle} />
                    </View>
                    <Image source={require('../assets/SingaporeCableCar.png')} style={styles.topPlacesImage} />
                </View>
            </View>


            {/* Information on Mega Adventure Park */}
            <View style={styles.infoContainer}>
                <View style={styles.infoHeader}>
                    <Image source={require('../assets/icons/LocationIcon.png')} style={styles.icon} />
                    <Text style={styles.infoTitle}>Mega Adventure Park</Text>
                    <TouchableOpacity style={styles.saveButton} onPress={() => toggleSave('megaAdventurePark')}>
                        <Image source={savedItems.megaAdventurePark ? require('../assets/icons/SavingIcon.png') : require('../assets/icons/ToSave.png')} style={styles.saveIcon} />
                        <Text style={styles.saveText}>{savedItems.megaAdventurePark ? 'Saved' : 'Save'}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.description}>
                        Feeling daring? With 4 activities to choose from, embark on the highest adventure in Singapore!
                        </Text>
                        <Text style={styles.notToBeMissedBold}>Not-to-be-Missed: </Text>
                        <Text style={styles.notToBeMissed}>
                        Take MegaZip - Asia’s #1 zipline above the jungle, across the beach and out to the island.
                        </Text>
                        <View style={styles.rectangle} />
                    </View>
                    <Image source={require('../assets/MegaAdventurePark.png')} style={styles.topPlacesImage} />
                </View>
            </View>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: 'white',
  },
  scrollViewContent: {
    paddingBottom: 20,
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
  backButton: {
    position: 'absolute',
    left: 20,
    top: 130,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    width: 32,
    height: 32,
  },
  backText: {
    color: '#3A4646',
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
    marginLeft: 6,
    top: 0.2,
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
  
  popularContainer: {
    width: 351,
    height: 204.22,
    position: 'relative',
    marginTop: -5,
    marginLeft: 21,
  },
  popularImage: {
    width: 351,
    height: 204.22,
    borderRadius: 30,
  },
  popularOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 30,
    zIndex: 1,
    // Shadow properties 
    shadowColor: '#92B7DA',
    shadowOffset: { width: 1, height: 35 },
    shadowOpacity: 0.12, // 12% opacity
    shadowRadius: 83,
  },
  popularTitle: {
    position: 'absolute',
    left: 17,
    top: 171,
    color: 'white',
    fontSize: 18,
    fontFamily: 'Nunito_800ExtraBold',
    zIndex: 2,
  },
  infoContainer: {
    marginLeft: 21,
    marginTop: 22,
    marginRight: 21,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 6,
    marginLeft: -5,
  },
  infoTitle: {
    color: '#006D77',
    fontSize: 18,
    fontFamily: 'Nunito_700Bold',
  },
  saveButton: {
    marginLeft: 'auto',
    backgroundColor: '#006D77',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveIcon: {
    width: 12,
    height: 14,
    marginRight: 6,
  },
  saveText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Nunito_800ExtraBold',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  description: {
    color: '#006D77',
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    marginBottom: 8,
  },
  notToBeMissed: {
    color: '#006D77',
    fontSize: 12,
    fontFamily: 'Nunito_400Regular_Italic',
    marginBottom: 5,
  },
  notToBeMissedBold: {
    color: '#006D77',
    fontSize: 12,
    fontFamily: 'Nunito_800ExtraBold_Italic',
  },
  rectangle: {
    width: 363,
    height: 2,
    backgroundColor: '#E6F1F2',
    marginTop: 14,
  },
  topPlacesImage: {
    width: 110,
    height: 110,
    borderRadius: 10,
    marginBottom: 15,
  },
});

export default HomePopular; // Ensure the component is exported