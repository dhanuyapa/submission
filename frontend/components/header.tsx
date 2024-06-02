import { View, Text } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> <View style={styles.iconContainer}>
 
</View>
</Text>
    </View>
  );
}

const styles = {
  iconContainer: {
    backgroundColor: 'green',
    borderRadius: 50, // Use a large value for borderRadius to achieve rounded corners
    padding: 2, // Add padding to ensure some space around the icon
  },
  container: {
    width: '100%',
    height: 90,
    flexDirection: 'row',
    backgroundColor: '#fafafa', // Red background color
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 8,
    paddingHorizontal: 20,
  },
  text: {
    color: '#000000', // Black text color
    fontSize: 15,
    fontWeight: 'bold',
  },
};

export default Header;

