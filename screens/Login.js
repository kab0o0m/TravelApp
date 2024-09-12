import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons
import LoginImage from "../assets/LoginImage.png";
import VectorBackground from "../assets/Vector-1.png";
import InputField from '../components/InputField.js';
import PasswordField from '../components/PasswordField.js';

const { width: screenWidth } = Dimensions.get("window");
const { height: screenHeight } = Dimensions.get("window");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    // Perform login logic here
    Alert.alert("Success", "Logged in successfully");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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

          {/* Email Field */}
          <InputField
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          {/* Password Field */}
          <PasswordField
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() => Alert.alert("Forgot Password", "Password recovery logic here")}
          >
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

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
    width: screenWidth * 0.2,  // Adjust width relative to screen width
    marginLeft: screenWidth*0.8,
    marginVertical: screenHeight*0.05,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: screenHeight*0.1,
    height: screenHeight*0.2,
    width: screenWidth*0.7,

  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    
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
    marginBottom: 12,
    flex: 1,
  },
  passwordInput: {
    paddingRight: 40, // Space for the eye icon
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333333",
  },
  login: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#FFF",
  },
  loginContainer: {
    width: "100%",
    paddingBottom: 200, // Space for the keyboard
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: screenWidth * 0.8,  // Adjust width relative to screen width
    height: screenWidth * 0.6, // Adjust height relative to screen width
    justifyContent: "center", // Center the image inside the container
    marginHorizontal: screenWidth * 0.1,
  },
  image: {
    width: "100%",  // Make the image fill the width of the container
    height: "100%", // Make the image fill the height of the container
  },
  cornerImage: {
    position: "absolute", // Ensures the image is positioned absolutely in the corner
    top: 0, // Aligns it to the top of the screen
    right: 0, // Aligns it to the right of the screen
    width: screenWidth * 0.4, // Set the width of the image
    height: screenHeight * 0.3, // Set the height relative to the screen
    zIndex: -1, // Ensures the image is behind the text
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative', // Ensure the container is positioned relative to its normal position
    marginBottom: 12,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: '50%', // Center the icon vertically
    transform: [{ translateY: -10 }], // Adjust for vertical centering
  },
  forgotPasswordContainer: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#007BFF',
  },
});
