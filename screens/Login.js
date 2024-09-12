import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Dimensions,
} from "react-native";
import LoginImage from "../assets/LoginImage.png";
import { Colors } from "react-native/Libraries/NewAppScreen";
import VectorBackground from "../assets/Vector-1.png"

const { width: screenWidth } = Dimensions.get("window"); 
const { height: screenHeight } = Dimensions.get("window"); 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    // Perform login logic here
    // For example, send a request to your authentication server

    Alert.alert("Success", "Logged in successfully");
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image
          source={VectorBackground}
          style={styles.cornerImage}
          resizeMode="contain"
        />
        <View style={styles.cornerContainer}>
            <Text style={styles.subHeader}>Mapp!t</Text>
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>WELCOME BACK</Text>
          </View>
          
          <View style={styles.imageContainer}>
            <Image source={LoginImage} style={styles.image} />
          </View>
          <View style={styles.loginContainer}>
            <Text style={styles.login}>Login</Text>

            <TextInput style={styles.input} onChangeText={setEmail} placeholder="EMAIL" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  cornerContainer: {
    position: "absolute",
    top: 100,
    right: 30,
  },
  appName: {
    fontSize: 30,
    color: "#FFF",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 50,
    marginTop: 100,
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    width: 250,
    
  },
  subHeader: {},
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    height: 60,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 12,
  },
  login: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#FFF",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    padding: 16,
  },
  loginContainer: {
    width: "100%",
    paddingBottom: 200, // Space for the keyboard
  },
  imageContainer: {
    width: screenWidth * 0.8,  // Adjust width relative to screen width
    height: screenWidth * 0.6, // Adjust height relative to screen width
    justifyContent: "center", // Center the image inside the container
    marginHorizontal: screenWidth*0.1,
  },
  image: {
    width: "100%",  // Make the image fill the width of the container
    height: "100%", // Make the image fill the height of the container
  },
  cornerImage: {
    position: "absolute",  // Ensures the image is positioned absolutely in the corner
    top: 0,               // Aligns it to the top of the screen
    right: 0,             // Aligns it to the right of the screen
    width: screenWidth * 0.4, // Set the width of the image
    height: screenHeight * 0.3, // Set the height relative to the screen
    zIndex: -1,           // Ensures the image is behind the text
  },
});