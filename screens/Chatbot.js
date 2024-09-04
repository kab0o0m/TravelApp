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
} from "react-native";
import { Card } from "react-native-paper";
import Groq from "groq-sdk";
import axios from "axios";
import ArrowUp from "../assets/ArrowUp.png";
import FrogHead from "../assets/FrogHead.png";
import ArrowLeft from "../assets/ArrowLeft.png";
import { useNavigation } from "@react-navigation/native";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState(null);
  const navigation = useNavigation();

  const initialMessage = "Hi, I'm Froggie, how can i help you today?";

  useEffect(() => {
    setMessages([...messages, { text: initialMessage, from: "ai" }]);
  }, []);

  const getWeather = async () => {
    const options = {
      method: "GET",
      url: "https://api-open.data.gov.sg/v2/real-time/api/twenty-four-hr-forecast",
    };

    try {
      const { data } = await axios.request(options);
      setWeather(data.data.records[0].general);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSend = async () => {
    getWeather();
    if (input.trim() === "") return;

    // Add user message to the chat history
    setMessages([...messages, { text: input, from: "user" }]);
    setInput("");

    try {
      const groq = new Groq({
        apiKey: "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",
        dangerouslyAllowBrowser: true,
      });
      const response = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are only a Singapore travel planner, do not entertain any other queries about other countries. The current weather in Singapore is ${weather} to help you with the response. You are use temperature and precipitation to help the user plan the trip. If user wants to schedule a timing, use this format Event: , Date: , Time: `,
          },
          { role: "user", content: input },
        ],
        model: "llama3-8b-8192",
      });
      const messages = response.choices[0].message.content;
      const parsedContent = response.choices[0].message.content;

      // You may need to parse the content to extract specific details like date, time, and title
      // This is an example assuming the response is structured like: "Event: 'Meeting with John', Date: '2023-09-10', Time: '15:00'"

      const parsedData = {
        title: parsedContent.match(/Event: '(.+?)'/)?.[1] || "Untitled Event",
        date: parsedContent.match(/Date: '(.+?)'/)?.[1] || null,
        time: parsedContent.match(/Time: '(.+?)'/)?.[1] || null,
      };

      const words = messages.split(" ");
      let currentMessage = "";

      // Initialize AI message in the chat history
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "", from: "ai" }, // Start with an empty AI message
      ]);

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
      <ScrollView
        contentContainerStyle={styles.messagesContainer}
        ref={(ref) => ref?.scrollToEnd({ animated: true })}>
        <View style={styles.topContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Login")}>
            <Image source={ArrowLeft} />
          </TouchableOpacity>
          <Image source={FrogHead} />
          <Text style={styles.frogTitle}>Frog Assistant</Text>
          <Text style={styles.frogDescription}>Your trusted frog ai</Text>
        </View>
        {messages.map((message, index) => (
          <Card key={index} style={message.from === "user" ? styles.userMessage : styles.aiMessage}>
            <Text style={styles.messageText}>{message.text}</Text>
          </Card>
        ))}
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
    marginBottom: 10,
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
    paddingTop: 20,
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
    left: 20,
    top: 30,
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
