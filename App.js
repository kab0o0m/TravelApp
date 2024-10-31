import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Startpage from "./screens/Startpage";
import AuthCheck from "./screens/AuthCheck";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Chatbot from "./screens/Chatbot";
import Account from "./screens/Account";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";
import Home from "./screens/Home";
import HomeFeatured from "./screens/HomeFeatured";
import AIRandomiser from "./screens/AIRandomiser";
import ResetPW from "./screens/ResetPW";
import Planner from "./screens/Planner";
import PlannerNewTrip from "./screens/PlannerNewTrip";
import LocationSearch from "./screens/LocationSearch";
import SavedLocation from "./screens/SavedLocation";
import HomePopular from "./screens/HomePopular";
import Explore from "./screens/Explore";
import Test from "./screens/Test";
import Expenses from "./screens/Expenses";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AuthCheck">
          <Stack.Screen
            name="AuthCheck"
            component={AuthCheck}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Startpage"
            component={Startpage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeFeatured"
            component={HomeFeatured}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomePopular"
            component={HomePopular}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AIRandomiser"
            component={AIRandomiser}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chatbot"
            component={Chatbot}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ResetPW"
            component={ResetPW}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Planner"
            component={Planner}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PlannerNewTrip"
            component={PlannerNewTrip}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LocationSearch"
            component={LocationSearch}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SavedLocation"
            component={SavedLocation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Explore"
            component={Explore}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Test"
            component={Test}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Expenses"
            component={Expenses}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
});
