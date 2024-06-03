import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert ,TouchableOpacity} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import moment from 'moment-timezone';

export default function BarcodeScan() {
  const route = useRoute();
  const { userRegistrationNo } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedTime, setScannedTime] = useState(null);
  const [text, setText] = useState('Not yet scanned');
  const [loggedIn, setLoggedIn] = useState(true);

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
    } catch (error) {
      console.error('Submission Error:', error);
      if (error.response) {
        // Server responded with a status other than 200 range
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
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato',
  },
  button2: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 30,
    width: '30%',
    alignItems: 'center',
  },
});
