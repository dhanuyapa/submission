import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import moment from 'moment-timezone';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned');
  const [loggedIn, setLoggedIn] = useState(true);
  const [userRegistrationNo, setUserRegistrationNo] = useState('q');

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
    setText(data);
    console.log('Type: ' + type + '\nData: ' + data);
  };

  const handleSubmit = async () => {
    if (!loggedIn) {
      Alert.alert('Error', 'User is not logged in');
      return;
    }

    const currentTime = moment().tz('Asia/Colombo').format('YYYY-MM-DD HH:mm:ss');

    try {
      const response = await axios.post(`http://192.168.8.101:8000/Submission/add/${userRegistrationNo}`, {
        qrCodeData: text,
        scanTime: currentTime,
      });
      Alert.alert('Success', 'Submission added successfully');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add submission');
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
          style={{ height: 300, width: 300 }}
        />
      </View>
      <Text style={styles.maintext}>{text}</Text>

      <Text>Current Time in Colombo: {moment().tz('Asia/Colombo').format('YYYY-MM-DD HH:mm:ss')}</Text>

      {scanned && (
        <>
          <Button title={'Scan again?'} onPress={() => setScanned(false)} color="tomato" />
          <Button title="Submit" onPress={handleSubmit} color="blue" />
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
    paddingHorizontal: 20, // Added padding to ensure text is visible
  },

  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: 200,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato',
  },
  text1: {
    color: '#000000', // Black text color
    fontSize: 14, // Font size
    fontWeight: 'normal', // Font weight
    marginTop: 10, // Margin top to add space from other elements
    paddingHorizontal: 20, // Add horizontal padding for better visibility
    textAlign: 'center', // Center the text
  },
});
