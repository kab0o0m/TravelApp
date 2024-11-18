import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import PlannerTabs from "../components/PlannerTabs";
import NavBar from "../components/NavBar";
import BASE_URL from "../config"; // Ensure your BASE_URL is properly configured

const PlannerItinerary = () => {
  const route = useRoute();
  const { trip } = route.params || {}; // Extract trip from route params
  const tripId = trip?.id;
  const destination = trip?.location_name || "Unknown Destination";
  const [dates, setDates] = useState([]);
  const [expandedDates, setExpandedDates] = useState([]);

  useEffect(() => {
    const fetchTripDates = async () => {
      if (!tripId) {
        console.error("Trip ID is missing.");
        return;
      }

      try {
        console.log("Fetching data for tripId:", tripId);
        const response = await axios.get(`${BASE_URL}/api/trips/${tripId}`);
        console.log("API Response:", response.data);

        const { start_date, end_date } = response.data;
        const start = new Date(start_date);
        const end = new Date(end_date);
        const dateArray = [];

        while (start <= end) {
          const formattedDate = start.toLocaleDateString("en-GB", {
            weekday: "short",
            day: "2-digit",
            month: "2-digit",
          });
          dateArray.push(formattedDate);
          start.setDate(start.getDate() + 1);
        }

        console.log("Generated Dates:", dateArray);
        setDates(dateArray);
      } catch (error) {
        console.error("Error fetching trip dates:", error);
      }
    };

    fetchTripDates();
  }, [tripId, trip.user_id]);

  const toggleDate = (date) => {
    setExpandedDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
  };

  return (
    <View style={styles.container}>
      <PlannerTabs trip={trip} activeTab="Itinerary" />
      <ScrollView style={styles.contentContainer}>
        {dates.length > 0 ? (
          dates.map((date) => (
            <View key={date}>
              <TouchableOpacity
                onPress={() => toggleDate(date)}
                style={styles.dateContainer}
              >
                <Text style={styles.dateText}>{date}</Text>
                <Text style={styles.expandIcon}>
                  {expandedDates.includes(date) ? "▲" : "▼"}
                </Text>
              </TouchableOpacity>
              {expandedDates.includes(date) && (
                <View style={styles.itemsContainer}>
                  <Text style={styles.noItemsText}>No items for this date</Text>
                </View>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.loadingText}>Loading dates...</Text>
        )}
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
  noItemsText: {
    color: "#999",
    fontStyle: "italic",
  },
  loadingText: {
    color: "#999",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 20,
  },
});

export default PlannerItinerary;
