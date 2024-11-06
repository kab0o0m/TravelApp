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
  Button,
  TouchableOpacity,
} from "react-native";
import ProfilePicture from "../assets/icons/ProfilePicture.png";
import { useNavigation } from "@react-navigation/native";
import ArrowLeft from "../assets/icons/ArrowLeft.png";
import Edit from "../assets/icons/editprofile.png";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Toast from 'react-native-toast-message';
import { Picker } from "@react-native-picker/picker";
import { updateProfile, fetchUserData } from "../api/authAPI";

const EditProfile = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [gender, setGender] = useState(null);
  const [dobDate, setDobDate] = useState(null);
  const [dobStr, setDobStr] = useState("--/--/----");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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
          const fetchedUserData = await fetchUserData();
          await AsyncStorage.setItem(
            "userData",
            JSON.stringify(fetchedUserData)
          );
        }

        const userData = JSON.parse(storedUserData || "{}");
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setPhone(userData.phoneNumber);
        setGender(userData.gender);
        setDobDate(new Date(userData.dob)); // Assuming dob is in valid format
        setDobStr(formatDate(new Date(userData.dob)));
      } catch (error) {
        console.error("Failed to load user data", error);

        Alert.alert(
          "Session Expired",
          "Your session has expired. Redirecting to the login page...",
          [
            {
              text: "OK",
              onPress: () =>
                setTimeout(() => navigation.navigate("Login"), 2000),
            },
          ],
          { cancelable: false }
        );
      }
    };

    loadUserData();
  }, []);

  function formatDate(date, format = "dd/mm/yyyy") {
    if (!(date instanceof Date) || isNaN(date)) {
      throw new Error("Invalid Date object provided");
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();

    if (format === "dd/mm/yyyy") {
      return `${day}/${month}/${year}`;
    } else if (format === "yyyy-mm-dd") {
      return `${year}-${month}-${day}`;
    } else {
      throw new Error(
        "Invalid format specified. Use 'dd/mm/yyyy' or 'yyyy-mm-dd'."
      );
    }
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    console.log("A date has been picked: ", date);
    setDobDate(date);
    setDobStr(formatDate(date));
    hideDatePicker();
  };

  const updateUserDataInAsyncStorage = async (newUserData) => {
    try {
      const storedUserData = await AsyncStorage.getItem("userData");
      let userData = {};

      // If there's existing data, parse it
      if (storedUserData !== null) {
        userData = JSON.parse(storedUserData);
      }

      // Update the fields with the new values
      userData.firstName = newUserData.firstName || userData.firstName;
      userData.lastName = newUserData.lastName || userData.lastName;
      userData.email = newUserData.email || userData.email;
      userData.phoneNumber = newUserData.phoneNumber || userData.phoneNumber;
      userData.gender = newUserData.gender || userData.gender;
      userData.dob = newUserData.dob || userData.dob;

      // Save the updated user data back to AsyncStorage
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      console.log("[AsyncStorage] User data updated successfully");
    } catch (error) {
      console.error("Error updating user data in AsyncStorage", error);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  const handleUpdate = async () => {
    try {
      let dob_string = dobDate.toISOString().split("T")[0];
      const userData = await updateProfile(
        firstName,
        lastName,
        email,
        phone,
        gender,
        dob_string
      );

      await updateUserDataInAsyncStorage(userData);

      // Show success toast from the bottom
      Toast.show({
        type: "success",
        text1: "Profile Updated",
        text2: "Your profile has been updated successfully.",
        position: "bottom", // Show toast from the bottom
      });
      navigation.navigate("Profile");
    } catch (error) {
      Alert.alert(
        "Session Expired",
        "Your session has expired. Redirecting to the login page...",
        [
          {
            text: "OK",
            onPress: () => setTimeout(() => navigation.navigate("Login"), 2000),
          },
        ],
        { cancelable: false }
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
        extraHeight={150}
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
        <View style={styles.mainInputContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.nameInput}
                value={firstName}
                editable={true}
                onChangeText={setFirstName}
              />
            </View>
            <View style={styles.inputGroup}>
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

          <View style={styles.inputContainer}>
            <View style={[styles.inputGroup, styles.genderGroup]}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue) => setGender(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select" value="" />
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
            </View>
            <View style={[styles.inputGroup, styles.flexFill]}>
              <Text style={styles.label}>Date of Birth</Text>
              <TouchableOpacity onPress={showDatePicker}>
                <Text style={styles.nameInput}>{dobStr}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#FCF7F7",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
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
    marginBottom: 30,
  },
  image: {
    width: 100,
    height: 100,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  inputGroup: {
    flex: 1, // Makes both input fields the same width
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 20,
    marginLeft: 5,
    color: "#F47966",
  },
  input: {
    backgroundColor: "#F2F2F2",
    padding: 15,
    borderRadius: 8,
    fontSize: 18,
    color: "#777",
    borderWidth: 1,
    borderColor: "#3A4646",
  },
  emailInput: {
    backgroundColor: "#F2F2F2",
    padding: 15,
    borderRadius: 8,
    fontSize: 18,
    color: "#b2b3b5",
    borderWidth: 1,
    borderColor: "#b2b3b5",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 55,
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
  // genderDOB: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  // },
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
    marginRight: 10,
  },
  DOBInputContainer: {
    backgroundColor: "#F2F2F2",
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#3A4646",
    marginBottom: 20,
    width: 200,
    alignItems: "center",
    height: 80,
  },
  nameInput: {
    backgroundColor: "#F2F2F2",
    padding: 15,
    borderRadius: 8,
    fontSize: 20,
    color: "#777",
    borderWidth: 1,
    borderColor: "#3A4646",
  },
  editContainer: {
    position: "absolute",
    bottom: 0,
    right: -10,
  },
  mainInputContainer: {
    marginHorizontal: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  flexFill: {
    flex: 2, // Makes Date of Birth input larger
  },
  picker: {
    height: 58,
  },
  dobInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#F2F2F2",
    padding: 15,
    fontSize: 18,
  },
  genderGroup: {
    minWidth: 150, // Minimum width for the gender dropdown
    flex: 0, // Prevents it from growing, so Date of Birth can expand
  },
});
