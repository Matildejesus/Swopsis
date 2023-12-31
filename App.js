import * as React from "react";
import { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Text, Image, View } from "react-native";
import Svg, {
  G,
  Path,
  Rect,
  Defs,
  ClipPath,
  Pattern,
  Use,
  Circle,
} from "react-native-svg";

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
import ResetPasswordScreen from "./screens/ResetPasswordScreen.js";
import PostItemScreen from "./screens/PostItemScreen.js";

import Logo from "./components/icons/Logo.js";
import Title from "./components/Title.js";

import store from "./store/store.js";
import { Provider } from "react-redux";
import CalendarScreen from "./screens/CalendarScreen.js";
import ImpactScreen from "./screens/ImpactScreen.js";
import Colors from "./constants/colors.js";
import { AppRegistry } from "react-native";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Toast from "react-native-toast-message";
import ItemScreen from "./screens/ItemScreen.js";
import { SafeAreaProvider } from "react-native-safe-area-context";

AppRegistry.registerComponent("main", () => App);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarInactiveTintColor: Colors.primary1,
        tabBarStyle: { height: 90, backgroundColor: "#DACFD4" },
        headerStyle: {
          height: 100,
        },
      }}
    >
      <Tab.Screen
        name="Beyou"
        component={BeYouScreen}
        options={{
          headerLeft: (props) => <Logo {...props} />,
          headerTitle: "",
          tabBarIcon: (props) => {
            return (
              <>
                <Text
                  style={{ color: Colors.primary1, fontFamily: "RalewayBold" }}
                >
                  BE
                </Text>
                <Text
                  style={{ color: Colors.primary1, fontFamily: "RalewayBold" }}
                >
                  YOU
                </Text>
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitleAlign: "left",
          headerTitle: (props) => <Title title="Profile" {...props} />,
          headerRight: (props) => <Logo {...props} />,
          tabBarIcon: (props) => {
            return (
              <Image
                style={{ width: 35, height: 35 }}
                source={require("./assets/images/user2.png")}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Wardrobe"
        component={WardrobeScreen}
        options={{
          headerTitleAlign: "left",
          headerTitle: "",
          headerLeft: (props) => <Logo {...props} />,
          tabBarIcon: (props) => {
            return (
              <View
                style={{
                  position: "absolute",
                  bottom: 10,
                  alignItems: "center",
                  alignSelf: "center",
                  width: 109,
                  height: 109,
                  justifyContent: "center",
                }}
              >
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="109"
                  height="109"
                  viewBox="0 0 109 109"
                  fill="none"
                  style={{ position: "absolute", zIndex: 1 }}
                >
                  <Circle cx="54.5" cy="54.5" r="54.5" fill="#FFF" />
                </Svg>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="94"
                  height="94"
                  viewBox="0 0 94 94"
                  fill="none"
                  style={{ position: "absolute", zIndex: 2 }}
                >
                  <Circle cx="47" cy="47" r="47" fill="#DACFD4" />
                </Svg>
                <Image
                  style={{
                    width: 59,
                    height: 59,
                    position: "absolute",
                    top: (109 - 59) / 2, // centers the image vertically in the circle
                    zIndex: 3,
                    alignSelf: "center",
                  }}
                  source={require("./assets/images/wardrobe.png")}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={InboxScreen}
        options={{
          headerTitleAlign: "left",
          headerTitle: (props) => <Title title="Inbox" {...props} />,
          headerRight: (props) => <Logo {...props} />,
          tabBarIcon: (props) => {
            return (
              <Svg
                width="32"
                height="27"
                viewBox="0 0 37 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <G id="&#240;&#159;&#166;&#134; icon &#34;chat&#34;">
                  <Path
                    id="Vector"
                    d="M0 0V22.8571L4.57143 18.2857H9.14286V4.57143H22.8571V0H0ZM13.7143 9.14286V27.4286H32L36.5714 32V9.14286H13.7143Z"
                    fill="#8E0040"
                  />
                </G>
              </Svg>
            );
          },
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{
          headerTitle: "",
          headerLeft: (props) => <Logo {...props} />,
          tabBarIcon: (props) => {
            return (
              <Image
                style={{ width: 35, height: 35 }}
                source={require("./assets/images/events.png")}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    RalewayBold: require("./assets/fonts/Raleway-Bold.ttf"),
    RalewayBoldItalic: require("./assets/fonts/Raleway-BoldItalic.ttf"),
    RalewayItalic: require("./assets/fonts/Raleway-Italic.ttf"),
    RalewayLight: require("./assets/fonts/Raleway-Light.ttf"),
    RalewayLightItalic: require("./assets/fonts/Raleway-LightItalic.ttf"),
    RalewayMedium: require("./assets/fonts/Raleway-Medium.ttf"),
    RalewayMediumItalic: require("./assets/fonts/Raleway-MediumItalic.ttf"),
    RalewayRegular: require("./assets/fonts/Raleway-Regular.ttf"),
    RalewaySemiBold: require("./assets/fonts/Raleway-SemiBold.ttf"),
    RalewaySemiBoldItalic: require("./assets/fonts/Raleway-SemiBoldItalic.ttf"),
    RalewayThin: require("./assets/fonts/Raleway-Thin.ttf"),
    RalewayThinItalic: require("./assets/fonts/Raleway-ThinItalic.ttf"),
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterThin: require("./assets/fonts/Inter-Thin.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });
  console.log("App Rendered. Fonts loaded:", fontsLoaded);

  // const onLayoutRootView = useCallback(async () => {
  //   console.log("onLayoutRootView called. Fonts loaded:", fontsLoaded);

  //   if (fontsLoaded) {
  //     console.log("Hiding Splash Screen");
  //     await SplashScreen.hideAsync();
  //     console.log("Splash Screen Hidden");
  //   }
  // }, [fontsLoaded]);

  if (!fontsLoaded) {
    console.log("Fonts are still loading...");
    return null;
  }

  console.log("Fonts loaded, hiding splash screen");
  SplashScreen.hideAsync();

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
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
              <Stack.Screen
                name="ResetPassword"
                component={ResetPasswordScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                  headerTitleAlign: "left",
                  // headerTransparent: true,
                  headerBackVisible: false,
                  headerTitle: (props) => (
                    <Title title="SETTINGS" goBack="true" {...props} />
                  ),
                  headerRight: (props) => <Logo {...props} />,
                }}
              />
              <Stack.Screen
                name="Item"
                component={ItemScreen}
                options={{
                  headerTitle: "",

                  headerRight: (props) => <Logo {...props} />,
                }}
              />
              <Stack.Screen
                name="PostItem"
                component={PostItemScreen}
                options={{
                  headerTitleAlign: "left",
                  // headerTransparent: true,
                  headerBackVisible: false,
                  headerTitle: (props) => <Title goBack="true" {...props} />,
                  headerRight: (props) => <Logo {...props} />,
                }}
              />
              <Stack.Screen
                name="Calendar"
                component={CalendarScreen}
                options={{
                  headerTitleAlign: "left",
                  // headerTransparent: true,
                  headerBackVisible: false,
                  headerTitle: (props) => (
                    <Title title="CALENDAR" goBack="true" {...props} />
                  ),
                  headerRight: (props) => <Logo {...props} />,
                }}
              />
              <Stack.Screen
                name="Impact"
                component={ImpactScreen}
                options={{
                  headerTitleAlign: "left",
                  headerStyle: {
                    backgroundColor: Colors.impact,
                  },
                  // headerTransparent: true,
                  headerBackVisible: false,
                  headerTitle: (props) => (
                    <Title title="IMPACT" goBack="true" {...props} />
                  ),
                  headerRight: (props) => <Logo {...props} />,
                }}
              />
              <Stack.Screen
                name="InApp"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
        <Toast />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
