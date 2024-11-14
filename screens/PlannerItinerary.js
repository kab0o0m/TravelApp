import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import PlannerTabs from "../components/PlannerTabs";
import NavBar from "../components/NavBar";
import Chatbot from "../components/ChatbotButton";

const PlannerItinerary = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { trip } = route.params || {};
  const destination = trip?.location_name || "Unknown Destination";
  const [expandedDates, setExpandedDates] = useState([]);

  // Sample itinerary data
  const itineraryData = [
    {
      date: "Tue 24/9",
      items: [
        {
          title: "Singapore Cable Car",
          description:
            "The Singapore Cable Car connects Mount Faber, Sentosa, and HarbourFront, offering panoramic city and waterfront views.",
        },
      ],
    },
    { date: "Wed 25/9", items: [] },
    { date: "Thu 26/9", items: [] },
    { date: "Fri 27/9", items: [] },
  ];

  const toggleDate = (date) => {
    setExpandedDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
  };

  return (
    <View style={styles.container}>
      {/* Use PlannerTabs with the destination and activeTab="Itinerary" */}
      <PlannerTabs destination={destination} activeTab="Itinerary" />

      <ScrollView style={styles.contentContainer}>
        <Chatbot />
        {/* Date selection buttons */}
        <View style={styles.dateButtonContainer}>
          {itineraryData.map((entry) => (
            <TouchableOpacity key={entry.date} style={styles.dateButton}>
              <Text style={styles.dateButtonText}>{entry.date}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Itinerary items */}
        {itineraryData.map((entry) => (
          <View key={entry.date}>
            <TouchableOpacity onPress={() => toggleDate(entry.date)} style={styles.dateContainer}>
              <Text style={styles.dateText}>{entry.date}</Text>
              <Text style={styles.expandIcon}>
                {expandedDates.includes(entry.date) ? "▲" : "▼"}
              </Text>
            </TouchableOpacity>
            {expandedDates.includes(entry.date) && (
              <View style={styles.itemsContainer}>
                {entry.items.length > 0 ? (
                  entry.items.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                      {/* Ensure item.image exists before rendering */}
                      {item.image ? <Image source={item.image} style={styles.itemImage} /> : null}
                      <View style={styles.itemContent}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        <Text style={styles.itemDescription}>{item.description}</Text>
                      </View>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noItemsText}>No items for this date</Text>
                )}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  dateButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  dateButton: {
    backgroundColor: "#E0F4F4",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  dateButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0F4F4",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  expandIcon: {
    fontSize: 18,
    color: "#666",
  },
  itemsContainer: {
    padding: 10,
    backgroundColor: "#F4FAFA",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  itemDescription: {
    fontSize: 14,
    color: "#666",
  },
  noItemsText: {
    color: "#999",
    fontStyle: "italic",
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

export default PlannerItinerary;
