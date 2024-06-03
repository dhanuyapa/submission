import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import moment from 'moment-timezone';

export default function BarcodeScan() {
  const route = useRoute();
  const { userRegistrationNo } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedTime, setScannedTime] = useState(null);
  const [text, setText] = useState('Not yet scanned');
  const [loggedIn, setLoggedIn] = useState(true);
  const navigation = useNavigation();

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedTime(moment().tz('Asia/Colombo'));
    setText(data);
    console.log('Type: ' + type + '\nData: ' + data);
  };

  const handleSubmit = async () => {
    if (!loggedIn) {
      Alert.alert('Error', 'User is not logged in');
      return;
    }

    try {
      const response = await axios.post(`http://192.168.8.101:8000/Submission/add/${userRegistrationNo}`, {
        qrCodeData: text,
        scannedTime: scannedTime.format('YYYY-MM-DD HH:mm:ss'),
      });
      Alert.alert('Success', 'Submission added successfully');
      navigation.navigate('Home1');
    } catch (error) {
      console.error('Submission Error:', error);
      if (error.response) {
        // Handle different error scenarios
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        Alert.alert('Error', `Failed to add submission: ${error.response.data.message || 'Server error'}`);
      } else if (error.request) {
        // Request was made but no response was received
        console.error('Request data:', error.request);
        Alert.alert('Error', 'Failed to add submission: No response from server');
      } else {
        // Something else happened in setting up the request
        console.error('Error message:', error.message);
        Alert.alert('Error', `Failed to add submission: ${error.message}`);
      }
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Scan the QR code to verify your assignment submission</Text>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>
      <Text style={styles.maintext}>{text}</Text>
      {scanned && (
        <>
          <Text style={styles.maintext}>
            Scan Time (Colombo Time Zone): {scannedTime ? scannedTime.format('YYYY-MM-DD HH:mm:ss') : 'Not available'}
          </Text>
          <Button title={'Scan again?'} onPress={() => setScanned(false)} color="tomato" />

          <TouchableOpacity style={styles.button2} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  maintext: {
    fontSize: 16,
    margin: 30,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato',
    margin: 20,
  },
  button2: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 30,
    width: '30%',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  text1: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
});