import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import Startpagebackground from "../assets/Startpagebackground.png";
import { useNavigation } from "@react-navigation/native";

const Homepage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground source={Startpagebackground} style={styles.backgroundImage}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>EXPLORE THE WORLD</Text>
          <Text style={styles.subHeader}>Mapp!t</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.buttonText}>Start My Journey</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A4646",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  header: {
    color: "#FFFFFF",
    fontSize: 50,
    paddingBottom: 500,
    width: 250,
    marginRight: 120,
    fontWeight: "bold",
  },
  subHeader: {
    position: "absolute",
    right: -80,
    top: -20,
    color: "#FFFFFF",
    fontSize: 30,
    textAlign: "center",
    paddingHorizontal: 80,
    fontWeight: "bold",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
  },
  button: {
    backgroundColor: "#C1CB9C",
    paddingVertical: 15,
    borderRadius: 30,
    width: 250,
    textAlign: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
