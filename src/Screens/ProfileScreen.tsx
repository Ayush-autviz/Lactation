import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../Components/Header';
import CustomCard from '../Components/ListCard';
import { FONTS } from '../Constants/Theme';
import { ChevronRight } from 'lucide-react-native';

interface MenuItem {
  icon: any;
  text: string;
}

const ProfileScreen: React.FC = () => {
  const menuItems: MenuItem[] = [
    { icon: require("../assets/images/EditProfile.png"), text: 'Edit Profile' },
    { icon: require("../assets/images/BookingHistory.png"), text: 'Booking History' },
    { icon: require("../assets/images/AppointmentHistory.png"), text: 'Appointment History' },
    { icon: require("../assets/images/Terms.png"), text: 'Terms & Conditions' },
  ];

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logout pressed');
  };

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={{paddingHorizontal:20}}>
      <Header title="Profile" />
      </View>
      <CustomCard Colors={["#F0FEFF", "#D7FBFF"]}    shadow={false}>
      <View style={styles.header}>
        <Image
          style={styles.profileImage}
          source={{ uri: 'https://via.placeholder.com/100' }} // Replace with actual image URL
        />
        <Text style={styles.name}>Sarah Johnson</Text>
        <Text style={styles.id}>ID: LC24891</Text>
      </View>
      </CustomCard>


      {/* Settings Section */}
      <View style={{paddingHorizontal:20}}>
      <Text style={styles.settingsTitle}>Settings</Text>
      {menuItems.map((item, index) => (
        <TouchableOpacity key={index} style={styles.menuItem}>
          <View style={styles.iconContainer}>
            <Image source={item.icon} style={styles.icon} />
          </View>
          <Text style={styles.menuText}>{item.text}</Text>
          <ChevronRight size={22} color="#292929" />
        </TouchableOpacity>
      ))}

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    justifyContent:'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  id: {
    fontSize: 16,
    color: '#666',
  },
  settingsTitle: {
    ...FONTS.h5,
    marginVertical: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius:10,
    borderColor:'#ddd',
    padding: 12,
    borderWidth: 0.6,
    marginBottom:15
  },
  iconContainer: {
    width: 35,
    height:35,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#2CBCCA',
    borderRadius:25,
    marginRight: 10,
  },
  icon: {
    width: 20, height: 20,
    resizeMode: 'contain',
  },
  menuText: {
    ...FONTS.fontMd,
    color: '#292929',
    flex: 1,
  },
  arrow: {
    fontSize: 20,
  },
  logoutButton: {
    backgroundColor: '#FF4D4D',
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;