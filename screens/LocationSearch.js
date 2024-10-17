import React, { useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, Image, Dimensions, Animated } from 'react-native';
import { useFonts, Nunito_600SemiBold } from '@expo-google-fonts/nunito';

const { width: screenWidth } = Dimensions.get('window');

const LocationSearch = () => {
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
  });

  // Animated value to control the search bar position
  const searchBarY = useRef(new Animated.Value(100)).current; // Starts at Y offset of 100

  // This useEffect hook will animate the search bar to the top
  useEffect(() => {
    Animated.timing(searchBarY, {
      toValue: 0, // Move to the top (Y offset = 0)
      duration: 500, // Duration of animation in ms
      useNativeDriver: true,
    }).start();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Animated view for the search bar */}
      <Animated.View style={[styles.searchContainer, { transform: [{ translateY: searchBarY }] }]}>
        <Image source={require('../assets/Search.png')} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Discover a Country"
          placeholderTextColor="#A9A9A9"
        />
      </Animated.View>

      {/* Other content can go here */}
    </View>
  );
};

export default LocationSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 50, // Add some top padding for the animation
  },
  searchContainer: {
    width: screenWidth - 40,
    height: 61,
    flexDirection: 'row',
    backgroundColor: '#E6F1F2',
    borderRadius: 20,
    padding: 10,
    boxShadow: '1px 35px 83px 1px rgba(146, 183, 218, 0.12)',
    alignItems: 'center',
    marginHorizontal: 20,
    position: 'absolute', // To allow it to animate from any Y position
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
    color: '#006D77',
    fontSize: 20,
    fontFamily: 'Nunito_600SemiBold',
    fontWeight: '600',
    width: 290,
  },
});
