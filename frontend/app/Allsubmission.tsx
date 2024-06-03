import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import moment from 'moment-timezone';

const AllSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('http://192.168.8.101:8000/Submission/fetch');
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

  const renderItem = ({ item }) => {
    const { student } = item;
    return (
      <View style={styles.item}>
        <Text style={styles.header}>Index No :{student?.indexNo || 'N/A'}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Student Name:</Text>
          <Text style={styles.value}>{student ? `${student.fname} ${student.lname}` : 'N/A'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Academic Year:</Text>
          <Text style={styles.value}>{student?.accYear || 'N/A'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Registration No:</Text>
          <Text style={styles.value}>{student?.registrationNo || 'N/A'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Index No:</Text>
          <Text style={styles.value}>{student?.indexNo || 'N/A'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{student?.phone || 'N/A'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{student?.email || 'N/A'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Assignment:</Text>
          <Text style={styles.value}>{item.qrCodeData}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Submission Time:</Text>
          <Text style={styles.value}>{item.scanTime}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: "center"
  },
  item: {
    backgroundColor: '#e0d5cc',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    width: '40%',
  },
  value: {
    flex: 1,
  },
});

export default AllSubmissions;
