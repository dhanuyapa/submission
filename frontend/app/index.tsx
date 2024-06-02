import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import fot2 from '../assets/images/fot2.jpg'; 
import fot1 from '../assets/images/fot1.jpg'; 
import fot3 from '../assets/images/fot3.jpg'; 
import Slider from '../components/slider'; 


const Index = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
 <View>
<Slider images={ [fot1, fot2, fot3]} />
      <Text style={styles.heading}>Welcome to the App</Text>
      <Link href="/Login" style={styles.link}>
        <Text style={styles.linkText}>Go to Login</Text>
      </Link>
      <Link href="/SignUp" style={styles.link}>
        <Text style={styles.linkText}>Go to Sign Up</Text>
      </Link></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    paddingTop:80
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  link: {
    marginVertical: 10,
  },
  linkText: {
    fontSize: 18,
    color: 'blue',
  },
});

export default Index;
