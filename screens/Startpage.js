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
import Chatbot from "./Chatbot";
import FrogIcon from "../assets/Frog.png";
import ArrowLeft from "../assets/icons/ArrowLeft.png";
import plane from "../assets/images/Plane.png";
import background from "../assets/images/background.png";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from auto-hiding

const Startpage = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

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
      <ImageBackground
        source={Startpagebackground}
        style={styles.backgroundImage}
      >
        <TouchableOpacity style={styles.iconContainer} onPress={toggleModal}>
          <Image source={FrogIcon} style={styles.icon} resizeMode="contain" />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                onPress={toggleModal}
                style={styles.closeButton}
              >
                <Image source={ArrowLeft} />
              </TouchableOpacity>

              <Chatbot />
            </View>
          </View>
        </Modal>

        <View style={styles.headerContainer}>
          <Text style={styles.header}>EXPLORE THE WORLD</Text>
          <Text style={styles.subHeader}>Mapp!t</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Home")}
          >
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
    backgroundColor: "#F47966",
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
  icon: {
    height: 40,
    width: 40,
  },
  iconContainer: {
    position: "absolute",
    backgroundColor: "#002C30",
    padding: 10,
    borderRadius: 30,
    zIndex: 999,
    right: 30,
    bottom: 200,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    top: 80,
    left: 30,
    zIndex: 999,
    padding: 15,
    backgroundColor: "#D9D9D9",
    borderRadius: 30,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  plane: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
