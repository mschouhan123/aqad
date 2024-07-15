import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TextInput, Button,FlatList } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import Header from '../component/Header';
import { getDBConnection, createTable, getUsers, insertUser, updateUser, deleteUser } from '../../database/Database';

const DetailsScreen = ({navigation}) => {
  const data = {
    labels: [xaxix],
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

  const [dbGraph, setdbGraph] = useState(null);
  const [graph, setGraph] = useState([]);
  const [month, setMonth] = useState('');
  const [unit, setUnit] = useState('');
  const [xaxix, setXaxix] = useState([]);
  const [yaxix, setYaxix] = useState([]);
  const [editingGraph, setEditingGraph] = useState(null);

  useEffect(() => {
    const initializeDatabase = async () => {
      const dbGraph = await getDBConnection();
      setdbGraph(dbGraph);
      await createTable(dbGraph);
      loadUsers(dbGraph);
    };

    initializeDatabase();
  }, []);

  const loadUsers = async (dbGraph) => {
    const graph = await getUsers(dbGraph);
    console.log("graph123 --> ", graph);
    setGraph(graph);
    for(let i=0;i<graph.length;i++){
        setXaxix(graph.age);
        setYaxix(graph.name);
    }
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
    setMonth(user.month);
    setUnit(user.unit.toString());
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

  return (
    <View>
       <Header isDrawer={true} navigation={navigation}/>
      <Text>Details Screen</Text>
      <View style={{marginHorizontal: 0}}>
      <BarChart
        style={{ marginVertical: 8, borderRadius: 16 }}
        data={data}
        width={screenWidth }
        height={220}
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        fromZero={true}
        showValuesOnTopOfBars={true}
      />

      <TextInput
        placeholder="month"
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
        <Button title="Update User" onPress={handleUpdateUser} />
      ) : (
        <Button title="Add User" onPress={handleAddUser} />
      )}
      <FlatList
        data={graph}
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
    </View>
  );
};
const styles = StyleSheet.create({
 
  input: {
    marginBottom: 8,
    borderBottomWidth: 1,
    padding: 8,
  },
 
});
export default DetailsScreen;

