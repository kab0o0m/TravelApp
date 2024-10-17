import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Dimensions, Image, ActivityIndicator, Linking, Animated } from 'react-native';
import { useFonts, Nunito_600SemiBold } from '@expo-google-fonts/nunito';

const { width: screenWidth } = Dimensions.get('window');

// Sample list of recommendations (you can replace this with actual data or an API call)
const locations = [
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Australia',
    'India',
    'Japan',
    'Brazil',
    'China',
    'Russia',
    'South Africa',
    'Mexico',
  ];

const LocationSearch = () => {
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
  });

  const [searchText, setSearchText] = useState(''); // State to track the input
  const [filteredLocations, setFilteredLocations] = useState([]); // State to store filtered recommendations

  // Animated value to control the search bar position
  const searchBarY = useRef(new Animated.Value(100)).current; // Starts at Y offset of 100

  // This useEffect hook will animate the search bar to the top
  useEffect(() => {
    Animated.timing(searchBarY, {
      toValue: 0, // Move to the top (Y offset = 0)
      duration: 300, // Duration of animation in ms
      useNativeDriver: true,
    }).start();
  }, []);

  // Handle search input changes
  const handleSearchChange = (text) => {
    setSearchText(text);

    // Filter the locations based on the search text
    const filtered = locations.filter((location) =>
      location.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredLocations(filtered);
  };

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
          value={searchText}
          onChangeText={handleSearchChange}
        />
      </Animated.View>

      {/* Display filtered recommendations */}
      {searchText.length > 0 && filteredLocations.length > 0 && (
        <View style={styles.recommendationsContainer}>
          <FlatList
            data={filteredLocations}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.recommendationItem}>
                <Text style={styles.recommendationText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
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
  recommendationsContainer: {
    marginTop: 80, // Position below the search bar
    marginHorizontal: 20,
  },
  recommendationItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E6F1F2',
  },
  recommendationText: {
    fontSize: 18,
    color: '#006D77',
    fontFamily: 'Nunito_600SemiBold',
  },
});
