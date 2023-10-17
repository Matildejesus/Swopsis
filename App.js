import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function LogoScreen({ navigation }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Welcome")}
    >
      <Image source={require("./assets/logo.png")} style={styles.logo} />
    </TouchableOpacity>
  );
}

function WelcomeScreen({ navigation }) {
  return (
    <View styles={styles.container}>
      <TouchableOpacity
        // style={styles.welcomeContainer}
        onPress={() => navigation.navigate("Aboutus")}
      >
        <Image
          source={require("./assets/girls.png")}
          style={styles.girlsImage}
        />
      </TouchableOpacity>
      <Text>SWAP AND INSPIRED WITH A SHARED COMMUNITY WARDROBE</Text>
      <Button title="REGISTER" onPress={() => navigation.navigate("Map")} />
      <Button title="LOG IN" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}

function AboutusScreen({ navigation }) {
  return (
    <View styles={styles.container}>
      <TouchableOpacity
        // style={styles.container}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require("./assets/img4.png")}
          style={styles.girlsImage}
        />
      </TouchableOpacity>
      <Text>SWAP</Text>
      <Text>Impact</Text>
      <Text>BE YOU</Text>
      <Button title="REGISTER" onPress={() => navigation.navigate("Map")} />
      <Button title="LOG IN" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}

function LoginScreen({ navigation }) {
  return (
    <View styles={styles.container}>
      <Text>Log in</Text>
    </View>
  );
}

function MapScreen({ navigation }) {
  return (
    <View styles={styles.container}>
      <Text>Map</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Logo"
          component={LogoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Aboutus"
          component={AboutusScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
