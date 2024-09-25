import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

// Usa una ruta relativa en lugar de una ruta absoluta
const icon = require('../assets/lsm.png'); // Ajusta la ruta según la estructura de tu proyecto

export default function AuhOptionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.title}>Connect-Sign</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 50, // Tamaño de fuente ajustado a 50
    marginBottom: 70,
    color: '#3579cb',
    textAlign: 'center',
  },
  button: {
    padding: 10,
    width: '100%',
    height: 50,
    marginTop: 10,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 70,
    borderBottomLeftRadius: 15,
    backgroundColor: '#3579cb', // Color azul para los botones
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff', // Letras blancas en los botones
    fontSize: 16,
  },
});
