import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
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
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar barStyle="light-content"/>
      <Image style={styles.backgroundImage} source={require('../assets/images/background.png')}/>

      {/* <View style={styles.lightImagesContainer}>
        <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify().damping(3)} style={styles.lightImageLarge} source={require('../assets/images/light.png')}/>
        <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify().damping(3)} style={styles.lightImageSmall} source={require('../assets/images/light.png')}/>
      </View> */}

      <View style={styles.formContainer}>
        <View style={styles.headerContainer}>
          <Animated.Text entering={FadeInUp.duration(1000).springify()} style={styles.headerText}>
            Login
          </Animated.Text>
        </View>

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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImage: {
    height: '80%',
    width: '100%',
    position: 'absolute',
    tintColor: "#f27b21"
  },
  lightImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    // height: '10',
    top: 0,
  },
  lightImageLarge: {
    height: 225,
    position:'relative',
    top:'-39%',
    width: 90,
  },
  lightImageSmall: {
    position:'relative',
    top:'-29%',
    height: 160,
    width: 65,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 50, // Adjust as needed for spacing from top
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop:0
  },
  headerText: {
    position:'relative',
    top:'-85%',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#f27b21',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  signupText: {
    color: '#0284c7',
    fontWeight: 'bold',
  },
});
