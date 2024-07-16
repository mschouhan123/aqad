// import React, { useEffect } from "react";
// import { Image, Text, TouchableOpacity, View, Linking } from "react-native";
// import { ScrollView } from "react-native-gesture-handler";
// // import LinearGradient from "react-native-linear-gradient";
// // import { images } from "../../assets/imageUri";
// import { width, height } from "../assets/scale";

// const DrawerScreen = ({ navigation }) => {
//     return (
//       <ScrollView
//         style={{
//           flex: 1,
//           flexDirection: "column",
//           width: "auto",
//         }}
//       >
//         {/* <LinearGradient
//           colors={["#FF9F0F", "#F9DFBA", "#FF9F0F"]}
//           style={{ height: height * 1 }}
//         > */}
//           <View style={{ width: width * 0.795, height: height * 0.9}}>
//             <View style={{ height: "50%", width: "90%"  }}>
//               {/* <Image
//                 source={images.drawerBGImg}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                 }}
//                 resizeMode="stretch"
//               /> */}
//             </View>
  
//             {/* {infod.map((item, index) => ( */}
//               <View
//                 style={{
//                   flexDirection: "row",
//                   paddingHorizontal: 30,
//                   paddingVertical: 10,
//                   alignItems: "center",
//                 }}
//               >
//                 <TouchableOpacity
//                   onPress={() => {
//                     navigate(item.name,navigation);
//                   }}
//                 >
//                   <Text
//                     style={{
//                       fontWeight: "800",
//                       fontSize: 17,
//                       paddingLeft: 10,
//                       color: "#000",
//                     }}
//                   >
//                     "item name"
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             {/* // ))} */}
  
//             <Text
//               style={{
//                 fontWeight: "500",
//                 fontSize: 12,
//                 paddingLeft: 30,
//                 paddingTop: 10,
//                 color: "#000",
//               }}
//             >
//               Version 3.0.0
//             </Text>
//           </View>
//         {/* </LinearGradient> */}
//       </ScrollView>
//     );
//   };
  
//   export default DrawerScreen;


// import React from 'react';
// import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

// const DrawerScreen = ({ navigation }) => {
//   return (
//     <ScrollView style={styles.drawerContainer}>
//       <View style={styles.drawerContent}>
//         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//           <Text style={styles.drawerItem}>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('GraphTab')}>
//           <Text style={styles.drawerItem}>Graph</Text>
//         </TouchableOpacity>
//         <Text style={styles.drawerVersion}>Version 3.0.0</Text>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   drawerContainer: {
//     flex: 1,
//   },
//   drawerContent: {
//     padding: 20,
//   },
//   drawerItem: {
//     fontSize: 18,
//     marginVertical: 10,
//   },
//   drawerVersion: {
//     fontSize: 12,
//     marginTop: 20,
//     color: '#999',
//   },
// });

// export default DrawerScreen;

// import React from 'react';
// import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
// import { DrawerActions, useNavigationState } from '@react-navigation/native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useAuth } from '../Context/AuthContext';

// const DrawerScreen = ({ navigation }) => {
//   const state = useNavigationState((state) => state);
//   const {logout} = useAuth();

