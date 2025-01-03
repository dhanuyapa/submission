import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link, Slot } from 'expo-router';
import { Drawer } from 'react-native-drawer-layout';
import { Feather, MaterialIcons, Ionicons, SimpleLineIcons, } from '@expo/vector-icons';
import Header from '../components/header';
import Login from '../components/Login';
import Home1 from '../components/Home1';


const RootLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const renderDrawerContent = () => (
    <View style={[styles.drawerContent, styles.topGap]}>
      <Link href="/Login">
        <View style={styles.navItem}>
          <Text style={styles.navText}>Manage Connections</Text>
        </View>
      </Link>
  
      <Link href="/Allsubmission">
        <View style={styles.navItem}>
          <Text style={styles.navText}>Manage Connections</Text>
        </View>
      </Link>
  
      <Link href="/category">
        <View style={styles.navItem}>
          <Text style={styles.navText}>Manage Connections</Text>
        </View>
      </Link>
  
      <Link href="/category">
        <View style={styles.navItem}>
          <Text style={styles.navText}>Manage Connections</Text>
        </View>
      </Link>
  
      <Link href="/Allsubmission">
        <View style={styles.navItem}>
          <Text style={styles.navText}>Manage Connections</Text>
        </View>
      </Link>
    </View>
  );

  return (
    <Drawer
      open={drawerOpen}
      onOpen={() => setDrawerOpen(true)}
      onClose={() => setDrawerOpen(false)}
      renderDrawerContent={renderDrawerContent}
      drawerType="slide"
      drawerStyle={styles.drawer}
    >
      <View style={styles.container}>
      <Header />
       
        {/* Removed the button for opening the drawer */}
        <View style={styles.content}>
          <Slot />
        </View>
        <View style={styles.navbar}>
          <Link href="/Home1">
            <View style={styles.navItem}>
              <Feather name="home" size={24} color="black" />
              <Text style={styles.navText}>Home</Text>
            </View>
          </Link>

          <Link href="/category">
            <View style={styles.navItem}>
              <MaterialIcons name="support-agent" size={24} color="black" />
              <Text style={styles.navText}>Support</Text>
            </View>
          </Link>

          <Link href="/product">
            <View style={styles.navItem}>
            <MaterialIcons name="library-books" size={24} color="black" />
              <Text style={styles.navText}>My Course</Text>
            </View>
          </Link>

          <Link href="/notification">
            <View style={styles.navItem}>
              <Ionicons name="notifications-outline" size={24} color="black" />
              <Text style={styles.navText}>Notifications</Text>
            </View>
          </Link>

          {/* Use TouchableWithoutFeedback for a custom onPress behavior */}
          <Link
            href="#" // '#' to prevent navigation as it's just toggling the drawer
            onPress={() => setDrawerOpen(!drawerOpen)} // Toggle the drawer
          >
            <View style={styles.navItem}>
              <SimpleLineIcons name="menu" size={24} color="black" />
              <Text style={styles.navText}>Menu</Text>
            </View>
          </Link>
        </View>
      </View>
    </Drawer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingBottom: 20,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#faf7fa',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: 'black',
    marginTop: 2,
  },
  drawer: {
    backgroundColor: '#fff',
    width: 250,
  },
  topGap: {
    marginTop: 50, // adjust the value as needed
  },
  drawerContent: {
    flex: 1,
    
   
    paddingHorizontal: 20,
  },
});

export default RootLayout;
