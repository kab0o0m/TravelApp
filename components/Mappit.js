import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";

const Mappit = ({ colour }) => {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return null; // You can add a loading spinner or screen here if needed
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: colour }]}>Mapp!t</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 35, // adjust for status bar or notch
    right: 30, // adjust spacing from the right edge
    zIndex: 10, // ensures it stays above other content
  },
  text: {
    fontSize: 24,
    fontFamily: "Nunito_700Bold",
  },
});

export default Mappit;
