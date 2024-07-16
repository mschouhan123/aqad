import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../Context/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const toast = useToast();

  const { login } = useAuth();

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!email) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
      valid = false;
    }
    if (!password) {
      errors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setIsLoading(true);
    try {
      const userCredential = await login(email, password);

      // Store user data in AsyncStorage
      const userData = userCredential; // Assuming user data is valid JSON serializable
      console.log("User data to be stored:", userData);
      await AsyncStorage.setItem('userData', JSON.stringify(userData));

      // Navigate to home screen
      toast.show('You have successfully logged in!', { type: 'success' });
      navigation.navigate('HomeDrawer'); // Assuming 'Home' is the name of your home screen

      // Retrieve and log stored user data from AsyncStorage
      const storedUserData = await AsyncStorage.getItem('userData');
      console.log("Stored user data:", storedUserData);
    } catch (error) {
      toast.show(error.message, { type: 'danger' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content"/>
      <Image style={styles.backgroundImage} source={require('../assets/images/background.png')}/>

      <View style={styles.lightImagesContainer}>
        <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify().damping(3)} style={styles.lightImageLarge} source={require('../assets/images/light.png')}/>
        <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify().damping(3)} style={styles.lightImageSmall} source={require('../assets/images/light.png')}/>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Animated.Text entering={FadeInUp.duration(1000).springify()} style={styles.headerText}>
            Login
          </Animated.Text>
        </View>

        <View style={styles.formContainer}>
          <Animated.View entering={FadeInDown.duration(1000).springify()} style={styles.inputContainer}>
            <TextInput
              placeholder='Email'
              placeholderTextColor={'gray'}
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} style={styles.inputContainer}>
            <TextInput
              placeholder='Password'
              placeholderTextColor={'gray'}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Login</Text>}
            </TouchableOpacity>
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} style={styles.signupContainer}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.signupText}>SignUp</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  lightImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
  },
  lightImageLarge: {
    height: 225,
    width: 90,
  },
  lightImageSmall: {
    height: 160,
    width: 65,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingTop: 40,
  },
  headerContainer: {
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1,
    fontSize: 40,
    marginTop: 100,
  },
  formContainer: {
    alignItems: 'center',
    marginHorizontal: 16,
  },
  inputContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: 16,
    borderRadius: 16,
    width: '100%',
    marginBottom: 12,
  },
  input: {
    height: 40,
    paddingVertical: 0,
  },
  errorText: {
    color: 'red',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#38bdf8',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#0284c7',
  },
});
