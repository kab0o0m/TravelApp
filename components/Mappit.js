import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Mappit = ({ colour }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: colour }]}>Mapp!t</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 30, // adjust for status bar or notch
    right: 30, // adjust spacing from the right edge
    zIndex: 10, // ensures it stays above other content
  },
  text: {
    fontSize: 26,
    fontWeight: "bold",
  },
});

export default Mappit;
