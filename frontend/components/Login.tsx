import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router'; // Import useRouter from expo-router

const Login = () => {
  const router = useRouter(); // Get router object
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.8.101:8000/student/loginStudent', { email, password });

      if (response.status === 200) {
        if (response.data.token) {
          console.log('Login successful!');
          router.push('/barcode'); // Navigate to the Barcode screen
          Alert.alert('Login Successful', 'You have successfully logged in.');
        } else {
          setError('Invalid email or password'); // Set error message
        }
      } else {
        setError('Server error. Please try again later.'); // Set error message
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.'); // Set error message
    }
  };

  // Custom button style
  const buttonStyle = {
    backgroundColor: 'blue', // Set the background color to blue
    padding: 10, // Add some padding to the button
    borderRadius: 5, // Apply border radius to give it rounded corners
    width: '80%', // Set width to match TextInput
    alignItems: 'center', // Center content horizontally
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
      {/* Custom TouchableOpacity button */}
      <TouchableOpacity style={buttonStyle} onPress={handleLogin}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Login</Text>
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
});

export default Login;
