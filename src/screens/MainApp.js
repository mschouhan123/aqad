// import { useAuth } from "../Context/AuthContext";
// import SplashScreen from "./SplashScreen";
// import LoginScreen from "./LoginScreen";
// import RegisterScreen from "./RegisterScreen";
// import HomeScreen from "./HomeScreen";
// import ContactScreen from "./ContactScreen";
// import DashboardScreen from "./DashboardScreen";
// import ProfileScreen from "./ProfileScreen";
// import SignupListScreen from "./SignupListScreen";
// import CustomDrawerContent from "../components/CustomDrawerContent";
// import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import GraphScreen from './GraphScreen';

// const Drawer = createDrawerNavigator();

// export default function MainApp() {
//   const { user, loading, initialRoute } = useAuth();

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <Drawer.Navigator 
//       initialRouteName={initialRoute} 
//       screenOptions={{ headerShown: false }} 
//       drawerContent={props => <CustomDrawerContent {...props} />}
//     >
//       {user ? (
//         <>
//           <Drawer.Screen name="Home" component={HomeScreen} />
//           <Drawer.Screen name="GraphScreen" component={GraphScreen} />
//           <Drawer.Screen name="Contact" component={ContactScreen} />
//           <Drawer.Screen name="Dashboard" component={DashboardScreen} />
//           <Drawer.Screen name="Profile" component={ProfileScreen} />
//           <Drawer.Screen name="Signuplist" component={SignupListScreen} />
//         </>
//       ) : (
//         <>
//           <Drawer.Screen name="Splash" component={SplashScreen} />
//           <Drawer.Screen name="Login" component={LoginScreen} />
//           <Drawer.Screen name="Register" component={RegisterScreen} />
//         </>
//       )}
//     </Drawer.Navigator>
//   );
// }

// const styles = StyleSheet.create({
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });


// import React from 'react';
// import { useAuth } from "../Context/AuthContext";
// import SplashScreen from "./SplashScreen";
// import LoginScreen from "./LoginScreen";
// import RegisterScreen from "./RegisterScreen";
// import HomeScreen from "./HomeScreen";
// import ContactScreen from "./ContactScreen";
// import DashboardScreen from "./DashboardScreen";
// import ProfileScreen from "./ProfileScreen";
// import SignupListScreen from "./SignupListScreen";
// import CustomDrawerContent from "../components/CustomDrawerContent";
// import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import GraphScreen from './GraphScreen';

// const Drawer = createDrawerNavigator();
// const Tab = createBottomTabNavigator();

// // Drawer Navigator component
// function DrawerNavigator() {
//   const { user } = useAuth();

//   return (
//     <Drawer.Navigator
//       initialRouteName="HomeTab"
//       screenOptions={{ headerShown: false }}
//       drawerContent={props => <CustomDrawerContent {...props} />}
//     >
//       {user ? (
//         <>
//           <Drawer.Screen name="HomeTab" component={HomeScreen} />
//           <Drawer.Screen name="GraphScreen" component={GraphScreen} />
//           <Drawer.Screen name="Contact" component={ContactScreen} />
//           <Drawer.Screen name="Dashboard" component={DashboardScreen} />
//           <Drawer.Screen name="Profile" component={ProfileScreen} />
//           <Drawer.Screen name="Signuplist" component={SignupListScreen} />
//         </>
//       ) : (
//         <>
//           <Drawer.Screen name="Splash" component={SplashScreen} />
//           <Drawer.Screen name="Login" component={LoginScreen} />
//           <Drawer.Screen name="Register" component={RegisterScreen} />
//         </>
//       )}
//     </Drawer.Navigator>
//   );
// }

// // Main Bottom Tabs component
// function BottomTabs() {
//   return (
//     <Tab.Navigator
//       initialRouteName="Home"
//       screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Graph" component={DrawerNavigator} />
//       <Tab.Screen name="Contact" component={DrawerNavigator} />
//       <Tab.Screen name="Dashboard" component={DrawerNavigator} />
//       <Tab.Screen name="Profile" component={DrawerNavigator} />
//     </Tab.Navigator>
//   );
// }

// // MainApp component
// export default function MainApp() {
//   const { loading } = useAuth();

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return <BottomTabs />;
// }

// const styles = StyleSheet.create({
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });


// import React from 'react';
// import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { useAuth } from "../Context/AuthContext"; // Make sure this path is correct
// import SplashScreen from "./SplashScreen";
// import LoginScreen from "./LoginScreen";
// import RegisterScreen from "./RegisterScreen";
// import HomeScreen from "./HomeScreen";
// import ContactScreen from "./ContactScreen";
// import DashboardScreen from "./DashboardScreen";
// import ProfileScreen from "./ProfileScreen";
// import SignupListScreen from "./SignupListScreen";
// import CustomDrawerContent from "../components/CustomDrawerContent"; // Make sure this path is correct
// import GraphScreen from './GraphScreen';

// const Drawer = createDrawerNavigator();
// const Tab = createBottomTabNavigator();

// // BottomTabs component
// function BottomTabs() {
//   return (
//     <Tab.Navigator
//       initialRouteName="HomeTab"
//       screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
//     >
//       <Tab.Screen name="HomeTab" component={HomeScreen} />
//       <Tab.Screen name="Graph" component={GraphScreen} />
//       <Tab.Screen name="Contact" component={ContactScreen} />
//       <Tab.Screen name="Dashboard" component={DashboardScreen} />
//       <Tab.Screen name="Profile" component={ProfileScreen} />
//     </Tab.Navigator>
//   );
// }

