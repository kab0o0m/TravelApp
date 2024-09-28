import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import ProfilePicture from "../assets/ProfilePicture.png";
import { useNavigation } from "@react-navigation/native";
import ArrowLeft from "../assets/ArrowLeft.png";
import Edit from "../assets/editprofile.png";

const EditProfile = () => {
  const navigation = useNavigation();
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [gender, setGender] = useState(null);
  const [dob, setDob] = useState(null);

  return (
    <View style={styles.container}>
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
            <TextInput style={styles.nameInput} value="john" editable={true} />
          </View>

          <View>
            <Text style={styles.label}>Last Name</Text>
            <TextInput style={styles.nameInput} value="doe" editable={true} />
          </View>
        </View>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value="johndoe@email.com"
          editable={true}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} value="+123456789" editable={true} />

        <View style={styles.genderDOB}>
          <View>
            <Text style={styles.label}>Gender</Text>
            <TextInput
              style={styles.genderInput}
              value="Male"
              editable={true}
            />
          </View>
          <View>
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput
              style={styles.DOBInput}
              value="01/01/1990"
              editable={true}
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#3A4646",
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
    fontSize: 16,
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
    fontSize: 16,
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
    fontSize: 16,
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
