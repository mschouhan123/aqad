import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../firebase/firebase.config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Splash');

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          setUser(JSON.parse(userData));
          setInitialRoute('Home');
        }else {
          setInitialRoute('Login');
        }
      } catch (error) {
        console.error("Error loading user data from AsyncStorage: ", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (userCredential.user) {
        await AsyncStorage.setItem('userData', JSON.stringify(userCredential.user));
        setUser(userCredential.user);
        setInitialRoute('Home');
      } else {
        throw new Error("User data is null or undefined after login");
      }

      return userCredential.user;
    } catch (error) {
      console.error("Error logging in: ", error);
      throw error;
    }
  };

  const signup = async (username, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, { displayName: username });
      await AsyncStorage.setItem('userData', JSON.stringify(userCredential.user));
      setUser(userCredential.user);
      setInitialRoute('Login');
      return userCredential.user;
    } catch (error) {
      console.error("Error signing up: ", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      setUser(null);
      setInitialRoute('Login');
    } catch (error) {
      console.error("Error logging out: ", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout,initialRoute }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
