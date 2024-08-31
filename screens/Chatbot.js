import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button, Card } from "react-native-paper";
import Groq from "groq-sdk";
import { GROQ_API_KEY } from "@env";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim() === "") return;

    // Add user message to the chat history
    setMessages([...messages, { text: input, from: "user" }]);
    setInput("");

    try {
      const groq = new Groq({
        apiKey: { GROQ_API_KEY },
        dangerouslyAllowBrowser: true,
      });
      const response = await groq.chat.completions.create({
        messages: [
          { role: "system", content: "You are a travel planner" },
          { role: "user", content: input },
        ],
        model: "llama3-8b-8192",
      });

      const messages = response.choices[0].message.content;
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
          placeholder="Type a message..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  messagesContainer: {
    padding: 10,
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#cce5ff",
    margin: 5,
    padding: 10,
    borderRadius: 5,
  },
  aiMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#e2e3e5",
    margin: 5,
    padding: 10,
    borderRadius: 5,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingBottom: 50,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Chatbot;
