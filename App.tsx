
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from './src/Context/AuthContext';
import DrawerScreen from './src/screens/DrawerScreen';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/GraphScreen';
import ContactScreen from './src/screens/ContactScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SignupListScreen from './src/screens/SignupListScreen';
import { images } from './src/assets/imageUri';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const tabScreenOptions = (icon, label) => ({
  tabBarIcon: ({ focused }) => (
    <View style={{ alignItems: 'center' }}>
      <Image source={icon} style={{ width: 24, height: 24, tintColor: focused ? '#075296' : '#9AA1AE' }} />
      <Text style={{ color: focused ? '#075296' : '#9AA1AE', fontSize: 12 }}>{label}</Text>
    </View>
  ),
});

const TabNavigator = ({ initialRouteName }) => {
  const { setActiveScreen } = useAuth(); // Access the setActiveScreen function from context

  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ tabBarShowLabel: false, headerShown: false }}
      screenListeners={({ route }) => ({
        state: (e) => {
          const activeRoute = route.state
            ? route.state.routes[route.state.index].name
            : initialRouteName;
          setActiveScreen(activeRoute); // Update active screen context on tab change
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={tabScreenOptions(images.home, 'Home')} />
      <Tab.Screen name="GraphTab" component={DetailsScreen} options={tabScreenOptions(images.graph, 'Graph')} />
      <Tab.Screen name="ContactTab" component={ContactScreen} options={tabScreenOptions(images.contact, 'Contact')} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={tabScreenOptions(images.profile, 'Profile')} />
    </Tab.Navigator>
  );
};

const DrawerNavigator = () => {
  const { activeScreen } = useAuth(); // Access the activeScreen state from context

  return (
    <Drawer.Navigator initialRouteName="HomeDrawer" drawerContent={props => <DrawerScreen {...props} />}>
      <Drawer.Screen name="HomeDrawer">
        {props => <TabNavigator {...props} initialRouteName="HomeTab" />}
      </Drawer.Screen>
      <Drawer.Screen name="GraphDrawer">
        {props => <TabNavigator {...props} initialRouteName="GraphTab" />}
      </Drawer.Screen>
      <Drawer.Screen name="ContactDrawer">
        {props => <TabNavigator {...props} initialRouteName="ContactTab" />}
      </Drawer.Screen>
      <Drawer.Screen name="DashboardDrawer" component={DashboardScreen} />
      <Drawer.Screen name="ProfileDrawer">
        {props => <TabNavigator {...props} initialRouteName="ProfileTab" />}
      </Drawer.Screen>
      <Drawer.Screen name="SignupListDrawer" component={SignupListScreen} />
    </Drawer.Navigator>
  );
};

const UnauthenticatedNavigator = () => (
  <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SplashScreen" component={SplashScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const App = () => {
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
      {user ? <DrawerNavigator /> : <UnauthenticatedNavigator />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
