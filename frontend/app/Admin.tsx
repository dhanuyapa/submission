import React from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import Slider from '../components/slider';

import hm5 from '../assets/images/hm5.jpg'; 
import fot3 from '../assets/images/fot1.jpg'; 

const Admin = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Slider images={[fot3]} />
      <View style={styles.box}>
        <Image source={hm5} style={styles.image} />
        <Text style={{ color: 'black', fontWeight: 'bold' }}>ICT 3312</Text>
      </View>
      <View style={styles.box}>
        <Image source={hm5} style={styles.image} />
        <Text style={{ color: 'black', fontWeight: 'bold' }}>ICT 3210</Text>
      </View>
      <View style={styles.box}>
        
          <Image source={hm5} style={styles.image} />
          <Link href="/Allsubmission" style={styles.link}>
          <Text style={styles.linkText}>ICT 3315</Text>
        </Link>
      </View>
      <View style={styles.box}>
        <Image source={hm5} style={styles.image} />
        <Text style={{ color: 'black', fontWeight: 'bold' }}>ICT 3102</Text>
      </View>
      <View style={styles.box}>
        <Image source={hm5} style={styles.image} />
        <Text style={{ color: 'black', fontWeight: 'bold' }}>CML 3301</Text>
      </View>
      <View style={styles.box}>
        <Image source={hm5} style={styles.image} />
        <Text style={{ color: 'black', fontWeight: 'bold' }}>CML 3102</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 5,
    marginTop: 30,
  },
  box: {
    width: '50%',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  link: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    color: 'black',
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default Admin;
