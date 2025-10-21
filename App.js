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
import { Text, Image, View, AppState, Platform } from "react-native";
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

import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
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
import ProfileIcon from "./components/icons/ProfileIcon.js";
import EventIcon from "./components/icons/EventIcon.js";
import supabase from "./services/supabase.js";

AppRegistry.registerComponent("main", () => App);

function AppAuthRefresher() {
    const qc = useQueryClient();

    React.useEffect(() => {
        const refresh = async () => {
            try { 
                await supabase.auth.refreshSession(); 
            } catch {}
            qc.invalidateQueries({ queryKey: ["user"] }); 
        };

        refresh();

        const sub = AppState.addEventListener("change", (state) => {
        if (state === "active") refresh();
        });

        return () => sub.remove();
    }, [qc]);

    return null;
}


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
                            <ProfileIcon />
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
                                <Svg 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg"
                                    stroke="#8E0040"
                                    style={{ width: 59, height: 59, position: "absolute", top: (109 - 59) / 2, zIndex: 3,alignSelf: "center"}}
                                >
                                    <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                                    <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
                                    <G id="SVGRepo_iconCarrier">
                                        <Path d="M3.74181 20.5545C4.94143 22 7.17414 22 11.6395 22H12.3607C16.8261 22 19.0589 22 20.2585 20.5545M3.74181 20.5545C2.54219 19.1091 2.95365 16.9146 3.77657 12.5257C4.36179 9.40452 4.65441 7.84393 5.7653 6.92196M3.74181 20.5545C3.74181 20.5545 3.74181 20.5545 3.74181 20.5545ZM20.2585 20.5545C21.4581 19.1091 21.0466 16.9146 20.2237 12.5257C19.6385 9.40452 19.3459 7.84393 18.235 6.92196M20.2585 20.5545C20.2585 20.5545 20.2585 20.5545 20.2585 20.5545ZM18.235 6.92196C17.1241 6 15.5363 6 12.3607 6H11.6395C8.46398 6 6.8762 6 5.7653 6.92196M18.235 6.92196C18.235 6.92196 18.235 6.92196 18.235 6.92196ZM5.7653 6.92196C5.7653 6.92196 5.7653 6.92196 5.7653 6.92196Z" stroke="#8E0040" stroke-width="1.5"></Path> 
                                        <Path d="M12 12.1913L11.4813 12.7331C11.7713 13.0108 12.2287 13.0108 12.5187 12.7331L12 12.1913ZM11.0429 15.8656L10.5992 16.4703L11.0429 15.8656ZM12.9571 15.8656L12.5135 15.2609L12.9571 15.8656ZM12 16.3276L12 17.0776L12 16.3276ZM11.4865 15.2609C11.0686 14.9542 10.6081 14.5712 10.2595 14.1681C9.89122 13.7423 9.75 13.4113 9.75 13.1967H8.25C8.25 13.9666 8.6912 14.6479 9.1249 15.1493C9.57819 15.6735 10.1391 16.1327 10.5992 16.4703L11.4865 15.2609ZM9.75 13.1967C9.75 12.6207 10.0126 12.37 10.2419 12.2896C10.4922 12.2019 10.9558 12.2299 11.4813 12.7331L12.5187 11.6496C11.6943 10.8603 10.6579 10.5543 9.74566 10.8741C8.81245 11.2012 8.25 12.0995 8.25 13.1967H9.75ZM13.4008 16.4703C13.8609 16.1327 14.4218 15.6735 14.8751 15.1493C15.3088 14.6479 15.75 13.9666 15.75 13.1967H14.25C14.25 13.4113 14.1088 13.7423 13.7405 14.1681C13.3919 14.5713 12.9314 14.9542 12.5135 15.2609L13.4008 16.4703ZM15.75 13.1967C15.75 12.0995 15.1875 11.2012 14.2543 10.8741C13.3421 10.5543 12.3057 10.8603 11.4813 11.6496L12.5187 12.7331C13.0442 12.2299 13.5078 12.2019 13.7581 12.2896C13.9874 12.37 14.25 12.6207 14.25 13.1967H15.75ZM10.5992 16.4703C10.9678 16.7407 11.3816 17.0775 12 17.0776L12 15.5776C11.9756 15.5776 11.9605 15.5775 11.9061 15.5488C11.8202 15.5034 11.7128 15.4269 11.4865 15.2609L10.5992 16.4703ZM12.5135 15.2609C12.2872 15.4269 12.1798 15.5034 12.0939 15.5488C12.0395 15.5775 12.0244 15.5776 12 15.5776L12 17.0776C12.6184 17.0776 13.0322 16.7407 13.4008 16.4703L12.5135 15.2609Z" fill="#8E0040"></Path> 
                                        <Path d="M9 6V5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5V6" stroke="#8E0040" stroke-width="1.5" stroke-linecap="round"></Path> 
                                    </G>
                                </Svg>
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
                            <EventIcon />
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

    SplashScreen.hideAsync();

    return (
        <QueryClientProvider client={queryClient}>
            <RootSiblingParent>
                <SafeAreaProvider>
                    <PaperProvider>
                        <StatusBar />
                        <SubscriptionProvider >
                             <AppAuthRefresher />
                            <AppContent />
                        </SubscriptionProvider>
                        <Toast />
                    </PaperProvider>
                </SafeAreaProvider>
            </RootSiblingParent>
        </QueryClientProvider>
    );
}

