import { StatusBar } from "expo-status-bar";
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image,ScrollView } from 'react-native';
import axios from 'axios';
import { Link, useRouter } from 'expo-router';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);


  const navigateToSignup = () => {
    router.push('/SignUp');
  };
  const handleLogin = async () => {
    try {
      if (email === 'admin@gmail.com' && password === 'Admin') {
        router.push('/Admin');
        return;
      }
      const handleSignup = async () => {
        
          }

      const response = await axios.post('http://192.168.8.101:8000/student/loginStudent', { email, password });

      if (response.status === 200) {
        if (response.data.token) {
          const registrationNo = response.data.registrationNo;
          console.log('Login successful!');
          router.push({
            pathname: '/Barcode',
            params: { userRegistrationNo: registrationNo }
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/images/rajarata.png')} />
     
      

        <StatusBar style="auto" />
        <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        /></View>

<View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          value={password}
          placeholderTextColor="#003f5c"
          onChangeText={setPassword}
          secureTextEntry
        /></View>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.linkText}>Or</Text>
        <Text style={styles.linkText}>Dont have an account?</Text>

        <TouchableOpacity style={styles.button2} onPress={navigateToSignup}>
        <Text style={styles.buttonText2}>Sign Up</Text>
      </TouchableOpacity>
      </View></ScrollView>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 50,
    backgroundColor: '#ffff',
  },



  inputView: {
    backgroundColor: "#e8756f",
    borderRadius: 30,
    width: "80%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
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
    borderRadius: 30,
    width: '30%',
    alignItems: 'center',
  },
  button2: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 30,
    borderColor: 'black', // Corrected property name and added a comma
    borderWidth: 1, // Added this to ensure the border is visible
    width: '30%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonText2: {
    color: 'black',
    fontWeight: 'bold',
    borderRadius: 30,
  },
  link: {
    marginVertical: 10,
  },
  linkText: {
    fontSize: 18,
    color: 'black',
   
  },
  image: {
    marginBottom: 40,
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 5,
    marginTop: 30,
  },
});

export default Login;
