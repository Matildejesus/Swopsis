import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";

import WelcomeScreen from "./screens/WelcomeScreen.js";
import AboutUsScreen from "./screens/AboutUsScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import MapsScreen from "./screens/MapsScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import WardrobeScreen from "./screens/WardrobeScreen.js";
import SettingsScreen from "./screens/SettingsScreen.js";
import BeYouScreen from "./screens/BeYouScreen.js";
import EventsScreen from "./screens/EventsScreen.js";
import InboxScreen from "./screens/InboxScreen.js";

import Logo from "./components/icons/Logo.js";
import Title from "./components/Title.js";

import store from "./store/store.js";
import { Provider } from "react-redux";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTintColor: "#8E0040",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
      }}
    >
      <Tab.Screen
        name="Beyou"
        component={BeYouScreen}
        options={{
          headerRight: (props) => <Logo {...props} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitleAlign: "left",
          headerTitle: (props) => <Title title="Profile" {...props} />,
          headerRight: (props) => <Logo {...props} />,
        }}
      />
      <Tab.Screen
        name="Wardrobe"
        component={WardrobeScreen}
        options={{
          headerTitleAlign: "left",
          headerTitle: (props) => <Title title="Wardrobe" {...props} />,
          headerRight: (props) => <Logo {...props} />,
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={InboxScreen}
        options={{
          headerTitleAlign: "left",
          headerTitle: (props) => <Title title="Inbox" {...props} />,
          headerRight: (props) => <Logo {...props} />,
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{
          headerTitleAlign: "left",
          headerTitle: (props) => <Title title="Events" {...props} />,
          headerRight: (props) => <Logo {...props} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" headerMode="none">
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AboutUs"
            component={AboutUsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Maps"
            component={MapsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen
            name="InApp"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 300,
    height: 70,
  },
  welcomeContainer: {
    padding: 5,
  },
  girlsImage: {
    width: 390,
    height: 490,
  },
});
