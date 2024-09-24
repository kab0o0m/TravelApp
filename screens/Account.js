import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import ProfilePicture from "../assets/ProfilePicture.png";
import { useNavigation } from "@react-navigation/native";

const Account = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>ACCOUNT</Text>
      </View>
      <View style={styles.userInfoSection}>
        <View>
          <Image source={ProfilePicture} />
        </View>
        <View style={styles.userTextContainer}>
          <Text style={styles.userName}>John Doe</Text>
          <TouchableOpacity
            style={styles.userInfoSectionProfileContainer}
            onPress={() => navigation.navigate("Profile")}>
            <Text style={styles.userInfoSectionProfile}>View my profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.accountSection}>
        <Text style={styles.settings}>Settings</Text>
        <TouchableOpacity style={styles.accountItem} onPress={() => navigation.navigate("Profile")}>
          <Text style={styles.accountItemText}>Personal Information</Text>
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
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF7F7",
    paddingHorizontal: 20,
    paddingVertical: 30,
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
    alignItems: "center",
    marginLeft: 20,
  },
});