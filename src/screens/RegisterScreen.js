import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar, StyleSheet } from 'react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
// import { useToast } from 'react-native-toast-notifications';
import { useAuth } from '../Context/AuthContext';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();
  // const toast = useToast();

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

    try {
      await signup(username, email, password);
      // toast.show('You have successfully registered!', { type: 'success' });
      navigation.navigate('Login');
    } catch (error) {
      // toast.show(error.message, { type: 'danger' });
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

      <View style={styles.formContainer}>
        <View style={styles.titleContainer}>
          <Animated.Text style={styles.titleText} entering={FadeInUp.duration(1000).springify()}>
            SignUp
          </Animated.Text>
        </View>

        <View style={styles.inputContainer}>
          <Animated.View style={styles.inputWrapper} entering={FadeInDown.duration(1000).springify()}>
            <TextInput
              placeholder='Username'
              placeholderTextColor={'gray'}
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />
            {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
          </Animated.View>
          <Animated.View style={styles.inputWrapper} entering={FadeInDown.delay(200).duration(1000).springify()}>
            <TextInput
              placeholder='Email'
              placeholderTextColor={'gray'}
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </Animated.View>
          <Animated.View style={styles.inputWrapper} entering={FadeInDown.delay(400).duration(1000).springify()}>
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
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>SignUp</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    height: 225,
    width: 90,
  },
  lightImageSmall: {
    height: 160,
    width: 65,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 48,
    marginTop: 4,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 16,
    marginTop:170
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
  },
  inputContainer: {
    padding: 16,
    borderRadius: 16,
    width: '100%',
    marginBottom: 12,
    marginTop:80
  },
  inputWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 15,
    borderRadius: 20,
    width: '100%',
    marginBottom: 12,
  },
  input: {
    height: 40,
    paddingVertical: 0,
    color: 'black',
  },
  buttonWrapper: {
    width: '100%',
  },
  button: {
    backgroundColor: '#00B0FF',
    padding: 15,
    borderRadius: 20,
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  linkWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  linkText: {
    color: '#00B0FF',
  },
  errorText: {
    color: 'red',
  },
});
