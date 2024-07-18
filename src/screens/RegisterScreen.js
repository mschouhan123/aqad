import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar, StyleSheet, ScrollView, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import { useAuth } from '../Context/AuthContext';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const toast = useToast();

  const { signup } = useAuth();

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!username) {
      newErrors.username = 'Username is required';
      valid = false;
    }
    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
      valid = false;
    }
    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignup = async () => {
    if (!validate()) return;

    setIsLoading(true);
    try {
      await signup(username, email, password);
      toast.show('You have successfully registered!', { type: 'success' });
      navigation.navigate('Login');
    } catch (error) {
      toast.show(error.message, { type: 'danger' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light" />
      <Image style={styles.backgroundImage} source={require('../assets/images/background.png')} />

      <View style={styles.lightImagesContainer}>
        <Animated.Image style={styles.lightImageLarge} entering={FadeInUp.delay(200).duration(1000).springify().damping(3)} source={require('../assets/images/light.png')} />
        <Animated.Image style={styles.lightImageSmall} entering={FadeInUp.delay(400).duration(1000).springify().damping(3)} source={require('../assets/images/light.png')} />
      </View>

      <ScrollView contentContainerStyle={styles.formContainer}>
        <View style={styles.headerContainer}>
          <Animated.Text style={styles.headerText} entering={FadeInUp.duration(1000).springify()}>
            SignUp
          </Animated.Text>
        </View>

        <View style={styles.inputContainer}>
          <Animated.View style={[styles.inputWrapper, styles.smallInputWrapper]} entering={FadeInDown.duration(1000).springify()}>
            <TextInput
              placeholder='Username'
              placeholderTextColor={'gray'}
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />
            {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
          </Animated.View>
          <Animated.View style={[styles.inputWrapper, styles.smallInputWrapper]} entering={FadeInDown.delay(200).duration(1000).springify()}>
            <TextInput
              placeholder='Email'
              placeholderTextColor={'gray'}
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </Animated.View>
          <Animated.View style={[styles.inputWrapper, styles.smallInputWrapper]} entering={FadeInDown.delay(400).duration(1000).springify()}>
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
          <Animated.View style={styles.buttonContainer} entering={FadeInDown.delay(600).duration(1000).springify()}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSignup}
              disabled={isLoading}
            >
              {isLoading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>SignUp</Text>}
            </TouchableOpacity>
          </Animated.View>
          <View style={styles.signupContainer}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signupText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    top: 0,
  },
  lightImageLarge: {
    height: 225,
    position: 'relative',
    top: '-39%',
    width: 90,
  },
  lightImageSmall: {
    position: 'relative',
    // top: '-29%',
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
    marginBottom: 10,
    marginTop:0
  },
  headerText: {
    position: 'relative',
    top: '-1%',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
    marginVertical:80
  },
  inputWrapper: {
    marginBottom: 10,
  },
  smallInputWrapper: {
    width: '100%',
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
