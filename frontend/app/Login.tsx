import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.8.100:8000/student/loginStudent', { email, password });

      if (response.status === 200) {
        if (response.data.token) {
          const registrationNo = response.data.registrationNo; // Get registration number from response
          console.log('Login successful!');
          router.push({
            pathname: '/Barcode', 
            params: { userRegistrationNo: registrationNo } // Pass registration number as param
          });
          Alert.alert('Login Successful', 'You have successfully logged in.');
        } else {
          setError('Invalid email or password');
        }
      } else {
        setError('Server error. Please try again later.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 300,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Login;