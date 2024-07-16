import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useAuth } from '../Context/AuthContext';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';  // Import the auth object

export default function ProfileScreen() {
  const { user, updateUserDetails } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
      setEmail(user.email);
    }
  }, [user]);

  const handleUpdate = () => {
    updateUserDetails(displayName)
      .then(() => {
        alert('Profile updated successfully');
      })
      .catch(error => {
        console.error("Error updating profile: ", error);
        alert('Failed to update profile');
      });
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      alert('Please fill in both password fields');
      return;
    }

    if (!user || !user.email) {
      alert('No user is logged in');
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);

      // Reauthenticate the user with the current password
      await reauthenticateWithCredential(auth.currentUser, credential);

      // Update the user's password
      await updatePassword(auth.currentUser, newPassword);
      alert('Password updated successfully');

      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      // console.error("Error updating password: ", error);
      alert('Failed to update password');
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image
        source={{ uri: 'https://your-image-url.com/avatar.png' }} // Replace with user's avatar URL if available
        style={styles.avatar}
      /> */}
      <Text style={styles.title}>Profile</Text>
      <TextInput
        style={styles.input}
        value={displayName}
        onChangeText={setDisplayName}
        placeholder="Display Name"
      />
      <TextInput
        style={styles.input}
        value={email}
        editable={false}
        placeholder="Email"
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Change Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
        placeholder="Current Password"
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="New Password"
      />
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Update Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 30,
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
});
