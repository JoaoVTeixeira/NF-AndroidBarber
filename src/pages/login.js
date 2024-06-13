import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import usuarioService from '../services/usuarioService';

export default function Index({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {

    if (setIsAuthenticated) {
      setIsAuthenticated(true);
    } else {
      console.error("setIsAuthenticated is not defined");
    }
    console.log('Login with:', email, senha, setIsAuthenticated);

  };

  const handleRegister = () => {
    // Add navigation to register screen here
    console.log('Navigate to Register Screen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.registerText}>Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4FD',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#3F45C6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  registerText: {
    color: '#000',
    marginTop: 15,
    fontSize: 16,
  },
});