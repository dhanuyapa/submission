import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

const SignUpForm = () => {
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
    try {
      const response = await fetch('http://192.168.8.100:8000/student/register', {
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
        Alert.alert('Form submitted successfully!');
      } else {
        Alert.alert('Failed to submit form');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Failed to submit form');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={formData.fname}
        onChangeText={(text) => handleChange('fname', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={formData.lname}
        onChangeText={(text) => handleChange('lname', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Academic Year"
        value={formData.accYear}
        onChangeText={(text) => handleChange('accYear', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Registration Number"
        value={formData.registrationNo}
        onChangeText={(text) => handleChange('registrationNo', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Index Number"
        value={formData.indexNo}
        onChangeText={(text) => handleChange('indexNo', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={formData.phone}
        onChangeText={(text) => handleChange('phone', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => handleChange('password', text)}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(text) => handleChange('confirmPassword', text)}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop :200
  },
  heading: {
    fontSize: 24,
    marginBottom: 20
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  }
});

export default SignUpForm;
