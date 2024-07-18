import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useAuth } from '../Context/AuthContext'; // Adjust the import path as per your folder structure

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();
  const { logout } = useAuth(); // Using useAuth hook to get logout function
  const [activeScreen, setActiveScreen] = useState('Home');
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = (screenName) => {
    setActiveScreen(screenName);
    navigation.navigate(screenName);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      navigation.dispatch(DrawerActions.closeDrawer());
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <TouchableOpacity onPress={() => handleNavigation('HomeDrawer')}>
        <Text style={[styles.menuItem, activeScreen === 'HomeDrawer' && styles.activeMenuItem]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('GraphDrawer')}>
        <Text style={[styles.menuItem, activeScreen === 'GraphDrawer' && styles.activeMenuItem]}>Graph</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('ProfileDrawer')}>
        <Text style={[styles.menuItem, activeScreen === 'ProfileDrawer' && styles.activeMenuItem]}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('DashboardTab')}>
        <Text style={[styles.menuItem, activeScreen === 'DashboardTab' && styles.activeMenuItem]}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('ContactTab')}>
        <Text style={[styles.menuItem, activeScreen === 'Contact' && styles.activeMenuItem]}>Contact</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('SignupListTab')}>
        <Text style={[styles.menuItem, activeScreen === 'SignupListTab' && styles.activeMenuItem]}>SignupList</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton} disabled={isLoading}>
        {isLoading ? <ActivityIndicator color="white" /> : <Text style={styles.logoutText}>Logout</Text>}
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    margin: 20,
    fontSize: 16,
  },
  activeMenuItem: {
    backgroundColor: '#87CEEB',
    color: '#fff',
    borderRadius: 5,
    padding: 10,
    paddingVertical: 15,
  },
  logoutButton: {
    backgroundColor: '#FF6347', // Red color
    borderRadius: 5,
    margin: 20,
    padding: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default CustomDrawerContent;
