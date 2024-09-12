import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import ProfilePicture from "../assets/ProfilePicture.png";
import { useNavigation } from "@react-navigation/native";
import ArrowLeft from "../assets/ArrowLeft.png";

const Profile = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Account")} style={styles.closeButton}>
          <Image source={ArrowLeft} />
        </TouchableOpacity>
        <Text style={styles.headerText}>PROFILE</Text>
      </View>
      <View style={styles.userInfoSection}>
        <View>
          <Image source={ProfilePicture} />
        </View>
        <View style={styles.userTextContainer}>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userInfoSectionProfile}>Joined - Mar 2024</Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value="johndoe@email.com" editable={false} />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} value="+123456789" editable={false} />

        <Text style={styles.label}>Gender</Text>
        <TextInput style={styles.input} value="Male" editable={false} />

        <Text style={styles.label}>Date of Birth</Text>
        <TextInput style={styles.input} value="01/01/1990" editable={false} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("EditProfile")}>
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
    borderRadius: "50%",
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
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#3A4646",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F47966",
    borderRadius: 30,
    padding: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
