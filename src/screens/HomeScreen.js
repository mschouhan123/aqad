import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { getDBConnection, createTable, getUsers, insertUser, updateUser, deleteUser } from '../../database/DatabaseUsers';
import Header from '../component/Header';
import CustomDrawerContent from '../components/CustomDrawerContent';

const HomeScreen = ({ navigation }) => {
  const [db, setDb] = useState(null);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const initializeDatabase = async () => {
      const db = await getDBConnection();
      setDb(db);
      await createTable(db);
      loadUsers(db);
    };

    initializeDatabase();
  }, []);

  const loadUsers = async (db) => {
    const users = await getUsers(db);
    setUsers(users);
  };

  const handleAddUser = async () => {
    if (name && age) {
      await insertUser(db, name, parseInt(age));
      loadUsers(db);
      setName('');
      setAge('');
    }
  };

  const handleEditUser = (user) => {
    setName(user.name);
    setAge(user.age.toString());
    setEditingUser(user);
  };

  const handleUpdateUser = async () => {
    if (editingUser && name && age) {
      await updateUser(db, editingUser.id, name, parseInt(age));
      loadUsers(db);
      setName('');
      setAge('');
      setEditingUser(null);
    }
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(db, id);
    loadUsers(db);
  };

  return (
    <View style={styles.container}>
      {/* <Header isDrawer={true} navigation={navigation} title="Home" /> */}
      {/* <CustomDrawerContent/> */}

      <Text style={styles.header}>SQLite Example</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        style={styles.input}
        keyboardType="numeric"
      />
      {editingUser ? (
        <Button title="Update User" onPress={handleUpdateUser} />
      ) : (
        <Button title="Add User" onPress={handleAddUser} />
      )}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text style={styles.userText}>{item.name} - {item.age}</Text>
            <Button title="Edit" onPress={() => handleEditUser(item)} />
            <Button title="Delete" onPress={() => handleDeleteUser(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    marginBottom: 8,
    borderBottomWidth: 1,
    padding: 8,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
  },
  userText: {
    fontSize: 18,
  },
});

export default HomeScreen;
