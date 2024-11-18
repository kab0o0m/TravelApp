import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const PlannerTabs = ({ trip, activeTab }) => {
  const navigation = useNavigation();

  const handleTabPress = (tab) => {
    let screenName;
    switch (tab) {
      case "Overview":
        screenName = "PlannerOverview";
        break;
      case "Itinerary":
        screenName = "PlannerItinerary";
        break;
      case "Explore":
        screenName = "Explore";
        break;
      default:
        screenName = "PlannerOverview";
    }

    if (trip) {
      navigation.navigate(screenName, {
        trip, // Pass the entire trip object
      });
    } else {
      console.warn("No trip data available to navigate");
    }
  };
  console.log("Received trip in PlannerTabs:", trip);

  return (
    <SafeAreaView edges={["top"]} style={styles.safeAreaContainer}>
      <View>
        {/* Header Section with Destination */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            {trip?.location_name
              ? `Trip to ${trip.location_name}`
              : "No Destination Set"}
          </Text>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          {["Overview", "Itinerary", "Explore"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => handleTabPress(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerText: {
    fontSize: 18,
    fontFamily: "Nunito_700Bold", // Nunito Bold for the header text
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tab: {
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#F47966",
  },
  tabText: {
    fontSize: 16,
    fontFamily: "Nunito_400Regular", // Nunito Regular for tab text
    color: "#666",
  },
  activeTabText: {
    fontFamily: "Nunito_700Bold", // Nunito Bold for active tab text
    color: "#000000",
  },
});

export default PlannerTabs;
