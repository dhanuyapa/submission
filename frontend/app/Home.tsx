import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Link } from 'expo-router';
import hm1 from '../assets/images/hm1.jpg'; 
import hm2 from '../assets/images/hm2.jpg'; 
import hm3 from '../assets/images/hm3.jpg'; 
import hm4 from '../assets/images/hm4.jpg'; 
import hm5 from '../assets/images/hm5.jpg'; 
import hm6 from '../assets/images/hm6.jpg'; 
import hm7 from '../assets/images/hm7.jpg'; 

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Image source={hm1} style={styles.image} />
        <Text style={{ color: 'black', fontWeight: 'bold' }}>Login</Text>
      </View>
      <View style={styles.box}>
        <Image source={hm7} style={styles.image} />
        <Text style={{ color: 'black', fontWeight: 'bold' }}>Lecture Videos</Text>
      </View>
      <View style={styles.box}>
        <Link href="/Login" style={styles.link}>
          <Image source={hm3} style={styles.image} />
          <Text style={styles.linkText}>Submission</Text>
        </Link>
      </View>
      <View style={styles.box}>
        <Image source={hm4} style={styles.image} />
        <Text style={{ color: 'black', fontWeight: 'bold' }}>Assignment</Text>
      </View>
      <View style={styles.box}>
        <Image source={hm5} style={styles.image} />
        <Text style={{ color: 'black', fontWeight: 'bold' }}>Past papers</Text>
      </View>
      <View style={styles.box}>
        <Image source={hm6} style={styles.image} />
        <Text style={{ color: 'black', fontWeight: 'bold' }}>Kuppi Video</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  }
});

export default Home;