// // DrawerNavigator component
// function DrawerNavigator() {
//   const { user } = useAuth();

//   return (
//     <Drawer.Navigator
//       initialRouteName="Home"
//       screenOptions={{ headerShown: false }}
//       drawerContent={props => <CustomDrawerContent {...props} />}
//     >
//       {user ? (
//         <>
//           <Drawer.Screen name="Home" component={BottomTabs} />
//           <Drawer.Screen name="GraphScreen" component={BottomTabs} />
//           <Drawer.Screen name="Contact" component={ContactScreen} />
//           <Drawer.Screen name="Dashboard" component={DashboardScreen} />
//           <Drawer.Screen name="Profile" component={ProfileScreen} />
//           <Drawer.Screen name="SignupList" component={SignupListScreen} />
//         </>
//       ) : (
//         <>
//           <Drawer.Screen name="Splash" component={SplashScreen} />
//           <Drawer.Screen name="Login" component={LoginScreen} />
//           <Drawer.Screen name="Register" component={RegisterScreen} />
//         </>
//       )}
//     </Drawer.Navigator>
//   );
// }

// // MainApp component
// export default function MainApp() {
//   const { loading } = useAuth();

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return <DrawerNavigator />;
// }

// const styles = StyleSheet.create({
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// import React from 'react';
// import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import { useAuth } from "../Context/AuthContext"; // Ensure this path is correct
// import SplashScreen from "./SplashScreen";
// import LoginScreen from "./LoginScreen";
// import RegisterScreen from "./RegisterScreen";
// import HomeScreen from "./HomeScreen";
// import ContactScreen from "./ContactScreen";
// import DashboardScreen from "./DashboardScreen";
// import ProfileScreen from "./ProfileScreen";
// import SignupListScreen from "./SignupListScreen";
// import CustomDrawerContent from "../components/CustomDrawerContent"; // Ensure this path is correct
// import GraphScreen from './GraphScreen';
// import DrawerScreen from './DrawerScreen';

// const Drawer = createDrawerNavigator();
// const Tab = createBottomTabNavigator();

// // BottomTabs component
// function BottomTabs() {
//   return (
//     <Tab.Navigator
//       initialRouteName="HomeTab"
//       screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
//     >
//       <Tab.Screen name="HomeTab" component={HomeScreen} />
//       <Tab.Screen name="GraphTab" component={GraphScreen} />
//       <Tab.Screen name="ContactTab" component={ContactScreen} />
//       <Tab.Screen name="DashboardTab" component={DashboardScreen} />
//       <Tab.Screen name="ProfileTab" component={ProfileScreen} />
//     </Tab.Navigator>
//   );
// }

// // DrawerNavigator component
// function DrawerNavigator() {
//   return (
//     <Drawer.Navigator
//       initialRouteName="HomeDrawer"
//       screenOptions={{ headerShown: false }}
//       // drawerContent={props => <CustomDrawerContent {...props} />}
//       drawerContent={props => <DrawerScreen {...props} />}
//     >
//       <Drawer.Screen name="HomeDrawer" component={HomeScreen} />
//       <Drawer.Screen name="ContactDrawer" component={ContactScreen} />
//       <Drawer.Screen name="DashboardDrawer" component={DashboardScreen} />
//       <Drawer.Screen name="GraphScreen" component={GraphScreen} />
//       <Drawer.Screen name="ProfileDrawer" component={ProfileScreen} />
//       <Drawer.Screen name="SignupListDrawer" component={SignupListScreen} />
//     </Drawer.Navigator>
//   );
// }

// // MainApp component
// export default function MainApp() {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer>
//       {user ? <DrawerNavigator /> : <AuthNavigator />}
//     </NavigationContainer>
//   );
// }

// // AuthNavigator component
// function AuthNavigator() {
//   return (
//     <Drawer.Navigator
//       initialRouteName="Splash"
//       screenOptions={{ headerShown: false }}
//       drawerContent={props => <CustomDrawerContent {...props} />}
//     >
//       <Drawer.Screen name="Splash" component={SplashScreen} />
//       <Drawer.Screen name="Login" component={LoginScreen} />
//       <Drawer.Screen name="Register" component={RegisterScreen} />
//     </Drawer.Navigator>
//   );
// }

// const styles = StyleSheet.create({
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });


import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from "../Context/AuthContext"; // Ensure this path is correct
import SplashScreen from "./SplashScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import DrawerScreen from './DrawerScreen'; // Import your custom DrawerScreen component

const Drawer = createDrawerNavigator();

// MainApp component
export default function MainApp() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AuthenticatedNavigator /> : <UnauthenticatedNavigator />}
    </NavigationContainer>
  );
}

// Authenticated Navigator
function AuthenticatedNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeDrawer"
      screenOptions={{ headerShown: false }}
      drawerContent={props => <DrawerScreen {...props} />}
    >
      <Drawer.Screen name="HomeDrawer" component={HomeScreen} />
    </Drawer.Navigator>
  );
}

// Unauthenticated Navigator
function UnauthenticatedNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
      drawerContent={props => <DrawerScreen {...props} />}
    >
      <Drawer.Screen name="Splash" component={SplashScreen} />
      <Drawer.Screen name="Login" component={LoginScreen} />
      <Drawer.Screen name="Register" component={RegisterScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