function AppContent( ) {
    const { user } = useUser(); 
    const groupId = user?.user?.user_metadata?.group;
    console.log("GROUP ID: ", groupId)
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={groupId === undefined || groupId === null 
    ? "Welcome"
    :  "InApp"}
                screenOptions={{ 
                    headerStyle: { height: Platform.OS === "web" ? 88 : 56 }, 
                    headerTitleAlign: "left",
                    headerBackVisible: false
                }}
                
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
                        headerBackVisible: false,
                        headerLeft: (props) => (
                            <Title
                                title="SETTINGS"
                                goBack="true"
                                {...props}
                            />
                        ),
                        headerRight: (props) => (
                            <Logo {...props} />
                        ),
                        headerTitle: "", 
                    }}
                />
                <Stack.Screen
                    name="Impact"
                    component={ImpactScreen}
                    options={{
                        headerStyle: {
                            backgroundColor: Colors.impact,
                        },
                        // headerTransparent: true,
                        headerBackVisible: false,
                        headerLeft: (props) => (
                            <Title
                                title="IMPACT"
                                goBack="true"
                                {...props}
                            />
                        ),
                        headerRight: (props) => (
                            <Logo {...props} />
                        ),
                        headerTitle: "", 
                    }}
                />
                <Stack.Screen
                    name="Calendar"
                    component={CalendarScreen}
                    options={{
                        // headerTransparent: true,
                        headerBackVisible: false,
                        headerLeft: (props) => (
                            <Title
                                title=""
                                goBack="true"
                                {...props}
                            />
                        ),
                        headerRight: (props) => (
                            <Logo {...props} />
                        ),
                        headerTitle: "",
                    }}
                />
                <Stack.Screen
                    name="GroupCreate"
                    component={GroupCreateScreen}
                    options={{
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
                        headerLeft: (props) => (
                            <Title goBack="true" {...props} />
                        ),
                        headerRight: (props) => (
                            <Logo {...props} />
                        ),
                        headerTitle: "",
                    }}
                />
                <Stack.Screen
                    name="CreateItem"
                    component={CreateItemScreen}
                    options={{
                        headerBackVisible: false,
                        headerLeft: (props) => (
                            <Title
                                title=""
                                goBack="true"
                                {...props}
                            />
                        ),
                        headerTitle: ""
                    }}
                />
                <Stack.Screen
                    name="ItemDescriptionInput"
                    component={ItemDescriptionInputScreen}
                    options={{
                        headerBackVisible: false,
                        headerLeft: (props) => (
                            <Title
                                title=""
                                goBack="true"
                                {...props}
                            />
                        ),
                        headerTitle: ""
                    }}
                />
                <Stack.Screen
                    name="GroupDetails"
                    component={GroupDetailsScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="WishList"
                    component={WishListScreen}
                    options={{
                        headerBackVisible: false,
                        headerLeft: (props) => (
                            <Title
                                title="WISHLIST"
                                goBack="true"
                                {...props}
                            />
                        ),
                        headerRight: (props) => (
                            <Logo {...props} />
                        ),
                        headerTitle: ""
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