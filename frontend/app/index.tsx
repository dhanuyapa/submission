import { View, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import fot2 from '../assets/images/fot2.jpg'; 
import fot1 from '../assets/images/fot1.jpg'; 
import fot3 from '../assets/images/fot3.jpg'; 
import Slider from '../components/slider'; 
import Home from '../components/Home1'; 

const Index = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Slider images={[fot1, fot2, fot3]} />
        <Home  />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  }
})

export default Index;
