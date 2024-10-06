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
import VectorBackground from "../assets/Vector.png";
import InputField from "../components/InputField.js";
import Button from "../components/Button";
import { useFonts, Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { validateEmail } from "../utils/authUtil.js";
import { requestPasswordReset } from "../api/resetPW"; // Import the password reset function

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Login = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleResetPW = async () => {
    if (!email) {
      Alert.alert("Error", "Please fill in Email");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    try {
      // Call the requestPasswordReset function and pass the email
      const result = await requestPasswordReset(email);
      Alert.alert("Success", "Password reset link has been sent to your email.");
      navigation.navigate("Login"); // Optionally navigate to the Login screen
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to send reset link. Please try again.");
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
        extraHeight={150}
        enableAutomaticScroll={true}
      >
        <Image source={VectorBackground} style={styles.cornerImage} resizeMode="cover" />
        <View style={styles.topContainer}>
          <Text style={styles.header}>Mapp!t</Text>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.subHeader}>Forgot Password</Text>
          <Text style={styles.caption}>
            Enter the email address associated with your account and we will send you a link to reset your password.
          </Text>
        </View>

        <View style={styles.resetPWContainer}>
          <InputField
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={{ marginBottom: 20 }}
          />

          <Button
            title="Continue"
            onPress={handleResetPW}
            backgroundColor="#F47966"
            textColor="#FFFFFF"
            paddingVertical={15}
            borderRadius={25}
          />

          <View style={styles.registrationContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.registrationText}>
                Back to <Text style={styles.registerLink}>Login</Text>
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
  topContainer: {
    position: "absolute",
    left: "40%",
    top: "15%",
    width: screenWidth,
    zIndex: 1,
  },
  headerContainer: {
    alignItems: "flex-start",
    marginTop: screenHeight * 0.28,
    height: screenHeight * 0.15,
    width: screenWidth,
  },
  header: {
    color: "#006D77",
    fontSize: 32, // Increase font size for better visibility
    fontFamily: "Nunito_700Bold",
    textShadowColor: "#006D77",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
    zIndex: 2, // Ensure the text is above other elements
  },
  subHeader: {
    color: "#006D77",
    fontSize: 40,
    fontFamily: "Nunito_700Bold",
    textShadowColor: "#006D77",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
    marginLeft: screenWidth * 0.09,
    marginBottom: 10
  },
  resetPWContainer: {
    height: screenHeight * 0.25,
    marginHorizontal: screenWidth * 0.1,
    justifyContent: "center",
  },
  cornerImage: {
    position: "absolute",
    top: 0,
    width: screenWidth,
    height: screenHeight * 0.25,
    zIndex: -1,
  },
  registrationContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  registerLink: {
    color: "#006D77",
    fontFamily: "Nunito_700Bold",
  },
  caption: {
    fontFamily: "Nunito_700Bold",
    width: "200px",
    wordWrap: "break-word",
    marginLeft: screenWidth * 0.05,
    textAlign: "center",
  },
});
