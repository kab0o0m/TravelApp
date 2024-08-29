import React from "react";
import { View, Text, StyleSheet, Image, Button, Alert } from "react-native";
import rafiki from "../assets/rafiki.jpg";

const Homepage = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>TOURWINDER</Text>
        <Text>Plan your tour and forget, we will remind you in advance!</Text>
      </View>
      <View>
        <Image source={rafiki} style={styles.image} />
      </View>
      <View>
        <Button title="Get Started" onPress={() => Alert.alert("Button pressed")} />
      </View>
    </View>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A4646",
    alignItems: "center",
    justifyContent: "center",
  },
});
