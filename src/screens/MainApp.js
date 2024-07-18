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
