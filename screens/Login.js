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

import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LoginImage from "../assets/images/LoginImage.png";
import VectorBackground from "../assets/images/Vector.png";
import InputField from "../components/InputField.js";
import PasswordField from "../components/PasswordField.js";
import Button from "../components/Button";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Mappit from "../components/Mappit.js";

import { validateEmail } from "../utils/authUtil.js";
import { loginUser } from "../api/authAPI.js";

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

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    try {
      console.log("Email:", email);
      console.log("Password:", password);
      const userData = await loginUser(email, password);

      // Save user data locally
      await AsyncStorage.setItem("userData", JSON.stringify(userData.user));

      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Login Failed", error.message || "Invalid email or password");
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
        <View style={styles.headerContainer}>
          <Text style={styles.header}>WELCOME BACK</Text>
        </View>
        <Mappit colour="#006D77" />

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
            onPress={() => navigation.navigate("ResetPW")}
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
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  cornerContainer: {
    position: "absolute",
    right: 50,
    top: 50,
    zIndex: 1, // Ensure the container is on top
  },
  headerContainer: {
    alignItems: "center",
    height: screenHeight * 0.15,
    width: screenWidth * 0.7,
  },
  header: {
    fontSize: 40,
    color: "#006D77",
    fontFamily: "Nunito_700Bold",
    textShadowColor: "#006D77",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },

  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  forgotPassword: {
    fontSize: 14,
    color: "#006D77",
    fontFamily: "Nunito_400Regular",
  },
  loginContainer: {
    height: screenHeight * 0.4,
    paddingHorizontal: screenHeight * 0.05,
    justifyContent: "center",
  },
  imageContainer: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.3,
    justifyContent: "center",
    marginHorizontal: screenWidth * 0.1,
    marginBottom: screenHeight * 0.02,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cornerImage: {
    position: "absolute",
    top: 0,
    width: screenWidth,
    height: screenHeight * 0.25,
    zIndex: -1, // Adjust this to be below the text
  },
  registrationContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  registrationText: {
    fontSize: 14,
    color: "#333333",
    fontFamily: "Nunito_400Regular",
  },
  registerLink: {
    color: "#006D77",
    fontFamily: "Nunito_700Bold",
  },
});
