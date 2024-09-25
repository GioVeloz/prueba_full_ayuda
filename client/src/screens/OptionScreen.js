import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function OptionsScreen({ navigation }) { // Cambiado el nombre a OptionsScreen
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.topSection} onPress={() => navigation.navigate('LearnLSM')}>
        <Text style={styles.sectionText}>Aprende LSM</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity style={styles.bottomSection} onPress={() => navigation.navigate('FindInterpreter')}>
        <Text style={styles.sectionText}>Busca un Intérprete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 2,
    backgroundColor: '#3579cb',
  },
  sectionText: {
    fontSize: 50,
    color: '#3579cb',
    textAlign: 'center',
  },
});
