import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form'; // Biblioteca para convertir info a formulario.
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'; // Asegúrate de importar Alert
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../context/AuthContext'; // Rutas para conectar con back


// Importa las imágenes que usarás
const lsmIcon = require('../assets/lsm.png');
const googleIcon = require('../assets/google.png'); 
const facebookIcon = require('../assets/facebook.png');

export default function RegisterScreen({ navigation }) { // Se añade `navigation` como prop
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate("Splash"); // Usamos navigation de React Navigation
    }
    register('email', { required: 'Email requerido' });
    register('password', { required: 'Constraseña requerida'});
    register('username', { required: 'Usuario requerido'});

  }, [isAuthenticated],[register]);

  const onSubmit = async (data) => {
    try {
      await signup(data); // Ejecuta la función de registro
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo registrar la cuenta');
    }
  };
  
  return (
     // Manejo de errores
      <View style={styles.container}>
        {/* Manejo de errores de registro */}
        {registerErrors && registerErrors.length > 0 && (
          <View>
            {registerErrors.map((error, index) => {
              return (
                <Text key={index} style={styles.errorText}>
                  {error}
                </Text>
              );
            })}
          </View>
        )}
    
        {/* Flecha de regreso que navega a AuhOptionScreen */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('AuhOptions')}>
          <Icon name="arrow-left" size={25} color="#3579cb" />
        </TouchableOpacity>
    
        {/************  OPCIONES ********************/}
    
        {/* Imagen arriba del texto de registro */}
        <Image source={lsmIcon} style={styles.icon} />
        <Text style={styles.title}>Registro</Text>
    
        {/* Nombre completo */}
        <TextInput 
          onChangeText={(text) => setValue('username', text)}
          placeholder='Nombre completo'
          style={styles.input}
        />
        {/* Detector de errores de formulario */}
        {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}     
    
        {/* Email */}
        <TextInput
          onChangeText={(text) => setValue('email', text)}
          placeholder='Email'
          style={styles.input}
        />
        {/* Detector de errores de formulario */}
        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}   
    
        {/* Contraseña */}
        <TextInput 
          onChangeText={(text) => setValue('password', text)}
          placeholder='Contraseña'
          secureTextEntry
          style={styles.input}
        />
        {/* Detector de errores de formulario */}
        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
    
        {/* Botón de registro */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
    
        {/* Texto corto y botones sociales */}
        <Text style={styles.orText}>O si prefieres</Text>
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton} onPress={() => Alert.alert('Google Button Pressed')}>
            <Image source={googleIcon} style={styles.socialButtonIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={() => Alert.alert('Facebook Button Pressed')}>
            <Image source={facebookIcon} style={styles.socialButtonIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
};

const stylesError = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'red', // Color de borde rojo para los inputs con error
    borderWidth: 1,
    textAlignVertical: 'center', // Centra el texto verticalmente
  },
  errorText: {
    color: 'red',  // Texto rojo para los errores
    fontSize: 14,  // Tamaño de letra del error
    fontWeight: 'bold',  // Negrita para resaltar el mensaje de error
    marginBottom: 8,  // Espacio debajo del mensaje de error
  },
});

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
    marginBottom: 20,
  },
  title: {
    fontSize: 45,
    marginBottom: 20,
    color: '#3579cb',
  },
  input: {
    padding: 10,
    width: '100%',
    height: 50,
    marginBottom: 20,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 70,
    borderBottomLeftRadius: 15,
    backgroundColor: '#f1f1f1',
  },
  button: {
    padding: 10,
    width: '100%',
    height: 50,
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
  orText: {
    marginTop: 20,
    marginBottom: 10,
    color: '#3579cb',
    fontSize: 16,
    textAlign: 'center',
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
