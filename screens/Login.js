import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from '@react-navigation/native';
import LoginImage from "../assets/LoginImage.png";
import VectorBackground from "../assets/Vector-1.png";
import InputField from '../components/InputField.js';
import PasswordField from '../components/PasswordField.js';
import Button from '../components/Button'; // Import the Button component
import { useFonts, Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';

const { width: screenWidth } = Dimensions.get("window");
const { height: screenHeight } = Dimensions.get("window");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return null; // You can add a loading spinner or screen here if needed
  }

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    // Perform login logic here
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
          {/* Email Field */}
          <InputField
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          {/* Password Field */}
          <PasswordField
            label="Password"
            value={password}
            onChangeText={setPassword}
          />

          {/* Forgot Password */}
          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() => Alert.alert("Forgot Password", "Password recovery logic here")}
          >
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <Button 
            title="Login" 
            onPress={handleLogin} 
            backgroundColor="#F47966"
            textColor="#FFFFFF"
            paddingVertical={15}
            borderRadius={25}
          />

          {/* Registration Text */}
          <View style={styles.registrationContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.registrationText}>
                Don’t have an account?{" "}
                <Text style={styles.registerLink}>Register Here</Text>
              </Text>
            </TouchableOpacity>
          </View>
          
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
    width: screenWidth * 0.2,  // Adjust width relative to screen width
    marginLeft: screenWidth * 0.75,
    marginVertical: screenHeight * 0.05,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: screenHeight * 0.1, // Reduced margin to bring header closer
    height: screenHeight * 0.15,
    width: screenWidth * 0.7,
  },
  header: {
    fontSize: 40, // Increase font size slightly for better visibility
    color: "#006D77",
    fontFamily: "Nunito_700Bold", // Bold font family
    textShadowColor: "#006D77", // Darker shadow for a thicker appearance
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset
    textShadowRadius: 5, // Shadow radius to make text appear thicker
  },
  subHeader: {
    color: "#006D77",
    fontSize: 20,
    fontFamily: "Nunito_700Bold", // Bold font family
    textShadowColor: "#006D77", // Darker shadow for a thicker appearance
    textShadowOffset: { width: 0.5, height: 0.5 }, // Shadow offset
    textShadowRadius: 1, // Shadow radius to make text appear thicker
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#006D77',
    fontFamily: 'Nunito_400Regular',
  },
  loginContainer: {
    height: screenHeight * 0.4,
    paddingHorizontal: screenHeight * 0.05,
    justifyContent: 'center', // Center content vertically
  },
  imageContainer: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.3, 
    justifyContent: "center",
    marginHorizontal: screenWidth * 0.1,
    marginBottom: screenHeight * 0.02
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cornerImage: {
    position: "absolute",
    top: 0,
    right: 0,
    width: screenWidth * 0.4,
    height: screenHeight * 0.3,
    zIndex: -1,
  },
  registrationContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  registrationText: {
    fontSize: 14,
    color: '#333333',
    fontFamily: 'Nunito_400Regular',
  },
  registerLink: {
    color: '#006D77',
    fontFamily: 'Nunito_700Bold',
  },
});
