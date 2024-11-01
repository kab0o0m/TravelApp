import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import HomeIcon from "../assets/icons/Home.png";
import BudgetIcon from "../assets/icons/Budget.png";
import PlannerIcon from "../assets/icons/Planner.png";
import ProfileIcon from "../assets/icons/Profile.png";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const NavBar = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;

  const renderButton = (screenName, label, icon) => {
    const IsFocused = useIsFocused(); //check if a screen is active

    const buttonStyle =
      IsFocused &&
      navigation.getState().routes[navigation.getState().index].name ===
        screenName
        ? styles.activeButton
        : styles.button;

    const textStyle =
      IsFocused &&
      navigation.getState().routes[navigation.getState().index].name ===
        screenName
        ? styles.activeButtonText
        : styles.buttonText;

    return (
      <TouchableOpacity
        style={buttonStyle}
        onPress={() => navigation.navigate(screenName)}
      >
        <Image source={icon} style={styles.image} resizeMode="contain" />
        <Text style={textStyle}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.NavBarContainer,
        { paddingHorizontal: screenWidth * 0.05 },
      ]}
    >
      {renderButton("Home", "Home", HomeIcon)}
      {renderButton("Expenses", "Budget", BudgetIcon)}
      {renderButton("Planner", "Planner", PlannerIcon)}
      {renderButton("Account", "Account", ProfileIcon)}
    </View>
  );
};

const styles = StyleSheet.create({
  NavBarContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // For Android shadow
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  activeButton: {
    flex: 1,
    alignItems: "center",
  },
  activeButtonText: {
    fontSize: 16,
    color: "#F47966",
  },
  image: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
});

export default NavBar;
