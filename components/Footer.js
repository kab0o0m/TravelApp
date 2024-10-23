import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import HomeIcon from "../assets/Home.png";
import BudgetIcon from "../assets/Budget.png";
import PlannerIcon from "../assets/Planner.png";
import ProfileIcon from "../assets/Profile.png";
import { useNavigation } from "@react-navigation/native";

const Footer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
        <Image source={HomeIcon} style={styles.image} resizeMode="cover" />
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Expenses")}>
        <Image source={BudgetIcon} style={styles.image} resizeMode="cover" />
        <Text style={styles.buttonText}>Budget</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Planner")}>
        <Image source={PlannerIcon} style={styles.image} resizeMode="cover" />
        <Text style={styles.buttonText}>Planner</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Account")}>
        <Image source={ProfileIcon} style={styles.image} resizeMode="cover" />
        <Text style={styles.buttonText}>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f8f8f8",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 20,
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
});

export default Footer;
