import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import ProfilePicture from "../assets/ProfilePicture.png";
import Footer from "../components/Footer";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Account = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

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
      } catch (error) {
        console.error("Failed to load user data", error);
      }
    };

    loadUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>ACCOUNT</Text>
        </View>
        <View style={styles.userInfoSection}>
          <View>
            <Image source={ProfilePicture} />
          </View>
          <View style={styles.userTextContainer}>
            <Text style={styles.userName}>
              {firstName} {lastName}
            </Text>
            <TouchableOpacity
              style={styles.userInfoSectionProfileContainer}
              onPress={() => navigation.navigate("Profile")}
            >
              <Text style={styles.userInfoSectionProfile}>View my profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.accountSection}>
          <Text style={styles.settings}>Settings</Text>
          <TouchableOpacity
            style={styles.accountItem}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text style={styles.accountItemText}>Personal Information</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountItem} onPress={() => navigation.navigate("SavedLocation")}>
            <Text style={styles.accountItemText}>Saved Locations</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountItem}>
            <Text style={styles.accountItemText}>My Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountItem}>
            <Text style={styles.accountItemText}>My Messages</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountItem}>
            <Text style={styles.accountItemText}>Notification Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountItem}>
            <Text style={styles.accountItemText}>Help Centre</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <Footer />
      </View>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF7F7",
    paddingVertical: 30,
  },
  innerContainer: {
    paddingHorizontal: 20,
  },
  header: {
    padding: 20,
    marginTop: 20,
  },
  headerText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#006D77",
  },
  userInfoSection: {
    flexDirection: "row",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  userInfoSectionProfile: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    color: "#006D77",
  },
  userInfoSectionProfileContainer: {},
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
  accountSection: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  accountItem: {
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#F47966",
  },
  accountItemText: {
    fontSize: 18,
    color: "#333",
  },
  settings: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  userTextContainer: {
    flexDirection: "column",
    // alignItems: "center",
    marginLeft: 20,
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
