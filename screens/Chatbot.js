import React, { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Keyboard,
} from "react-native";
import { Card } from "react-native-paper";
import Groq from "groq-sdk";
import axios from "axios";
import ArrowUp from "../assets/icons/ArrowUp.png";
import pause from "../assets/pause.png";
import FrogHead from "../assets/BigFrogHead.png";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { GROQ_KEY } from "@env";
import { fetchUserData } from "../api/authAPI";
import BASE_URL from "../config";
import { format } from "date-fns";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [forecast, setForecast] = useState(null);
  const [date, setDate] = useState(null);
  const [latest, setLatest] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [trips, setTrips] = useState([]);
  const [userId, setUserId] = useState(null);

  const initialMessage = "Hi! I'm Ribb!t, how can i help you today?";

  useEffect(() => {
    getDate();
    getWeather();
    setMessages([...messages, { text: initialMessage, from: "ai" }]);
  }, []);

  useEffect(() => {
    const loadUserId = async () => {
      try {
        let storedUserData = await AsyncStorage.getItem("userData");
        if (!storedUserData) {
          console.log("Fetching user data...");
          storedUserData = await fetchUserData();
          await AsyncStorage.setItem("userData", JSON.stringify(storedUserData));
        }
        const userData = JSON.parse(storedUserData);
        setUserId(userData.id);
      } catch (error) {
        console.error("Error loading user data:", error);
        Alert.alert("Error", "Failed to retrieve user data.");
      }
    };
    loadUserId();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchTrips();
    }, [userId])
  );

  const fetchTrips = async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`${BASE_URL}/api/users/${userId}/trips`);

      // Remove unnecessary fields and format each trip as a nicely formatted string
      const formattedTrips = response.data.map(
        ({ id, user_id, places_id, location_name, start_date, end_date }) => {
          const formattedStartDate = format(new Date(start_date), "d MMM yyyy");
          const formattedEndDate = format(new Date(end_date), "d MMM yyyy");

          return `${location_name} from ${formattedStartDate} to ${formattedEndDate}`;
        }
      );

      // Join each trip string with a newline for readability
      const tripsString = formattedTrips.join("\n");

      console.log(tripsString); // Log formatted string for debugging

      setTrips(tripsString); // Set trips state with the formatted string
    } catch (error) {
      console.log("Error loading trips:", error);
    }
  };

  const getDate = () => {
    const date = new Date();
    const options = {
      timeZone: "Asia/Singapore",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    const sgtDate = date.toLocaleString("en-SG", options);
    setDate(sgtDate);
  };

  const transformData = (apiResponse) => {
    // Extract area metadata into an easy-to-reference format
    const areaMetadata = apiResponse.data.area_metadata.reduce((acc, area) => {
      acc[area.name] = {
        latitude: area.label_location.latitude,
        longitude: area.label_location.longitude,
      };
      return acc;
    }, {});

    // Combine forecasts with area metadata
    const forecasts = apiResponse.data.items[0].forecasts;

    return forecasts.map((forecast) => ({
      location: forecast.area,
      weather_forecast: forecast.forecast,
    }));
  };

  const getWeather = async () => {
    const options = {
      method: "GET",
      url: "https://api-open.data.gov.sg/v2/real-time/api/two-hr-forecast",
    };

    try {
      const { data } = await axios.request(options);
      const transformedData = transformData(data);

      setForecast(transformedData);
    } catch (error) {
      console.error(error);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleSend = async () => {
    if (input.trim() === "") return;
    console.log(date);
    console.log(trips);
    setIsTyping(true);
    setMessages([...messages, { text: input, from: "user" }]);
    setInput("");
    Keyboard.dismiss();

    const groqMessages = messages.map((message) => ({
      role: message.from === "user" ? "user" : "assistant",
      content: message.text,
    }));

    // Add the current user input as the latest message in the chat history
    groqMessages.push({ role: "user", content: input });

    const formatForecastData = (forecast) => {
      return forecast.map((f) => `${f.location}: ${f.weather_forecast}`).join(", ");
    };

    // Inside your `handleSend` function
    const forecastString = formatForecastData(forecast);

    try {
      const groq = new Groq({
        apiKey: GROQ_KEY,
      });
      const response = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a Singapore travel planner to help users plan their day and give suggestions based on their response. This is the trips planned: ${trips}. Always give suggestions to the users on top of what they want. Do not answer queries unrelated to Singapore. Today's date is: ${date}.The current forecast is: ${forecastString}. Only use forecast given, do not add in additional details such as temperature. Use the weather condition to give recommendations about the place that the user asks. Always include the current weather in your response and avoid providing uncertain or false information. Do not use markdown in your response. Give reccomendations to the user. Please format your response as readable as possible`,
          },
          { role: "user", content: input },
          ...groqMessages,
        ],

        model: "llama3-8b-8192",
      });
      const messages = response.choices[0].message.content;
      setLatest(messages);

      const words = messages.split(" ");
      let currentMessage = "";

      // Initialize AI message in the chat history
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "", from: "ai" }, // Start with an empty AI message
      ]);

      dismissKeyboard();
      // Update the AI message incrementally by word
      for (const word of words) {
        currentMessage += word + " ";

        // Update the last message in the chat history (AI's message)
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1].text = currentMessage.trim();
          return updatedMessages;
        });

        // Small delay to simulate typing effect (optional)
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      setIsTyping(false);
    } catch (error) {
      console.error("Error fetching response:", error);
      setIsTyping(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={FrogHead} />
        <Text style={styles.frogTitle}>Ribb!t</Text>
        <Text style={styles.frogDescription}>Your trusted Froggie</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.messagesContainer}
        ref={(ref) => ref?.scrollToEnd({ animated: true })}>
        <View>
          {messages.map((message, index) => (
            <Card
              key={index}
              style={message.from === "user" ? styles.userMessage : styles.aiMessage}>
              <Text style={styles.messageText}>{message.text}</Text>
            </Card>
          ))}
        </View>
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Enter your message here!"
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Image source={isTyping ? pause : ArrowUp} style={styles.arrow} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  messagesContainer: {
    padding: 20,
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingTop: 50,
    paddingBottom: 20,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#cce5ff",
    marginRight: 20,
    marginLeft: 10,
    marginTop: 15,
    padding: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 25,
  },
  aiMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#e2e3e5",
    marginRight: 20,
    marginLeft: 10,
    marginTop: 15,
    padding: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    height: 80,
    marginLeft: 15,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#3A4646",
    padding: 20,
    borderRadius: 30,
    marginRight: 10,
    fontSize: 20,
    color: "#FFF",
    paddingLeft: 20,
    paddingRight: 70,
  },
  sendButton: {
    position: "absolute",
    right: 30,
    top: 20,
    backgroundColor: "#D9D9D9",
    padding: 10,
    height: 40,
    width: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignContent: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  topContainer: {
    alignItems: "center",
    paddingTop: 70,
    paddingBottom: 20,
    backgroundColor: "#FFF",
  },
  frogTitle: {
    fontSize: 30,
    padding: 5,
  },
  frogDescription: {
    fontSize: 15,
  },
  backButton: {
    position: "absolute",
    left: 40,
    top: 70,
    backgroundColor: "#D9D9D9",
    paddingLeft: 6,
    height: 40,
    width: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    height: 80,
    marginLeft: 15,
    marginBottom: 20,
  },
  scheduleContainer: {
    marginTop: 10, // Adjust spacing between input and schedule button
    alignItems: "center",
    marginBottom: 20, // Add space from bottom
  },
  scheduleButton: {
    backgroundColor: "#3A4646",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "40%", // Adjust the button width as needed
  },
  scheduleText: {
    color: "#FFF",
    fontSize: 16,
  },
  arrow: {
    width: 20,
    height: 20,
  },
});

export default Chatbot;
