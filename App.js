import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";
import 'react-native-get-random-values';

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { RootSiblingParent } from "react-native-root-siblings";
import { Text, Image, View } from "react-native";
import Svg, { G, Path, Circle } from "react-native-svg";

import WelcomeScreen from "./screens/starter/WelcomeScreen.js";
import MapsScreen from "./screens/starter/MapsScreen.js";
import RegisterScreen from "./screens/starter/RegisterScreen.js";
import LoginScreen from "./screens/starter/LoginScreen.js";
import ProfileScreen from "./screens/bottomNav/ProfileScreen.js";
import ResetPasswordScreen from "./screens/starter/ResetPasswordScreen.js";
import PostcodeScreen from "./screens/starter/PostcodeScreen.js";
import ImpactScreen from "./screens/ImpactScreen.js";
import BeYouScreen from "./screens/bottomNav/BeYouScreen.js";
import SettingsScreen from "./screens/SettingsScreen.js";
import EventsScreen from "./screens/bottomNav/EventsScreen.js";
import InboxScreen from "./screens/bottomNav/InboxScreen.js";
import WardrobeScreen from "./screens/bottomNav/WardrobeScreen.js";
import CalendarScreen from "./screens/CalendarScreen.js";
import GroupCreateScreen from "./screens/admin/GroupCreateScreen.js";
import ProfileItemScreen from "./screens/ProfileItemScreen.js";
import CreateItemScreen from "./screens/createItem/CreateItemScreen.js";
import ItemDescriptionInputScreen from "./screens/createItem/ItemDescriptionInputScreen.js";
import GroupDetailsScreen from "./screens/starter/GroupDetailsScreen.js";
import AdminProfileScreen from "./screens/admin/AdminProfileScreen.js";
import GroupsScreen from "./screens/admin/GroupsScreen.js";
import ItemsScreen from "./screens/admin/ItemsScreen.js";
import LmsScreen from "./screens/admin/LmsScreen.js";
import MemberScreen from "./screens/admin/MemberScreen.js";
import FeedbacksScreen from "./screens/admin/FeedbacksScreen.js";
import WishListScreen from "./screens/WishListScreen.js";
import ChatScreen from "./screens/ChatScreen.js";

import Logo from "./components/icons/Logo.js";
import Title from "./components/Title.js";

import { AppRegistry } from "react-native";
import Colors from "./constants/colors.js";
import { Provider as PaperProvider } from 'react-native-paper';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import GroupIcon from "./components/icons/adminicons/GroupIcon.js";
import ItemIcon from "./components/icons/adminicons/ItemIcon.js";
import FeedbackIcon from "./components/icons/adminicons/FeedbackIcon.js";
import LmsIcon from "./components/icons/adminicons/LmsIcon.js";
import DashboardIcon from "./components/icons/DashboardIcon.js";
import MemberIcon from "./components/icons/adminicons/MemberIcon.js";
import CoinIcon from "./components/icons/adminicons/CoinIcon.js";
import AmbassadorRequestScreen from "./screens/starter/AmbassadorRequestScreen.js";
import Toast from "react-native-toast-message";

import { Inter_300Light } from '@expo-google-fonts/inter/300Light';
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { Inter_700Bold } from '@expo-google-fonts/inter/700Bold';
import { Raleway_100Thin } from '@expo-google-fonts/raleway/100Thin';
import { Raleway_300Light } from '@expo-google-fonts/raleway/300Light';
import { Raleway_400Regular } from '@expo-google-fonts/raleway/400Regular';
import { Raleway_500Medium } from '@expo-google-fonts/raleway/500Medium';
import { Raleway_600SemiBold } from '@expo-google-fonts/raleway/600SemiBold';
import { Raleway_700Bold } from '@expo-google-fonts/raleway/700Bold';
import { useUser } from "./hooks/auth/useUser.js";
import { SubscriptionProvider } from "./SubscriptionProvider.js";
import GroupsListScreen from "./screens/starter/GroupsListScreen.js";

