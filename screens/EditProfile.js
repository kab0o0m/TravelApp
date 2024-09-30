import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import ProfilePicture from "../assets/ProfilePicture.png";
import { useNavigation } from "@react-navigation/native";
import ArrowLeft from "../assets/ArrowLeft.png";
import Edit from "../assets/editprofile.png";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from "react-native-date-picker";
import { updateProfile, fetchUserData } from "../api/authAPI";

const EditProfile = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [gender, setGender] = useState(null);
  const [dob, setDob] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

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
        setDob(new Date(userData.dob)); // Assuming dob is in valid format

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

  if (!fontsLoaded) {
    return null; // You can add a loading spinner or screen here if needed
  }

  const handleUpdate = async () => {
    try {
      let dob_string = dob.toISOString().split("T")[0]; // Format date as YYYY-MM-DD

      const userData = await updateProfile(
        firstName,
        lastName,
        email,
        phone,
        gender,
        dob_string
      );

      navigation.navigate("EditProfile");
    } catch (error) {
      Alert.alert("Update Failed", error.message);
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
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            style={styles.closeButton}
          >
            <Image source={ArrowLeft} />
          </TouchableOpacity>
          <Text style={styles.headerText}>EDIT PROFILE</Text>
        </View>
        <View style={styles.userInfoSection}>
          <View>
            <Image source={ProfilePicture} style={styles.image} />
            <TouchableOpacity style={styles.editContainer}>
              <Image source={Edit} style={styles.edit} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.genderDOB}>
            <View>
              <Text style={styles.label}> First Name</Text>
              <TextInput
                style={styles.nameInput}
                value={firstName}
                editable={true}
                onChangeText={setFirstName}
              />
            </View>

            <View>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.nameInput}
                value={lastName}
                editable={true}
                onChangeText={setLastName}
              />
            </View>
          </View>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.emailInput}
            value={email}
            editable={false}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            editable={true}
            onChangeText={setPhone}
          />

          <View style={styles.genderDOB}>
            <View>
              <Text style={styles.label}>Gender</Text>
              <TextInput
                style={styles.genderInput}
                value={gender}
                editable={true}
                onChangeText={setGender}
              />
            </View>
            <View>
              <Text style={styles.label}>Date of Birth</Text>
              <TouchableOpacity
                onPress={() => setOpen(true)} // Open the date picker
              >
                <TextInput
                  style={styles.DOBInput}
                  value={
                    dob
                      ? `${dob.getDate().toString().padStart(2, "0")}/${(
                          dob.getMonth() + 1
                        )
                          .toString()
                          .padStart(2, "0")}/${dob.getFullYear()}`
                      : ""
                  }
                  editable={false} // Disable manual editing
                  onChangeText={setDob}
                />
              </TouchableOpacity>
              <DatePicker
                modal
                mode="date"
                open={open}
                date={dob}
                onConfirm={(date) => {
                  setOpen(false);
                  setDob(date); // Set the selected date
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

export default EditProfile;

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
    borderRadius: 10,
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
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
  emailInput: {
    backgroundColor: "#F2F2F2",
    padding: 15,
    borderRadius: 8,
    fontSize: 18,
    color: "#b2b3b5",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#b2b3b5",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 30,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F47966",
    borderRadius: 30,
    width: "100%",
    padding: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  genderDOB: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  genderInput: {
    backgroundColor: "#F2F2F2",
    padding: 15,
    borderRadius: 8,
    fontSize: 18,
    color: "#777",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#3A4646",
    width: 150,
  },
  DOBInput: {
    backgroundColor: "#F2F2F2",
    padding: 15,
    borderRadius: 8,
    fontSize: 18,
    color: "#777",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#3A4646",
    width: 200,
  },
  nameInput: {
    backgroundColor: "#F2F2F2",
    padding: 15,
    borderRadius: 8,
    fontSize: 20,
    color: "#777",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#3A4646",
    width: 175,
  },
  editContainer: {
    position: "absolute",
    bottom: 0,
    right: -10,
  },
});
