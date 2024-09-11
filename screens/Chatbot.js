import React, { useState, useEffect } from "react";
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
import ArrowUp from "../assets/ArrowUp.png";
import FrogHead from "../assets/FrogHead.png";
import { useNavigation } from "@react-navigation/native";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [temperatureHigh, setTemperatureHigh] = useState(null);
  const [temperatureLow, setTemperatureLow] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [date, setDate] = useState(null);

  const initialMessage = "Hi, I'm Froggie, how can i help you today?";

  useEffect(() => {
    getDate();
    getWeather();
    setMessages([...messages, { text: initialMessage, from: "ai" }]);
  }, []);

  const getDate = () => {
    const date = new Date();
    const options = {
      timeZone: "Asia/Singapore",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    const sgtDate = date.toLocaleString("en-SG", options);
    console.log(sgtDate);
    setDate(sgtDate);
  };

  const getWeather = async () => {
    const options = {
      method: "GET",
      url: "https://api-open.data.gov.sg/v2/real-time/api/twenty-four-hr-forecast",
    };

    try {
      const { data } = await axios.request(options);
      setTemperatureHigh(data.data.records[0].general.temperature.high);
      setTemperatureLow(data.data.records[0].general.temperature.low);
      setForecast(data.data.records[0].general.forecast.text);
    } catch (error) {
      console.error(error);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const extractEventDetails = (aiResponse) => {
    const eventMatch = aiResponse.match(/Event: (.+?),/);
    const dateMatch = aiResponse.match(/Date: (\d{2}-\d{2}-\d{4})/);
    const timeMatch = aiResponse.match(/Time: (.+?)(?:$|\.)/);

    return {
      event: eventMatch ? eventMatch[1].trim() : "Untitled Event",
      date: dateMatch ? dateMatch[1] : null,
      time: timeMatch ? timeMatch[1].trim() : null,
    };
  };

  const handleSend = async () => {
    if (input.trim() === "") return;
    getDate();
    // Add user message to the chat history
    setMessages([...messages, { text: input, from: "user" }]);
    setInput("");

    const groqMessages = messages.map((message) => ({
      role: message.from === "user" ? "user" : "assistant",
      content: message.text,
    }));

    // Add the current user input as the latest message in the chat history
    groqMessages.push({ role: "user", content: input });

    try {
      const groq = new Groq({
        apiKey: "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",
        dangerouslyAllowBrowser: true,
      });
      const response = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a Singapore travel planner. Do not answer queries unrelated to Singapore. Today's date is: ${date}.The current temperature is high: ${temperatureHigh}, low: ${temperatureLow}, with a forecast of ${forecast}. Use these weather details (high, low, and forecast) to help the user plan their trip. Always include the current weather in your response and avoid providing uncertain or false information. Format any scheduling requests as follows: Event: '', Date: 'DD-MM-YYYY',  Time: 24-hour clock. Do not use markdown in your response.`,
          },
          { role: "user", content: input },
          ...groqMessages,
        ],

        model: "llama3-8b-8192",
      });
      const messages = response.choices[0].message.content;
      console.log(messages);
      const parsedData = extractEventDetails(messages);
      console.log(parsedData);

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
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={FrogHead} />
        <Text style={styles.frogTitle}>Frog Assistant</Text>
        <Text style={styles.frogDescription}>Your trusted frog ai</Text>
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
          <Image source={ArrowUp} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    borderRadiusBottomRight: 0,
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
    borderRadius: "50%",
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
    borderRadius: "50%",
    justifyContent: "center",
    alignContent: "center",
  },
});

export default Chatbot;
