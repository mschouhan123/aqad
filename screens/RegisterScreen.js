import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validate = () => {
    if (!username || !password || !email) {
      setError('Please fill out all fields.');
    } else if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
    } else {
      setError('');
      // Proceed with registration
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button title="Register" onPress={validate} />
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
});

export default RegisterScreen;
