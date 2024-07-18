import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const navigation = useNavigation();
  
    useEffect(() => {
      const timer = setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);
  
      return () => clearTimeout(timer);
    }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/aqadlogo.png")}
        style={styles.logo}
      />
      <Image
        source={require("../assets/images/aqadtext.png")}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 100,
    marginRight: 20,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
