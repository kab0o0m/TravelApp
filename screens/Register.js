import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";

import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import VectorBackground from "../assets/Vector.png";
import InputField from "../components/InputField.js";
import PasswordField from "../components/PasswordField.js";
import Button from "../components/Button"; // Import the Button component
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { validateEmail } from "../utils/authUtil.js";
import { signup } from "../api/authAPI.js";

const { width: screenWidth } = Dimensions.get("window");
const { height: screenHeight } = Dimensions.get("window");

const Register = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return null; // You can add a loading spinner or screen here if needed
  }

  const handleRegister = async () => {
    if (!email || !password || !firstname || !lastname) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (password !== confirmpassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      console.log("Email:", email);
      console.log("Password:", password);
      const userData = await signup(firstname, lastname, email, password);

      // Save user data locally
      await AsyncStorage.setItem('userData', JSON.stringify(userData.user));

      navigation.navigate("Account");
    } catch (error) {
      Alert.alert(
        "Registration Failed",
        error.message || "Invalid email or password"
      );
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAwareScrollView
        style={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.scrollContainer}
        extraHeight={150} // This extra height helps prevent blocking
        enableAutomaticScroll={true}
      >
        <Image
          source={VectorBackground}
          style={styles.cornerImage}
          resizeMode="cover"
        />
        <View style={styles.cornerContainer}>
          <Text style={styles.subHeader}>Mapp!t</Text>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>REGISTER</Text>
          <Text style={styles.caption}>Create your new account</Text>
        </View>

        <View style={styles.loginContainer}>
          {/* Name Field */}
          <View style={styles.nameFieldsContainer}>
            <InputField
              label="First Name"
              value={firstname}
              onChangeText={setFirstName}
              keyboardType="default"
              flex={1}
              style={[styles.input, styles.firstNameInput]}
            />
            <InputField
              label="Last Name"
              value={lastname}
              onChangeText={setLastName}
              keyboardType="default"
              flex={1}
              style={[styles.input]}
            />
          </View>

          <InputField
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <PasswordField
            label="Password"
            value={password}
            onChangeText={setPassword}
            marginBottom={5}
          />
          <PasswordField
            label="Confirm Password"
            value={confirmpassword}
            onChangeText={setConfirmPassword}
            marginBottom={5}
          />

          {/* Login Button */}
          <Button
            title="Register"
            onPress={handleRegister}
            backgroundColor="#F47966"
            textColor="#FFFFFF"
            paddingVertical={15}
            borderRadius={25}
          />

          {/* Registration Text */}
          <View style={styles.registrationContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.registrationText}>
                Have an account?{" "}
                <Text style={styles.loginLink}>Login Here</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  cornerContainer: {
    position: "absolute",
    right: 50,
    top: 50,
    zIndex: 1,
  },
  headerContainer: {
    alignItems: "flex-start",
    marginTop: screenHeight * 0.1, // Reduced margin to bring header closer
    height: screenHeight * 0.15,
    width: screenWidth * 0.7,
    marginHorizontal: screenWidth * 0.1,
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
    fontSize: 25,
    fontFamily: "Nunito_700Bold", // Bold font family
    textShadowColor: "#006D77", // Darker shadow for a thicker appearance
    textShadowOffset: { width: 0.5, height: 0.5 }, // Shadow offset
    textShadowRadius: 1, // Shadow radius to make text appear thicker
  },
  buttonText: {
    color: "#006D77",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Nunito_700Bold",
  },
  input: {
    height: 45, // Ensure consistent height for all input fields
    borderColor: "#DDDDDD",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontFamily: "Nunito_400Regular",
  },
  loginContainer: {
    height: screenHeight * 0.6,
    marginHorizontal: screenWidth * 0.1,
    justifyContent: "center", // Center content vertically
    zIndex: -999,
  },
  cornerImage: {
    position: "absolute", // Ensures the image is positioned absolutely in the corner
    top: 0, // Aligns it to the top of the screen
    width: screenWidth,
    height: screenHeight * 0.25,
    zIndex: -1, // Ensures the image is behind the text
  },
  registrationContainer: {
    marginTop: 10, // Adjust margin to position the text correctly
    alignItems: "center", // Center the text horizontally
  },
  loginText: {
    fontSize: 14,
    color: "#333333",
    fontFamily: "Nunito_400Regular",
  },
  loginLink: {
    color: "#006D77",
    fontFamily: "Nunito_700Bold",
  },
  caption: {
    fontFamily: "Nunito_700Bold",
  },
  nameFieldsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  firstNameInput: {
    marginRight: screenWidth * 0.02, // Add space between First Name and Last Name
  },
});
