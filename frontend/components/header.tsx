import { View, Text, Image } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import logo from '../assets/images/logo.jpg'; 
import { Entypo } from '@expo/vector-icons';
import { Link } from 'expo-router';

const Header = () => {
  return (
    <View style={styles.container}>
      <View >
        <Image source={logo} style={styles.logo} />
      </View>
      <Link href="/Login" style={styles.text}>
      <Text style={styles.text}>Login<Entypo name="login" size={24} color="black" /></Text></Link>
    </View>
  );
}

const styles = {

  container: {
    width: '100%',
    height: 116,
    flexDirection: 'row',
    backgroundColor: '#ffff', // Red background color
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 2,
    paddingHorizontal: 20,
    paddingTop: 20,
    
    
  },
  text: {
    color: '#000000', // Black text color
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  logo: {
    width: 200, // Adjust the width to your desired size
    height: 50, // Adjust the height to your desired size
    resizeMode: 'contain', // Ensure the image maintains its aspect ratio
    paddingTop: 10,
    
  },
};

export default Header;
