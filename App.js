import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Homepage from "./components/Homepage";

export default function App() {
  return (
    <View style={styles.container}>
      <Homepage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
});
