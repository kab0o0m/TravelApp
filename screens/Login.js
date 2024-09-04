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
} from "react-native";
import LoginImage from "../assets/LoginImage.png";

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
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>WELCOME BACK</Text>
          </View>
          <View style={styles.cornerContainer}>
            <Text style={styles.subHeader}>Mapp!t</Text>
          </View>
          <View>
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
        </ScrollView>
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
});
