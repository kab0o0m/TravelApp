import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfilePicture from "../assets/ProfilePicture.png";
import { useNavigation } from "@react-navigation/native";
import ArrowLeft from "../assets/ArrowLeft.png";

const Profile = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [gender, setGender] = useState(null);
  const [dob, setDob] = useState(new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        if (storedUserData == null) {
          console.log("fetching");
          storedUserData = await fetchUserData();
          // Save user data locally
          await AsyncStorage.setItem(
            "userData",
            JSON.stringify(storedUserData)
          );
        }
        

        const userData = JSON.parse(storedUserData);

        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setPhone(userData.phoneNumber);
        setGender(userData.gender);
        setDob(userData.dob); // Assuming dob is in valid format

      } catch (error) {
        console.error("Failed to load user data", error);

        // Show an alert in case of error
        Alert.alert(
          "Session Expired",
          "Your session has expired. Redirecting to the login page...",
          [
            {
              text: "OK",
              onPress: () => {
                // Redirect after 2 seconds
                setTimeout(() => {
                  navigation.navigate("Login");
                }, 2000);
              },
            },
          ],
          { cancelable: false }
        );
      }
    };

    loadUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Account")}
          style={styles.closeButton}
        >
          <Image source={ArrowLeft} />
        </TouchableOpacity>
        <Text style={styles.headerText}>PROFILE</Text>
      </View>
      <View style={styles.userInfoSection}>
        <View>
          <Image source={ProfilePicture} />
        </View>
        <View style={styles.userTextContainer}>
          <Text style={styles.userName}>{firstName} {lastName}</Text>
          <Text style={styles.userInfoSectionProfile}>Joined - Mar 2024</Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          editable={false}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} value={phone} editable={false} />

        <Text style={styles.label}>Gender</Text>
        <TextInput style={styles.input} value={gender} editable={false} />

        <Text style={styles.label}>Date of Birth</Text>
        <TextInput style={styles.input} value={dob} editable={false} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF7F7",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 40,
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#D9D9D9",
    borderRadius: 30,
    marginRight: 20,
  },
  headerText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#006D77",
  },
  userInfoSection: {
    flexDirection: "row",
    borderRadius: 10,
    marginVertical: 20,
    alignItems: "center",
  },
  userInfoSectionProfile: {
    paddingVertical: 10,
    borderRadius: 10,
    color: "#006D77",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#232332",
  },
  userEmail: {
    fontSize: 16,
    color: "#777",
    marginTop: 5,
  },
  userTextContainer: {
    marginLeft: 20,
  },

  inputContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#F47966",
  },
  input: {
    backgroundColor: "#F2F2F2",
    padding: 15,
    borderRadius: 8,
    fontSize: 18,
    color: "#777",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#3A4646",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F47966",
    borderRadius: 30,
    width: "100%",
    padding: 20,
  },
});
