import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TextInput, Button, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { getDBConnection, createTable, getUsers, insertUser, updateUser, deleteUser } from '../../database/DatabaseGraph';

const DetailsScreen = ({ navigation }) => {
  const [dbGraph, setDbGraph] = useState(null);
  const [graph, setGraph] = useState([]);
  const [month, setMonth] = useState('');
  const [unit, setUnit] = useState('');
  const [xaxix, setXaxix] = useState([]);
  const [yaxix, setYaxix] = useState([]);
  const [editingGraph, setEditingGraph] = useState(null);

  useEffect(() => {
    const initializeDatabase = async () => {
      const dbGraph = await getDBConnection();
      setDbGraph(dbGraph);
      await createTable(dbGraph);
      loadUsers(dbGraph);
    };

    initializeDatabase();
  }, []);

  const loadUsers = async (dbGraph) => {
    const graph = await getUsers(dbGraph);
    setGraph(graph);

    const newXaxix = [];
    const newYaxix = [];

    for (let i = 0; i < graph.length; i++) {
      newXaxix.push(graph[i].name); // Ensure labels are strings
      newYaxix.push(Number(graph[i].age)); // Ensure data points are numbers
    }

    setXaxix(newXaxix);
    setYaxix(newYaxix);
  };

  const handleAddUser = async () => {
    if (month && unit) {
      await insertUser(dbGraph, month, parseInt(unit));
      loadUsers(dbGraph);
      setMonth('');
      setUnit('');
    }
  };

  const handleEditUser = (user) => {
    setMonth(user.name);
    setUnit(user.age.toString());
    setEditingGraph(user);
  };

  const handleUpdateUser = async () => {
    if (editingGraph && month && unit) {
      await updateUser(dbGraph, editingGraph.id, month, parseInt(unit));
      loadUsers(dbGraph);
      setMonth('');
      setUnit('');
      setEditingGraph(null);
    }
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(dbGraph, id);
    loadUsers(dbGraph);
  };

  const data = {
    labels: xaxix,
    datasets: [
      {
        data: yaxix
      }
    ]
  };

  // Get the screen width for responsive design
  const screenWidth = Dimensions.get('window').width;

  // Define the chart configuration
  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.8,
    decimalPlaces: 0,
    propsForBackgroundLines: {
      stroke: '#e3e3e3'
    }
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userContainer}>
      <Text style={styles.userText}>{item.name} - {item.age}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => handleEditUser(item)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleDeleteUser(item.id)}>
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
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.header}>Display Graph</Text>
            <Text style={styles.subHeading}>Include the month and unit data to display the graph using the local database.</Text>
            <View style={styles.chartContainer}>
              {xaxix.length > 0 && yaxix.length > 0 && (
                <ScrollView horizontal>
                  <BarChart
                    style={styles.chart}
                    data={data}
                    width={Math.max(screenWidth - 32, xaxix.length * 60)}
                    height={220}
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                    fromZero={true}
                    showValuesOnTopOfBars={true}
                  />
                </ScrollView>
              )}

              <TextInput
                placeholder="Month"
                value={month}
                onChangeText={setMonth}
                style={styles.input}
              />
              <TextInput
                placeholder="Unit"
                value={unit}
                onChangeText={setUnit}
                style={styles.input}
                keyboardType="numeric"
              />
              {editingGraph ? (
                <TouchableOpacity style={styles.buttonSubmit} onPress={handleUpdateUser}>
                <Text style={styles.buttonText}>Update Graph Unit</Text>
              </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.buttonSubmit} onPress={handleAddUser}>
            <Text style={styles.buttonText}>Add Graph Unit</Text>
          </TouchableOpacity>
              )}
            </View>
          </>
        }
        data={graph}
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
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#333',
  },
 subHeading: {
    fontSize: 18,
    marginBottom: 16,
    color: '#333',
  },
  chartContainer: {
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
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  input: {
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 8,
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
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
    marginHorizontal: 8,
  },
  editButton: {
    backgroundColor: '#4CAF50', // Green
  },
  deleteButton: {
    backgroundColor: '#F44336', // Red
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
  }
});

export default DetailsScreen;
