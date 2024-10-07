import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useFonts, Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Expenses = () => {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Add a loading spinner or screen here if needed
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Expenses</Text>
    </View>
  );
};

export default Expenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: screenHeight * 0.05, // Adjust top padding for placement
    paddingLeft: screenWidth * 0.05, // Adjust left padding for placement
  },
  header: {
    fontSize: 24,
    fontFamily: 'Nunito_700Bold', // App font
    color: '#006D77', // Your app color
  },
});
