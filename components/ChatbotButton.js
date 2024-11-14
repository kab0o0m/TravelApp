import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Modal, Image, StyleSheet } from "react-native";
import Chatbot from "../screens/Chatbot"; // Adjust the path based on your project structure
import FrogIcon from "../assets/Frog.png";
import ArrowLeft from "../assets/icons/ArrowLeft.png";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from auto-hiding

const ChatbotButton = () => {
  //console.log("Rendering ChatbotButton");
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    if (!modalVisible) {
      SplashScreen.hideAsync(); // Hide splash screen if applicable
    }
  }, [modalVisible]);

  return (
    <View>
      {/* Chatbot Button */}
      <TouchableOpacity style={styles.iconContainer} onPress={toggleModal}>
        <Image source={FrogIcon} style={styles.icon} resizeMode="contain" />
      </TouchableOpacity>

      {/* Chatbot Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Image source={ArrowLeft} />
            </TouchableOpacity>

            <Chatbot />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    backgroundColor: "#002C30",
    padding: 10,
    borderRadius: 30,
    zIndex: 999,
    right: 30,
    bottom: 110,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 5,
  },
  icon: {
    height: 42,
    width: 42,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
});

export default ChatbotButton;
