import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { useAuth } from '../Context/AuthContext';

const DrawerScreen = ({ navigation }) => {
  const { user, logout, activeScreen, setActiveScreen } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate('Login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleNavigation = (screenName) => {
    setActiveScreen(screenName);
    navigation.navigate(screenName);
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  return (
    <ScrollView style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Text style={styles.headerText}>
          Welcome <Text style={styles.highlightedText}>{user.displayName}</Text>
        </Text>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
           <Text style={{backgroundColor: 'grey', padding: 5, borderRadius: 5}}>Close</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.drawerContent}>
        <TouchableOpacity onPress={() => handleNavigation('HomeDrawer')} style={styles.drawerItemContainer}>
          <Text style={[styles.drawerItem, activeScreen === 'HomeDrawer' && styles.activeDrawerItem]}>
            Home
          </Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity onPress={() => handleNavigation('GraphDrawer')} style={styles.drawerItemContainer}>
          <Text style={[styles.drawerItem, activeScreen === 'GraphDrawer' && styles.activeDrawerItem]}>
            Graph
          </Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity onPress={() => handleNavigation('ContactDrawer')} style={styles.drawerItemContainer}>
          <Text style={[styles.drawerItem, activeScreen === 'ContactDrawer' && styles.activeDrawerItem]}>
            Contact
          </Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity onPress={() => handleNavigation('ProfileDrawer')} style={styles.drawerItemContainer}>
          <Text style={[styles.drawerItem, activeScreen === 'ProfileDrawer' && styles.activeDrawerItem]}>
            Profile
          </Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  highlightedText: {
    color: '#007AFF',
  },
  drawerContent: {
    paddingTop: 16,
  },
  drawerItemContainer: {
    paddingBottom: 16,
  },
  drawerItem: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
    color: '#000',
  },
  activeDrawerItem: {
    color: '#007AFF',
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    marginVertical: 16,
  },
  logoutButton: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 8,
    marginTop: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default DrawerScreen;