//   return (
//     <ScrollView style={styles.drawerContainer}>
//       <View style={styles.drawerHeader}>
//         <TouchableOpacity onPress={() => navigation.navigate('HomeTab')} style={styles.drawerItemContainer}>
//           <Text
//             style={[
//               styles.drawerItem,
//               state.routes[state.index].name === 'HomeTab' && styles.activeDrawerItem,
//             ]}
//           >
//             Home
//           </Text>
//           {state.routes[state.index].name === 'HomeTab' && <View style={styles.verticalLine} />}
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
//           <Ionicons name="close" size={24} color="black" />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.drawerContent}>
//         <TouchableOpacity onPress={() => navigation.navigate('GraphTab')} style={styles.drawerItemContainer}>
//           <Text
//             style={[
//               styles.drawerItem,
//               state.routes[state.index].name === 'GraphTab' && styles.activeDrawerItem,
//             ]}
//           >
//             Graph
//           </Text>
//           {state.routes[state.index].name === 'GraphTab' && <View style={styles.verticalLine} />}
//         </TouchableOpacity>
//         <TouchableOpacity onPress={()=>logout}>
//         <Text style={styles.drawerItem}>Logout</Text>
//       </TouchableOpacity>
//         <Text style={styles.drawerVersion}>Version 3.0.0</Text>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   drawerContainer: {
//     flex: 1,
//   },
//   drawerHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   drawerContent: {
//     paddingVertical: 20,
//     paddingHorizontal: 20,
//   },
//   drawerItemContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   drawerItem: {
//     fontSize: 18,
//     color: 'black', // Default color
//   },
//   activeDrawerItem: {
//     color: '#673ab7', // Active color
//     fontWeight: 'bold',
//   },
//   verticalLine: {
//     height: 2,
//     width: '100%',
//     backgroundColor: '#673ab7',
//     marginTop: 5,
//   },
//   drawerVersion: {
//     fontSize: 12,
//     color: '#999',
//     marginTop: 20,
//   },
// });

// export default DrawerScreen;


// import React from 'react';
// import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
// import { DrawerActions, useNavigationState } from '@react-navigation/native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useAuth } from '../Context/AuthContext';

// const DrawerScreen = ({ navigation }) => {
//   const state = useNavigationState((state) => state);
//   const { logout } = useAuth(); // Import logout function from AuthContext

//   const handleLogout = async () => {
//     try {
//       await logout(); // Call logout function from AuthContext
//       // You can navigate to Login screen or any other screen after logout if needed
//       navigation.navigate('Login'); // Navigate to Login screen after logout
//     } catch (error) {
//       console.error("Error logging out:", error);
//       // Handle error if needed
//     }
//   };

//   return (
//     <ScrollView style={styles.drawerContainer}>
//       <View style={styles.drawerHeader}>
//         <TouchableOpacity onPress={() => navigation.navigate('HomeTab')} style={styles.drawerItemContainer}>
//           <Text
//             style={[
//               styles.drawerItem,
//               state.routes[state.index].name === 'HomeTab' && styles.activeDrawerItem,
//             ]}
//           >
//             Home
//           </Text>
//           {state.routes[state.index].name === 'HomeTab' && <View style={styles.verticalLine} />}
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
//           <Ionicons name="close" size={24} color="black" />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.drawerContent}>
//         <TouchableOpacity onPress={() => navigation.navigate('GraphTab')} style={styles.drawerItemContainer}>
//           <Text
//             style={[
//               styles.drawerItem,
//               state.routes[state.index].name === 'GraphTab' && styles.activeDrawerItem,
//             ]}
//           >
//             Graph
//           </Text>
//           {state.routes[state.index].name === 'GraphTab' && <View style={styles.verticalLine} />}
//         </TouchableOpacity>
//         <TouchableOpacity onPress={handleLogout}>
//           <Text style={styles.drawerItem}>Logout</Text>
//         </TouchableOpacity>
//         <Text style={styles.drawerVersion}>Version 3.0.0</Text>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   drawerContainer: {
//     flex: 1,
//   },
//   drawerHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   drawerContent: {
//     paddingVertical: 20,
//     paddingHorizontal: 20,
//   },
//   drawerItemContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   drawerItem: {
//     fontSize: 18,
//     color: 'black', // Default color
//   },
//   activeDrawerItem: {
//     color: '#673ab7', // Active color
//     fontWeight: 'bold',
//   },
//   verticalLine: {
//     height: 2,
//     width: '100%',
//     backgroundColor: '#673ab7',
//     marginTop: 5,
//   },
//   drawerVersion: {
//     fontSize: 12,
//     color: '#999',
//     marginTop: 20,
//   },
// });

// export default DrawerScreen;


// import React from 'react';
// import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
// import { DrawerActions, useNavigationState } from '@react-navigation/native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useAuth } from '../Context/AuthContext';

