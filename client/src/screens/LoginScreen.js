import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useForm } from 'react-hook-form'; // Biblioteca para convertir info a formulario.
import { useAuth } from '../context/AuthContext'; // Rutas para conectar con back

const icon = require('../assets/lsm.png');
const googleIcon = require('../assets/google.png');
const facebookIcon = require('../assets/facebook.png');

export default function LoginScreen({ navigation }) { // Se añade `navigation` como prop
  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { signin, isAuthenticated, errors: signInErrors } = useAuth();

  // Funcion validar campos llenos.
  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Options'); // Usamos navigation de React Navigation
    }
    register('email', { required: 'Email requerido' });
    register('password', { required: 'Password requerido'});
  }, [isAuthenticated], [register]);

  // Funcion para enviar informacion en formato formulario.
  const onSubmit = async (data) => {
    try {
      await signin(data); // Ejecuta la función de registro
      Alert.alert('Inicio correcto', 'Sesion iniciada');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo registrar la cuenta');
    }
  };

  return (

    <View style={styles.container}>
    
    {/* Manejo de errores de inicio de sesión */}
  {signInErrors?.length > 0 && (
    <View>
      {signInErrors.map((error, index) => (
        <Text key={index} style={styles.errorText}>
          {error}
        </Text>
      ))}
      </View>
      )
    }

      {/* Modificado para usar navigation.goBack() */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={25} color="#3579cb" />
      </TouchableOpacity>

      <Image source={icon} style={styles.icon} />
      <Text style={styles.nombreConnect}>Connect-Sign</Text>
      <Text style={styles.inicia}>Inicia sesión en tu cuenta</Text>
      <TextInput 
        onChangeText={(text) => setValue('email', text)}   
        placeholder='Example@email.com'
        style={styles.input}
      />
      {/* Detector de errores de formulario */}
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}     

      <View style={styles.passwordContainer}>
        <TextInput 
          onChangeText={(text) => setValue('password', text)}
          placeholder='Password'
          style={styles.inputPassword}
          secureTextEntry={!passwordVisible}
        />

      <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeButton}>
        <Icon name={passwordVisible ? 'eye' : 'eye-slash'} size={20} color="gray" />
      </TouchableOpacity>
      </View>
      
      {/* Detector de errores de formulario */}
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      <TouchableOpacity onPress={() => Alert.alert('Recuperar Contraseña')}>
        <Text style={styles.forgotpass}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Ingresa</Text>
      </TouchableOpacity>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton} onPress={() => Alert.alert('Google Button Pressed')}>
          <Image source={googleIcon} style={styles.socialButtonIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={() => Alert.alert('Facebook Button Pressed')}>
          <Image source={facebookIcon} style={styles.socialButtonIcon} />
        </TouchableOpacity>
      </View>
      
      <StatusBar style="auto" />
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  icon: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  nombreConnect: {
    fontSize: 50,
    color: '#3579cb',
    textAlign: 'center',
  },
  inicia: {
    fontSize: 15,
    color: '#3579cb',
    textAlign: 'center',
  },
  input: {
    padding: 10,
    paddingStart: 30,
    width: '100%',
    height: 50,
    marginTop: 35,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 70,
    borderBottomLeftRadius: 15,
    backgroundColor: '#f1f1f1',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    marginTop: 35,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 70,
    borderBottomLeftRadius: 15,
    backgroundColor: '#f1f1f1',
  },
  inputPassword: {
    flex: 1,
    padding: 10,
    paddingStart: 30,
  },
  eyeButton: {
    padding: 10,
    paddingEnd: 20,
  },
  forgotpass: {
    marginTop: 10,
    textAlign: 'center',
    color: '#3579cb',
    textDecorationLine: 'underline',
  },
  button: {
    padding: 10,
    paddingStart: 10,
    width: '100%',
    height: 50,
    marginTop: 35,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 70,
    borderBottomLeftRadius: 15,
    backgroundColor: '#3579cb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 20,
  },
  socialButton: {
    padding: 10,
    width: '45%',
    height: 50,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 70,
    borderBottomLeftRadius: 15,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialButtonIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
