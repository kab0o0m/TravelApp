import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const PlannerTabs = ({ destination, activeTab }) => {
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
    navigation.navigate(screenName, { trip: { location_name: destination } });
  };
  return (
    <View>
      {/* Header Section with Destination */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{`Trip to ${destination}`}</Text>
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
    fontWeight: "bold",
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
    color: "#666",
  },
  activeTabText: {
    color: "#000000",
    fontWeight: "bold",
  },
});

export default PlannerTabs;