AppRegistry.registerComponent("main", () => App);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarInactiveTintColor: Colors.primary1,
                tabBarStyle: {
                    height: 90,
                    backgroundColor: "#DACFD4",
                    paddingTop: 15,
                },
                headerStyle: {
                    height: 100,
                },
            }}
            initialRouteName="Profile"
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
                                    style={{
                                        color: Colors.primary1,
                                        fontFamily: "Raleway_700Bold",
                                    }}
                                >
                                    BE
                                </Text>
                                <Text
                                    style={{
                                        color: Colors.primary1,
                                        fontFamily: "Raleway_700Bold",
                                    }}
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
                    headerTitle: (props) => (
                        <Title title="Profile" {...props} />
                    ),
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
                                    bottom: 40,
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
                                    <Circle
                                        cx="54.5"
                                        cy="54.5"
                                        r="54.5"
                                        fill="#FFF"
                                    />
                                </Svg>
                                <Svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="94"
                                    height="94"
                                    viewBox="0 0 94 94"
                                    fill="none"
                                    style={{ position: "absolute", zIndex: 2 }}
                                >
                                    <Circle
                                        cx="47"
                                        cy="47"
                                        r="47"
                                        fill="#DACFD4"
                                    />
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

function DrawerNavigator() {
    const { user } = useUser();
    const isAdmin = user?.user?.app_metadata?.role === 'super-admin';
    const isAmbassador = user?.user?.user_metadata?.ambassador;
    return (
        <Drawer.Navigator
            initialRouteName="AdminProfile"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Drawer.Screen
                name="AdminProfile"
                component={AdminProfileScreen}
                options={{
                    drawerLabel: "Dashboard",
                    drawerIcon: () => <DashboardIcon />,
                    headerTitleAlign: "left",
                     headerShown: true,
                    headerTitle: (props) => (
                        <Title title="Profile" {...props} />
                    ),
                    headerRight: (props) => <Logo {...props} />,
                    // tabBarIcon: (props) => {
                    //     return (
                    //         <Image
                    //             style={{ width: 35, height: 35 }}
                    //             source={require("./assets/images/user2.png")}
                    //         />
                    //     );
                    // },
                }}
            />
            {isAdmin && <Drawer.Screen
                name="Groups"
                component={GroupsScreen}
                options={{
                    drawerLabel: "Groups",
                    drawerIcon: () => <GroupIcon />,
                }}
            />}
            
            <Drawer.Screen
                name="Items"
                component={ItemsScreen}
                options={{
                    drawerLabel: "Items",
                    drawerIcon: () => <ItemIcon />,
                }}
            />
            {/* <Drawer.Screen
                name="Feedback"
                component={FeedbacksScreen}
                options={{
                    drawerLabel: "Feedbacks",
                    drawerIcon: () => <FeedbackIcon />,
                }}
            /> */}
            {/* <Drawer.Screen
                name="Lms"
                component={LmsScreen}
                options={{ drawerLabel: "Lms", drawerIcon: () => <LmsIcon /> }}
            /> */}
            <Drawer.Screen
                name="Members"
                component={MemberScreen}
                options={{
                    drawerLabel: "Members",
                    drawerIcon: () => <MemberIcon />,
                }}
            />
        </Drawer.Navigator>
    );
}

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [fontsLoaded, fontError] = useFonts({
        Inter_300Light, 
        Inter_400Regular, 
        Inter_500Medium, 
        Inter_600SemiBold, 
        Inter_700Bold,
        Raleway_100Thin, 
        Raleway_300Light, 
        Raleway_400Regular, 
        Raleway_500Medium, 
        Raleway_600SemiBold, 
        Raleway_700Bold, 
    });

    const queryClient = new QueryClient();

    React.useEffect(() => {
    if (fontError) {
        console.error('Font loading error:', fontError);
    }
    }, [fontError]);

    if (!fontsLoaded)
    {
        return null;
    }

    console.log("Fonts loaded, hiding splash screen");
    SplashScreen.hideAsync();

    return (
        <RootSiblingParent>
            <SafeAreaProvider>
                <QueryClientProvider client={queryClient}>
                    <PaperProvider>
                        <StatusBar />
                        <SubscriptionProvider >
                            <AppContent />
                        </SubscriptionProvider>
                        <Toast />
                    </PaperProvider>
                </QueryClientProvider>
            </SafeAreaProvider>
        </RootSiblingParent>
    );
}

