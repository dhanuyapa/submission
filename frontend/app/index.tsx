import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const Index = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Welcome to the App</Text>
      <Link href="/Login" style={styles.link}>
        <Text style={styles.linkText}>Go to Login</Text>
      </Link>
      <Link href="/SignUp" style={styles.link}>
        <Text style={styles.linkText}>Go to Sign Up</Text>
      </Link>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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
