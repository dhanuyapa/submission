import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

export default function BarcodeScan() {
  const route = useRoute();
  const { userRegistrationNo } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned');
  const [loggedIn, setLoggedIn] = useState(true); // This should be managed based on your authentication logic

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

    try {
      const response = await axios.post(`http://192.168.8.100:8000/Submission/add/${userRegistrationNo}`, {
        qrCodeData: text,
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
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>
      <Text style={styles.maintext}>{text}</Text>

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
});
