import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Modal,
} from "react-native";
import Startpagebackground from "../assets/images/Startpagebackground.png";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import Mappit from "../components/Mappit";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";

SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from auto-hiding

const Startpage = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
    });
    [navigation];

    if (!modalVisible) {
      SplashScreen.hideAsync(); // Hide the splash screen once fonts are loaded
    }
  }, [modalVisible]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={Startpagebackground} style={styles.backgroundImage}>
        <Mappit colour="#fff" />

        <View style={styles.headerContainer}>
          <Text style={styles.header}>EXPLORE THE WORLD</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
            <Text style={styles.buttonText}>Start My Journey</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Startpage;

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
    marginRight: 90,
    fontFamily: "Nunito_800ExtraBold",
  },
  subHeader: {
    position: "absolute",
    right: -80,
    top: 20,
    color: "#FFFFFF",
    fontSize: 25,
    textAlign: "center",
    paddingHorizontal: 80,
    fontWeight: "bold",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
  },
  button: {
    backgroundColor: "#F47966",
    paddingVertical: 15,
    borderRadius: 30,
    width: 250,
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    height: 40,
    width: 40,
  },
  plane: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
