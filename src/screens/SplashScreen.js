import React, { useState,useEffect } from 'react';
import { View, Image,StyleSheet } from 'react-native';
import { images } from '../assets/imageUri';

const SplashScreen = ({ navigation }) => {
  
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("MyDrawer");
        }, 1000)
    }, [])

    return (
      <View style={styles.container}>
        <Image
          source={images.aqadLogo}
          style={styles.logo}
        />
        <Image
          source={images.aqadText}
          style={styles.logoText}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    logo: {
      width: 250,
      height: 250,
      resizeMode: 'contain',
      marginRight: '10%'
    },
    logoText: {
      width: 250,
      resizeMode: 'contain',
    },
  });

export default SplashScreen;
