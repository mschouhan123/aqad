import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

export default function ContactScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!name) {
      errors.name = 'Name is required';
      valid = false;
    }
    if (!email) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
      valid = false;
    }
    if (!message) {
      errors.message = 'Message is required';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    // Handle form submission
    alert('Contact information submitted successfully');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidingView}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Contact Us</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        <TextInput
          style={styles.textArea}
          value={message}
          onChangeText={setMessage}
          placeholder="Message"
          multiline
        />
        {errors.message && <Text style={styles.errorText}>{errors.message}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  textArea: {
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 15,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
});
