import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const PlannerOverview = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Overview");
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isPlacesOpen, setIsPlacesOpen] = useState(false);
  const [isAddTitleOpen, setIsAddTitleOpen] = useState(false);

  useEffect(() => {
    if (selectedLocation) {
      setDestination(selectedLocation.title);
    }
  }, [selectedLocation]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Trip to Sentosa</Text>
      </View>

      {/* Navigation Tabs */}
      <View style={styles.tabContainer}>
        {["Overview", "Itinerary", "Explore"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
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

      {/* Overview Content */}
      {activeTab === "Overview" && (
        <ScrollView style={styles.contentContainer}>
          {/* Notes Section */}
          <TouchableOpacity onPress={() => setIsNotesOpen(!isNotesOpen)}>
            <Text style={styles.sectionHeader}>Notes</Text>
          </TouchableOpacity>
          {isNotesOpen && <Text style={styles.sectionContent}>This is a sample :)</Text>}

          {/* Places to Visit Section */}
          <TouchableOpacity onPress={() => setIsPlacesOpen(!isPlacesOpen)}>
            <Text style={styles.sectionHeader}>Places to visit</Text>
          </TouchableOpacity>
          {isPlacesOpen && (
            <View style={styles.sectionContent}>
              <Text>1. Singapore Cable Car</Text>
              <Text>Description: The Singapore Cable Car connects Mount Faber, Sentosa, and HarbourFront, offering panoramic city and waterfront views.</Text>
            </View>
          )}

          {/* Add Title Section */}
          <TouchableOpacity onPress={() => setIsAddTitleOpen(!isAddTitleOpen)}>
            <Text style={styles.sectionHeader}>Add a title</Text>
          </TouchableOpacity>
          {isAddTitleOpen && (
            <View style={styles.sectionContent}>
              <Text>Add a place</Text>
            </View>
          )}

          {/* New List Button */}
          <TouchableOpacity style={styles.newListButton}>
            <Text style={styles.newListButtonText}>+ New list</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tab: {
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "bold",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 10,
  },
  sectionContent: {
    paddingVertical: 5,
    paddingLeft: 10,
    color: "#333",
  },
  newListButton: {
    backgroundColor: "#F47966",
    borderRadius: 8,
    alignItems: "center",
    padding: 10,
    marginVertical: 20,
  },
  newListButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
  },
  navItem: {
    alignItems: "center",
  },
});

export default PlannerOverview;