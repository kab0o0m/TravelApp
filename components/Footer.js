import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import HomeIcon from "../assets/icons/Home.png";
import BudgetIcon from "../assets/icons/Budget.png";
import PlannerIcon from "../assets/icons/Planner.png";
import ProfileIcon from "../assets/icons/Profile.png";
import { useNavigation } from "@react-navigation/native";

const Footer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
        <Image source={HomeIcon} style={styles.image} resizeMode="contain" />
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Expenses")}>
        <Image source={BudgetIcon} style={styles.image} resizeMode="cover" />
        <Text style={styles.buttonText}>Budget</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Planner")}>
        <Image source={PlannerIcon} style={styles.image} resizeMode="contain" />
        <Text style={styles.buttonText}>Planner</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Account")}>
        <Image source={ProfileIcon} style={styles.image} resizeMode="contain" />
        <Text style={styles.buttonText}>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // For Android shadow
  },
  button: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
  },
  image: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
});

export default Footer;