function AppContent( ) {
    const { user } = useUser(); 
    const groupId = user?.user?.user_metadata?.group;

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={user ? "InApp" : "Welcome"}
                screenOptions={{ headerStyle: { height: 200 }, }}
            >
                <Stack.Screen
                    name="Welcome"
                    component={WelcomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="GroupsList"
                    component={GroupsListScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="InApp"
                    component={BottomTabNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AdminApp"
                    component={DrawerNavigator}
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
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ResetPassword"
                    component={ResetPasswordScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Postcode"
                    component={PostcodeScreen}
                    options={{ headerShown: false }}
                />
                    <Stack.Screen
                    name="AmbassadorRequest"
                    component={AmbassadorRequestScreen}
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
                            <Title
                                title="SETTINGS"
                                goBack="true"
                                {...props}
                            />
                        ),
                        headerRight: (props) => (
                            <Logo {...props} />
                        ),
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
                            <Title
                                title="IMPACT"
                                goBack="true"
                                {...props}
                            />
                        ),
                        headerRight: (props) => (
                            <Logo {...props} />
                        ),
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
                            <Title
                                title=""
                                goBack="true"
                                {...props}
                            />
                        ),
                        headerRight: (props) => (
                            <Logo {...props} />
                        ),
                    }}
                />
                <Stack.Screen
                    name="GroupCreate"
                    component={GroupCreateScreen}
                    options={{
                        headerTitleAlign: "left",
                        headerBackVisible: false,
                        headerTitle: (props) => (
                            <Title
                                title=""
                                goBack="true"
                                {...props}
                            />
                        ),
                    }}
                />
                <Stack.Screen
                    name="ProfileItem"
                    component={ProfileItemScreen}
                    options={{
                        headerBackVisible: false,
                        headerTitle: (props) => (
                            <Title goBack="true" {...props} />
                        ),
                        headerRight: (props) => (
                            <Logo {...props} />
                        ),
                    }}
                />
                <Stack.Screen
                    name="CreateItem"
                    component={CreateItemScreen}
                    options={{
                        headerTitleAlign: "left",
                        headerBackVisible: false,
                        headerTitle: (props) => (
                            <Title
                                title=""
                                goBack="true"
                                {...props}
                            />
                        ),
                    }}
                />
                <Stack.Screen
                    name="ItemDescriptionInput"
                    component={ItemDescriptionInputScreen}
                    options={{
                        headerTitleAlign: "left",
                        headerBackVisible: false,
                        headerTitle: (props) => (
                            <Title
                                title=""
                                goBack="true"
                                {...props}
                            />
                        ),
                    }}
                />
                <Stack.Screen
                    name="GroupDetails"
                    component={GroupDetailsScreen}
                    options={{
                        headerTitleAlign: "left",
                        headerBackVisible: false,
                        headerTitle: (props) => (
                            <Title
                                title=""
                                goBack="true"
                                {...props}
                            />
                        ),
                    }}
                />
                <Stack.Screen
                    name="WishList"
                    component={WishListScreen}
                    options={{
                        headerTitleAlign: "left",
                        headerBackVisible: false,
                        headerTitle: (props) => (
                            <Title
                                title="WISHLIST"
                                goBack="true"
                                {...props}
                            />
                        ),
                        headerRight: (props) => (
                            <Logo {...props} />
                        ),
                    }}
                    
                />
                <Stack.Screen
                    name="Chat"
                    component={ChatScreen}
                    options={{
                        headerTitleAlign: "left",
                        headerBackVisible: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}