// const DrawerScreen = ({ navigation }) => {
//   const state = useNavigationState(state => state); // Ensure state is properly initialized

//   const { logout } = useAuth(); // Import logout function from AuthContext

//   const handleLogout = async () => {
//     try {
//       await logout(); // Call logout function from AuthContext
//       // You can navigate to Login screen or any other screen after logout if needed
//       navigation.navigate('Login'); // Navigate to Login screen after logout
//     } catch (error) {
//       console.error("Error logging out:", error);
//       // Handle error if needed
//     }
//   };

//   return (
//     <ScrollView style={styles.drawerContainer}>
//       <View style={styles.drawerHeader}>
//         <TouchableOpacity onPress={() => navigation.navigate('HomeDrawer')} style={styles.drawerItemContainer}>
//           <Text
//             style={[
//               styles.drawerItem,
//               state && state.routes[state.index].name === 'HomeDrawer' && styles.activeDrawerItem, // Check for state existence
//             ]}
//           >
//             Home
//           </Text>
//           {state && state.routes[state.index].name === 'HomeTab' && <View style={styles.verticalLine} />}
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
//           <Ionicons name="close" size={24} color="black" />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.drawerContent}>
//         <TouchableOpacity onPress={() => navigation.navigate('GraphDrawer')} style={styles.drawerItemContainer}>
//           <Text
//             style={[
//               styles.drawerItem,
//               state && state.routes[state.index].name === 'GraphDrawer' && styles.activeDrawerItem, // Check for state existence
//             ]}
//           >
//             Graph
//           </Text>
//           {state && state.routes[state.index].name === 'GraphTab' && <View style={styles.verticalLine} />}
//         </TouchableOpacity>
//         <TouchableOpacity onPress={handleLogout}>
//           <Text style={styles.drawerItem}>Logout</Text>
//         </TouchableOpacity>
//         <Text style={styles.drawerVersion}>Version 3.0.0</Text>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   drawerContainer: {
//     flex: 1,
//   },
//   drawerHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   drawerContent: {
//     paddingVertical: 20,
//     paddingHorizontal: 20,
//   },
//   drawerItemContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   drawerItem: {
//     fontSize: 18,
//     color: 'black', // Default color
//   },
//   activeDrawerItem: {
//     color: '#673ab7', // Active color
//     fontWeight: 'bold',
//   },
//   verticalLine: {
//     height: 2,
//     width: '100%',
//     backgroundColor: '#673ab7',
//     marginTop: 5,
//   },
//   drawerVersion: {
//     fontSize: 12,
//     color: '#999',
//     marginTop: 20,
//   },
// });

// export default DrawerScreen;


// import React from 'react';
// import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
// import { DrawerActions, useNavigationState } from '@react-navigation/native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useAuth } from '../Context/AuthContext';

// const DrawerScreen = ({ navigation }) => {
//   const state = useNavigationState(state => state); // Ensure state is properly initialized

//   const { logout } = useAuth(); // Import logout function from AuthContext

//   const handleLogout = async () => {
//     try {
//       await logout(); // Call logout function from AuthContext
//       // Navigate to Login screen after logout
//       navigation.navigate('Login');
//     } catch (error) {
//       console.error("Error logging out:", error);
//       // Handle error if needed
//     }
//   };

