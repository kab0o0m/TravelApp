import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import PlannerTabs from "../components/PlannerTabs";
import NavBar from "../components/NavBar";

const PlannerOverview = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { destination, dates } = route.params || {};

  // Tab state
  const [activeTab, setActiveTab] = useState("Overview");

  // const [activeTab, setActiveTab] = useState("Overview");
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [isPlacesOpen, setIsPlacesOpen] = useState(false);
  const [isAddTitleOpen, setIsAddTitleOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [tempNotes, setTempNotes] = useState("");
  const [places, setPlaces] = useState([]);
  const [titles, setTitles] = useState(["Untitled"]);

  // Tab navigation functions
  const handleTabPress = (tab) => {
    setActiveTab(tab);
    navigation.navigate(tab); // Navigate to the corresponding tab screen
  };

  // Callback to handle adding a place from Explore
  const handlePlaceSelect = (selectedPlace) => {
    setPlaces((prevPlaces) => [
      ...prevPlaces,
      {
        id: (prevPlaces.length + 1).toString(),
        name: selectedPlace.title,
        description: selectedPlace.description,
        image: selectedPlace.photoUrl || "https://via.placeholder.com/150",
      },
    ]);
  };

  const navigateToExplore = () => {
    navigation.navigate("Explore", {
      onPlaceSelect: handlePlaceSelect, // Pass the callback to Explore
    });
  };

  const toggleNotes = () => {
    setIsNotesOpen(!isNotesOpen);
    if (!isNotesOpen) {
      setTempNotes(notes);
    }
  };

  const handleDoneNotes = () => {
    setNotes(tempNotes);
    setIsEditingNotes(false);
  };

  const deletePlace = (id) => {
    setPlaces(places.filter((place) => place.id !== id));
  };

  const addNewTitleSection = () => {
    setTitles([...titles, "Untitled"]);
  };

  return (
    <View style={styles.container}>
      {/* Use PlannerTabs with the destination and activeTab="Overview" */}
      <PlannerTabs destination={destination} activeTab="Overview" />

      <ScrollView style={styles.contentContainer}>
        {/* Notes Section */}
        <TouchableOpacity
          onPress={toggleNotes}
          style={styles.sectionHeaderContainer}
        >
          <AntDesign
            name={isNotesOpen ? "up" : "down"}
            size={16}
            color="black"
          />
          <Text style={styles.sectionHeader}>Notes</Text>
        </TouchableOpacity>
        {isNotesOpen && (
          <View>
            {isEditingNotes ? (
              <View>
                <TextInput
                  style={styles.sectionContentInput}
                  placeholder="Write or paste general notes here, e.g., how to get there"
                  value={tempNotes}
                  onChangeText={setTempNotes}
                  multiline
                />
                <TouchableOpacity
                  onPress={handleDoneNotes}
                  style={styles.doneButton}
                >
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setIsEditingNotes(true);
                  setTempNotes(notes);
                }}
              >
                <Text style={styles.notesDisplay}>
                  {notes || "No notes added"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Places to Visit Section */}
        <TouchableOpacity
          onPress={() => setIsPlacesOpen(!isPlacesOpen)}
          style={styles.sectionHeaderContainer}
        >
          <AntDesign
            name={isPlacesOpen ? "up" : "down"}
            size={16}
            color="black"
          />
          <Text style={styles.sectionHeader}>Places to visit</Text>
        </TouchableOpacity>
        {isPlacesOpen && (
          <View>
            {places.length === 0 ? (
              <Text style={styles.noPlacesText}>No places added yet.</Text>
            ) : (
              <FlatList
                data={places}
                renderItem={({ item }) => (
                  <View style={styles.placeItem}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.placeImage}
                    />
                    <View>
                      <Text style={styles.placeTitle}>{item.name}</Text>
                      <Text style={styles.placeDescription}>
                        {item.description}
                      </Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item) => item.id}
              />
            )}
            {/* Add Place Input Field */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Explore", {
                  onPlaceSelect: handlePlaceSelect,
                })
              }
              style={styles.addPlaceInput}
            >
              <Text style={styles.addPlaceInputText}>Add a place</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Add Multiple Titles */}
        <TouchableOpacity
          onPress={() => setIsAddTitleOpen(!isAddTitleOpen)}
          style={styles.sectionHeaderContainer}
        >
          <AntDesign
            name={isAddTitleOpen ? "up" : "down"}
            size={16}
            color="black"
          />
          <Text style={styles.sectionHeader}>Add a title</Text>
        </TouchableOpacity>
        {isAddTitleOpen && (
          <View>
            {titles.map((title, index) => (
              <TextInput
                key={index}
                style={styles.sectionContentInput}
                placeholder="Enter a title..."
                value={title}
                onChangeText={(newTitle) => {
                  const updatedTitles = [...titles];
                  updatedTitles[index] = newTitle;
                  setTitles(updatedTitles);
                }}
              />
            ))}
            <TouchableOpacity
              style={styles.newListButton}
              onPress={addNewTitleSection}
            >
              <Text style={styles.newListButtonText}>+ New list</Text>
            </TouchableOpacity>
          </View>
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

  picker: {
    marginTop: 10,
    alignSelf: "center",
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  arrowIcon: {
    marginRight: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  sectionContentInput: {
    padding: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
    backgroundColor: "#f9f9f9",
  },
  doneButton: {
    alignSelf: "flex-end",
    marginTop: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "#FF7043",
    borderRadius: 5,
  },
  doneButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  notesDisplay: {
    padding: 10,
    color: "#666",
    fontStyle: "italic",
  },
  addPlaceInput: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: "#F3F4F6", // light gray to resemble input field
  },
  addPlaceInputText: {
    fontSize: 16,
    color: "#9CA3AF", // gray color for placeholder text
  },
  placeItem: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  placeImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  placeTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  placeDescription: {
    color: "#666",
    marginTop: 2,
  },
  newListButton: {
    backgroundColor: "#FF7043",
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
});

export default PlannerOverview;
