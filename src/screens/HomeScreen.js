import React, { useEffect, useState } from 'react';
import {BackHandler, View, Text, TextInput, FlatList, StyleSheet ,KeyboardAvoidingView ,TouchableOpacity} from 'react-native';
import { getDBConnection, createTable, getUsers, insertUser, updateUser, deleteUser} from '../../database/DatabaseUsers';
import { useToast } from 'react-native-toast-notifications';


const HomeScreen = ({ navigation }) => {
  const [db, setDb] = useState(null);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [backPressCount, setBackPressCount] = useState(0);
  const toast = useToast();
  
  useEffect(() => {
    const backAction = () => {
      if (backPressCount === 1) {
        BackHandler.exitApp();
      } else {
        setBackPressCount(1);
        toast.show('Press back again to exit ', { type: 'info',duration: 1000 });

        setTimeout(() => {
          setBackPressCount(0);
        }, 1000); // Reset count after 2 seconds
      }
      return true; // Prevent default back action
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [backPressCount]);

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
      const ageNumber = parseInt(age, 10);
      if (!isNaN(ageNumber)) {
        await insertUser(db, name, ageNumber);
        loadUsers(db);
        setName('');
        setAge('');
      } else {
        alert('Please enter a valid age.');
      }
    }
  };

  const handleEditUser = (user) => {
    setName(user.name);
    setAge(user.age.toString());
    setEditingUser(user);
  };

  const handleUpdateUser = async () => {
    if (editingUser && name && age) {
      const ageNumber = parseInt(age, 10);
      if (!isNaN(ageNumber)) {
        await updateUser(db, editingUser.id, name, ageNumber);
        loadUsers(db);
        setName('');
        setAge('');
        setEditingUser(null);
      } else {
        alert('Please enter a valid age.');
      }
    }
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(db, id);
    loadUsers(db);
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userContainer}>
      <View style={styles.userInfo}>
        <Text style={styles.userText}>{item.name}</Text>
        <Text style={styles.userText}>Age: {item.age}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleEditUser(item)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#F44336' }]} onPress={() => handleDeleteUser(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={100}
    >
      <Text style={styles.header}>User Form</Text>
      <Text style={styles.subHeading}>This is to demonstrate the add user functionality using the local database</Text>
      <FlatList
        ListHeaderComponent={
          <View style={styles.formContainer}>
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
                <TouchableOpacity style={styles.buttonSubmit} onPress={handleUpdateUser}>
                <Text style={styles.buttonText}>Update User</Text>
              </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.buttonSubmit} onPress={handleAddUser}>
            <Text style={styles.buttonText}>Add User</Text>
          </TouchableOpacity>
           )}
          </View>
        }
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUserItem}
        contentContainerStyle={styles.flatListContentContainer}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  flatListContentContainer: {
    padding: 16,
  },
  formContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    fontSize: 28,
    fontWeight:'bold',
    textAlign: 'center',
    // marginBottom: 2,
    marginTop:10,
    color: '#333',
    // letterSpacing: 1,
  // textTransform: 'uppercase',
  },
  input: {
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 8,
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userInfo: {
    flex: 1,
  },
  userText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    marginHorizontal: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonSubmit: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
    marginLeft: 10
  },
});

export default HomeScreen;
