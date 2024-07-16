
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerActions, useNavigationState } from '@react-navigation/native';
import { useAuth } from '../Context/AuthContext';

const DrawerScreen = ({ navigation }) => {
  const state = useNavigationState(state => state); // Ensure state is properly initialized

  const { user, logout } = useAuth(); // Import logout function and user details from AuthContext

  const handleLogout = async () => {
    try {
      await logout(); // Call logout function from AuthContext
      // Navigate to Login screen after logout
      navigation.navigate('Login');
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle error if needed
    }
  };

  return (
    <ScrollView style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Text style={styles.headerText}>Welcome <Text style={styles.highlightedText}>{user.displayName}</Text></Text>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
          <Ionicons name="close" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.drawerContent}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeDrawer')} style={styles.drawerItemContainer}>
          <Text
            style={[
              styles.drawerItem,
              state && state.routes[state.index].name === 'HomeDrawer' && styles.activeDrawerItem, // Check for state existence
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity onPress={() => navigation.navigate('GraphDrawer')} style={styles.drawerItemContainer}>
          <Text
            style={[
              styles.drawerItem,
              state && state.routes[state.index].name === 'GraphDrawer' && styles.activeDrawerItem, // Check for state existence
            ]}
          >
            Graph
          </Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity onPress={() => navigation.navigate('ContactDrawer')} style={styles.drawerItemContainer}>
          <Text
            style={[
              styles.drawerItem,
              state && state.routes[state.index].name === 'ContactDrawer' && styles.activeDrawerItem, // Check for state existence
            ]}
          >
            Contact
          </Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity onPress={() => navigation.navigate('ProfileDrawer')} style={styles.drawerItemContainer}>
          <Text
            style={[
              styles.drawerItem,
              state && state.routes[state.index].name === 'ProfileDrawer' && styles.activeDrawerItem, // Check for state existence
            ]}
          >
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
    paddingTop: 24, // Adjusted paddingTop to reduce space
    paddingHorizontal: 16,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Align items with proper space
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
    color: '#007AFF', // Highlighted color for user's name
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
    color: '#000', // Default text color
  },
  activeDrawerItem: {
    color: '#007AFF',
  },
  horizontalLine: {
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
    marginVertical: 8,
  },
  logoutButton: {
    marginTop: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#FF3B30',
    borderRadius: 8,
    backgroundColor: '#FF3B30',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default DrawerScreen;

