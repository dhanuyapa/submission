import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

const SignUpForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    accYear: '',
    registrationNo: '',
    indexNo: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    // Perform validation
    if (!formData.email || !formData.password || formData.password !== formData.confirmPassword) {
      Alert.alert('Validation Error', 'Please make sure all fields are filled correctly.');
      return;
    }

    try {
      const response = await fetch('http://192.168.8.101:8000/student/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Reset form fields after successful submission
        setFormData({
          fname: '',
          lname: '',
          accYear: '',
          registrationNo: '',
          indexNo: '',
          phone: '',
          email: '',
          password: '',
          confirmPassword: ''
        });

        // Show success message or navigate to another screen
        Alert.alert('Success', 'Form submitted successfully!', [
          { text: 'OK', onPress: () => router.push('/Login') }
        ]);
      } else {
        Alert.alert('Failed to submit form');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Failed to submit form');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Image style={styles.image} source={require('../assets/images/rajarata.png')} />
          <Text style={styles.heading}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#003f5c"
            value={formData.fname}
            onChangeText={(text) => handleChange('fname', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#003f5c"
            value={formData.lname}
            onChangeText={(text) => handleChange('lname', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Academic Year"
            placeholderTextColor="#003f5c"
            value={formData.accYear}
            onChangeText={(text) => handleChange('accYear', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Registration Number  Ex:ITT2020119"
            placeholderTextColor="#003f5c"
            value={formData.registrationNo}
            onChangeText={(text) => handleChange('registrationNo', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Index Number"
            placeholderTextColor="#003f5c"
            value={formData.indexNo}
            onChangeText={(text) => handleChange('indexNo', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            placeholderTextColor="#003f5c"
            value={formData.phone}
            onChangeText={(text) => handleChange('phone', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            value={formData.password}
            onChangeText={(text) => handleChange('password', text)}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#003f5c"
            value={formData.confirmPassword}
            onChangeText={(text) => handleChange('confirmPassword', text)}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 3,
    backgroundColor: '#ffff'
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 35,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#fff'
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  image: {
    marginBottom: 20,
    width: 80,
    height: 80,
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

export default SignUpForm;
