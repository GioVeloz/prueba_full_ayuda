// screens/SplashScreen.js
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';

const logo = require('../assets/lsm.png'); // Ajusta la ruta según tu estructura

export default function SplashScreen({ navigation }) {
  const opacity = new Animated.Value(1);

  useEffect(() => {
    // Animación de desvanecimiento
    Animated.timing(opacity, {
      toValue: 0,
      duration: 3000, // Duración en milisegundos
      useNativeDriver: true,
    }).start(() => {
      // Navegar a la pantalla principal después de la animación
      navigation.replace('AuhOptions');
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.innerContainer, opacity }}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Connect-Sign</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 50,
    color: '#3579cb',
    marginTop: 20,
  },
});
