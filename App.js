import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import Homepage from "./screens/Homepage";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Chatbot from "./screens/Chatbot";
import Account from "./screens/Account";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";
import Test from "./screens/Test";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Homepage">
        <Stack.Screen name="Homepage" component={Homepage} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Chatbot" component={Chatbot} options={{ headerShown: false }} />
        <Stack.Screen name="Account" component={Account} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
        <Stack.Screen name="Test" component={Test} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
});
