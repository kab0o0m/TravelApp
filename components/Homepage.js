import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import Homescreen from "../assets/Homescreen.png";

const Homepage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>TOURWINDER</Text>
        <Text style={styles.subHeader}>
          Plan your tour and forget, we will remind you in advance!
        </Text>
      </View>
      <View>
        <Image source={Homescreen} style={styles.image} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => Alert.alert("Button pressed")}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A4646",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    position: "absolute",
    top: 150,
    alignItems: "center",
    marginBottom: 50,
  },
  header: {
    color: "#FFFFFF",
    fontSize: 50,
    paddingBottom: 30,
  },
  subHeader: {
    color: "#FFFFFF",
    fontSize: 15,
    textAlign: "center",
    paddingLeft: 80,
    paddingRight: 80,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 150,
    width: "90%",
  },
  button: {
    backgroundColor: "#C1CB9C",
    paddingVertical: 15,
    borderRadius: 30,
    width: "100%",
    textAlign: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: 400,
    height: 350,
  },
});
