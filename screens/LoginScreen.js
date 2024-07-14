import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    if (!username || !password) {
      setError('Please fill out all fields.');
    } else {
      setError('');
      // Proceed with login
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
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
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button title="Login" onPress={validate} />
      <Button title="Register" onPress={() => navigation.navigate('RegisterScreen')} />
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

export default LoginScreen;
