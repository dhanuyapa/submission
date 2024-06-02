import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import moment from 'moment-timezone';

const AllSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('http://192.168.8.100:8000/Submission/fetch');
        const submissionsWithColomboTime = response.data.submissions.map(submission => {
          return {
            ...submission,
            scanTime: moment(submission.scanTime).tz('Asia/Colombo').format('YYYY-MM-DD HH:mm:ss')
          };
        });
        setSubmissions(submissionsWithColomboTime);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>Student Name: {item.student.fname} {item.student.lname}</Text>
      <Text style={styles.subtitle}>Academic Year: {item.student.accYear}</Text>
      <Text style={styles.subtitle}>Registration No: {item.student.registrationNo}</Text>
      <Text style={styles.subtitle}>Index No: {item.student.indexNo}</Text>
      <Text style={styles.subtitle}>Phone: {item.student.phone}</Text>
      <Text style={styles.subtitle}>Email: {item.student.email}</Text>
      <Text style={styles.subtitle}>QR Code Data: {item.qrCodeData}</Text>
      <Text style={styles.subtitle}>Scan Time: {item.scanTime}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Submissions</Text>
      <FlatList
        data={submissions}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default AllSubmissions;
