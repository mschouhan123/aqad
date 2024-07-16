import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
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
    <View style={styles.container}>
      <StatusBar barStyle="light" />
      <Image style={styles.backgroundImage} source={require('../assets/images/background.png')} />

      <View style={styles.logoContainer}>
        <Animated.Image style={styles.lightImageLarge} entering={FadeInUp.delay(200).duration(1000).springify().damping(3)} source={require('../assets/images/light.png')} />
        <Animated.Image style={styles.lightImageSmall} entering={FadeInUp.delay(400).duration(1000).springify().damping(3)} source={require('../assets/images/light.png')} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.formContainer}>
          <View style={styles.titleContainer}>
            <Animated.Text style={styles.titleText} entering={FadeInUp.duration(1000).springify()}>
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
            <Animated.View style={styles.buttonWrapper} entering={FadeInDown.delay(600).duration(1000).springify()}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleSignup}
                disabled={isLoading}
              >
                {isLoading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>SignUp</Text>}
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={styles.linkWrapper} entering={FadeInDown.delay(800).duration(1000).springify()}>
              <Text>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>Login</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
  },
  lightImageLarge: {
    height: 180, // Adjusted size for smaller visibility
    width: 72, // Adjusted size for smaller visibility
  },
  lightImageSmall: {
    height: 130, // Adjusted size for smaller visibility
    width: 52, // Adjusted size for smaller visibility
  },
  formContainer: {
    width: '80%', // Adjusted width for better visibility
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 48,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 32, // Adjusted font size for smaller visibility
  },
  inputContainer: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginTop: 32,
    width: '100%',
  },
  inputWrapper: {
    marginBottom: 12,
  },
  smallInputWrapper: {
    width: '100%',
  },
  input: {
    height: 40,
    paddingVertical: 0,
    color: 'black',
    fontSize: 16, // Adjusted font size for smaller visibility
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 12,
  },
  button: {
    backgroundColor: '#00B0FF',
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18, // Adjusted font size for smaller visibility
    fontWeight: 'bold',
    color: 'white',
  },
  linkWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  linkText: {
    color: '#00B0FF',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 12, // Adjusted font size for smaller visibility
  },
});
