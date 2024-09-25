// App.js

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen'; // Importa la pantalla de carga
import LoginScreen from './src/screens/LoginScreen'; // Pantalla de inicio de sesión
import AuhOptionScreen from './src/screens/AuhOptionScreen.js'; // Pantalla con opciones de autenticación
import RegisterScreen from './src/screens/RegisterScreen'; // Pantalla de registro
import OptionsScreen from './src/screens/OptionScreen'; //Pantalla de Opciones
import { AuthProvider, useAuth } from './src/context/AuthContext.js'; // En todas las rutas va a poder llamar las rutas
import ProtectedRoute from './src/ProtectedRoute.js';

const Stack = createNativeStackNavigator();

function ProtectedScreen({ component: Component, ...rest }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Component {...rest} /> : <LoginScreen />;
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }} // Oculta el encabezado
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="AuhOptions" component={AuhOptionScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />

          {/* Rutas protegidas */}
          <Stack.Screen name="Options">
            {props => <ProtectedScreen component={OptionsScreen} {...props} />}
          </Stack.Screen>

        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
