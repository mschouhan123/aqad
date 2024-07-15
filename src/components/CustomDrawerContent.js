import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();
  const [activeScreen, setActiveScreen] = useState('Home');

  const handleNavigation = (screenName) => {
    setActiveScreen(screenName);
    navigation.navigate(screenName);
  };

  return (
    <DrawerContentScrollView {...props}>
      <TouchableOpacity onPress={() => handleNavigation('Home')}>
        <Text style={[styles.menuItem, activeScreen === 'Home' && styles.activeMenuItem]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Profile')}>
        <Text style={[styles.menuItem, activeScreen === 'Profile' && styles.activeMenuItem]}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Dashboard')}>
        <Text style={[styles.menuItem, activeScreen === 'Dashboard' && styles.activeMenuItem]}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Contact')}>
        <Text style={[styles.menuItem, activeScreen === 'Contact' && styles.activeMenuItem]}>Contact</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('SignupList')}>
        <Text style={[styles.menuItem, activeScreen === 'SignupList' && styles.activeMenuItem]}>SignupList</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onLogout}>
        <Text style={styles.menuItem}>Logout</Text>
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
});

export default CustomDrawerContent;