//   return (
//     <ScrollView style={styles.drawerContainer}>
//       <View style={styles.drawerHeader}>
//         <TouchableOpacity onPress={() => navigation.navigate('HomeDrawer')} style={styles.drawerItemContainer}>
//           <Text
//             style={[
//               styles.drawerItem,
//               state && state.routes[state.index].name === 'HomeDrawer' && styles.activeDrawerItem, // Check for state existence
//             ]}
//           >
//             Home
//           </Text>
//           {state && state.routes[state.index].name === 'HomeTab' && <View style={styles.verticalLine} />}
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
//           <Ionicons name="close" size={24} color="black" />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.drawerContent}>
//         <TouchableOpacity onPress={() => navigation.navigate('GraphDrawer')} style={styles.drawerItemContainer}>
//           <Text
//             style={[
//               styles.drawerItem,
//               state && state.routes[state.index].name === 'GraphTab' && styles.activeDrawerItem, // Check for state existence
//             ]}
//           >
//             Graph
//           </Text>
//           {state && state.routes[state.index].name === 'GraphTab' && <View style={styles.verticalLine} />}
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('ContactDrawer')} style={styles.drawerItemContainer}>
//           <Text
//             style={[
//               styles.drawerItem,
//               state && state.routes[state.index].name === 'ContactDrawer' && styles.activeDrawerItem, // Check for state existence
//             ]}
//           >
//             Contact
//           </Text>
//           {state && state.routes[state.index].name === 'GraphTab' && <View style={styles.verticalLine} />}
//         </TouchableOpacity>
//         <TouchableOpacity onPress={handleLogout}>
//           <Text style={styles.drawerItem}>Logout</Text>
//         </TouchableOpacity>
//         <Text style={styles.drawerVersion}>Version 3.0.0</Text>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   drawerContainer: {
//     flex: 1,
//   },
//   drawerHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   drawerContent: {
//     paddingVertical: 20,
//     paddingHorizontal: 20,
//   },
//   drawerItemContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   drawerItem: {
//     fontSize: 18,
//     color: 'black', // Default color
//   },
//   activeDrawerItem: {
//     color: '#673ab7', // Active color
//     fontWeight: 'bold',
//   },
//   verticalLine: {
//     height: 2,
//     width: '100%',
//     backgroundColor: '#673ab7',
//     marginTop: 5,
//   },
//   drawerVersion: {
//     fontSize: 12,
//     color: '#999',
//     marginTop: 20,
//   },
// });

// export default DrawerScreen;


// import React from 'react';
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { DrawerActions, useNavigationState } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../Context/AuthContext';

const DrawerScreen = ({ navigation }) => {
  const state = useNavigationState(state => state); // Ensure state is properly initialized

  const { logout } = useAuth(); // Import logout function from AuthContext

  const handleLogout = async () => {
    try {
      await logout(); // Call logout function from AuthContext
      // Navigate to Login screen after logout
      navigation.navigate('Login');
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle error if needed
    }
  };

  return (
    <ScrollView style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeDrawer')} style={styles.drawerItemContainer}>
          <Text
            style={[
              styles.drawerItem,
              state && state.routes[state.index].name === 'HomeDrawer' && styles.activeDrawerItem, // Check for state existence
            ]}
          >
            Home
          </Text>
          {state && state.routes[state.index].name === 'HomeDrawer' && <View style={styles.verticalLine} />}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.drawerContent}>
        <TouchableOpacity onPress={() => navigation.navigate('GraphDrawer')} style={styles.drawerItemContainer}>
          <Text
            style={[
              styles.drawerItem,
              state && state.routes[state.index].name === 'GraphDrawer' && styles.activeDrawerItem, // Check for state existence
            ]}
          >
            Graph
          </Text>
          {state && state.routes[state.index].name === 'GraphDrawer' && <View style={styles.verticalLine} />}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ContactDrawer')} style={styles.drawerItemContainer}>
          <Text
            style={[
              styles.drawerItem,
              state && state.routes[state.index].name === 'ContactDrawer' && styles.activeDrawerItem, // Check for state existence
            ]}
          >
            Contact
          </Text>
          {state && state.routes[state.index].name === 'ContactDrawer' && <View style={styles.verticalLine} />}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <Text style={styles.drawerVersion}>Version 3.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 48,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
  },
  drawerContent: {
    paddingTop: 32,
  },
  drawerItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  drawerItem: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  activeDrawerItem: {
    color: '#007AFF',
  },
  verticalLine: {
    width: 2,
    height: '100%',
    backgroundColor: '#007AFF',
  },
  logoutButton: {
    marginTop: 32,
    paddingVertical: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF3B30',
  },
  drawerVersion: {
    marginTop: 32,
    fontSize: 14,
    color: '#999',
  },
});

export default DrawerScreen;
