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
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useFonts,
  Nunito_600SemiBold,
  Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";

const NavBar = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;
  const insets = useSafeAreaInsets(); // Get safe area insets for padding adjustments

  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null; // Return null until fonts are loaded
  }

  const currentRouteName =
    navigation.getState().routes[navigation.getState().index].name;

  const renderButton = (screenName, label, icon) => {
    const isActive = currentRouteName === screenName;

    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(screenName)}
      >
        <Image source={icon} style={styles.image} resizeMode="contain" />
        <Text style={isActive ? styles.activeButtonText : styles.buttonText}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.NavBarContainer, { paddingBottom: insets.bottom }]}>
      {renderButton("Home", "Home", HomeIcon)}
      {renderButton("Expenses", "Budget", BudgetIcon)}
      {renderButton("Planner", "Planner", PlannerIcon)}
      {renderButton("Account", "Account", ProfileIcon)}
    </View>
  );
};

const styles = StyleSheet.create({
  NavBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingTop: 16, // Reduced top padding
    paddingBottom: 16, // Increased bottom padding
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Nunito_600SemiBold",
  },
  activeButtonText: {
    fontSize: 12,
    color: "#F47966",
    fontFamily: "Nunito_800ExtraBold",
  },
  image: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
});

export default NavBar;
