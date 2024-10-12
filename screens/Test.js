import React from "react";
import { View, StyleSheet } from "react-native";
import CustomCalendar from "../components/CustomCalendar";

const Test = () => {
  return (
    <View style={styles.container}>
      <CustomCalendar />
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});
