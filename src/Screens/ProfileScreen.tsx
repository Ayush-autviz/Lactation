import { Bell, ChevronRight, Clock, Edit, Flag, Globe, LogOut, Mail, Moon, Navigation, Power, Star } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  ImageSourcePropType,
} from 'react-native';
import Header from '../Components/Header';
import CustomCard from '../Components/ListCard';
import { COLORS, FONTS, SIZES } from '../Constants/Theme';
import { navigate, resetAndNavigate } from '../utils/NavigationUtil';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import Snackbar from 'react-native-snackbar';

// Define the shape of the form state
interface FormState {
  darkMode: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState<FormState>({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });

  const handleLogout = () => {
    console.log('Logout pressed');
    dispatch(logout());
    Snackbar.show({
      text: "Logout Successfully",
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor:COLORS.secondary,
      fontFamily:'Lato-Regular'
    });
    resetAndNavigate('Login');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ paddingHorizontal: 20 }}>
        <Header title="Profile" backButton={false} />
      </View>
      <CustomCard Colors={["#F0FEFF", "#D7FBFF"]} shadow={false}>
        <View style={styles.profile}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <View style={styles.profileAvatarWrapper}>
              <Image
                alt=""
                source={{
                  uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                }}
                style={styles.profileAvatar}
              />
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
              >
                <View style={styles.profileAction}>
                  <Edit size={15} color="#fff" />
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <View>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileAddress}>
              123 Maple Street. Anytown, PA 17101
            </Text>
          </View>
        </View>
      </CustomCard>

      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resources</Text>

            <TouchableOpacity
              onPress={() => {
                navigate('BookingsHistoryScreen');
              }}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: '#8e8d91' }]}>
                <Clock size={20} color="#fff" />
              </View>
              <Text style={styles.rowLabel}>Booking History</Text>
              <View style={styles.rowSpacer} />
              <ChevronRight size={22} color="#292929" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
                <Mail size={20} color="#fff" />
              </View>
              <Text style={styles.rowLabel}>Contact Us</Text>
              <View style={styles.rowSpacer} />
              <ChevronRight size={22} color="#292929" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
                <Star size={20} color="#fff" />
              </View>
              <Text style={styles.rowLabel}>Rate in App Store</Text>
              <View style={styles.rowSpacer} />
              <ChevronRight size={22} color="#292929" />
            </TouchableOpacity>
          </View>
        </ScrollView>

        <TouchableOpacity onPress={handleLogout} style={styles.loginButton}>
          <Power size={20} color="red" />
          <Text style={styles.loginButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollView: {
    flexGrow: 1,
  },
  profile: {
    padding: 24,
    width: SIZES.width,
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarWrapper: {
    position: 'relative',
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAction: {
    position: 'absolute',
    right: -4,
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: '#007bff',
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: '600',
    color: '#414d63',
    textAlign: 'center',
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: '#989898',
    textAlign: 'center',
  },
  section: {
    paddingBottom: 20,
  },
  sectionTitle: {
    paddingVertical: 12,
    ...FONTS.h5,
    color: '#292929',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '400',
    color: '#0c0c0c',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  loginButton: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'transparent',
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginBottom: 20, // Add some margin for spacing
  },
  loginButtonText: {
    ...FONTS.fontMd,
    color: 'red',
  },
});

export default ProfileScreen;
















// import React from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import Header from '../Components/Header';
// import CustomCard from '../Components/ListCard';
// import { FONTS } from '../Constants/Theme';
// import { ChevronRight } from 'lucide-react-native';

// interface MenuItem {
//   icon: any;
//   text: string;
// }

// const ProfileScreen: React.FC = () => {
//   const menuItems: MenuItem[] = [
//     { icon: require("../assets/images/EditProfile.png"), text: 'Edit Profile' },
//     { icon: require("../assets/images/BookingHistory.png"), text: 'Booking History' },
//     { icon: require("../assets/images/AppointmentHistory.png"), text: 'Appointment History' },
//     { icon: require("../assets/images/Terms.png"), text: 'Terms & Conditions' },
//   ];

//   const handleLogout = () => {
//     // Add logout logic here
//     console.log('Logout pressed');
//   };

//   return (
//     <View style={styles.container}>
//       {/* Profile Header */}
//       <View style={{paddingHorizontal:20}}>
//       <Header title="Profile" />
//       </View>
//       <CustomCard Colors={["#F0FEFF", "#D7FBFF"]}    shadow={false}>
//       <View style={styles.header}>
//         <Image
//           style={styles.profileImage}
//           source={{ uri: 'https://via.placeholder.com/100' }} // Replace with actual image URL
//         />
//         <Text style={styles.name}>Sarah Johnson</Text>
//         <Text style={styles.id}>ID: LC24891</Text>
//       </View>
//       </CustomCard>


//       {/* Settings Section */}
//       <View style={{paddingHorizontal:20}}>
//       <Text style={styles.settingsTitle}>Settings</Text>
//       {menuItems.map((item, index) => (
//         <TouchableOpacity key={index} style={styles.menuItem}>
//           <View style={styles.iconContainer}>
//             <Image source={item.icon} style={styles.icon} />
//           </View>
//           <Text style={styles.menuText}>{item.text}</Text>
//           <ChevronRight size={22} color="#292929" />
//         </TouchableOpacity>
//       ))}

//       {/* Logout Button */}
//       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     justifyContent:'center',
//     alignItems: 'center',
//     paddingVertical: 20,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 10,
//   },
//   name: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   id: {
//     fontSize: 16,
//     color: '#666',
//   },
//   settingsTitle: {
//     ...FONTS.h5,
//     marginVertical: 20,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius:10,
//     borderColor:'#ddd',
//     padding: 12,
//     borderWidth: 0.6,
//     marginBottom:15
//   },
//   iconContainer: {
//     width: 35,
//     height:35,
//     justifyContent:'center',
//     alignItems:'center',
//     backgroundColor:'#2CBCCA',
//     borderRadius:25,
//     marginRight: 10,
//   },
//   icon: {
//     width: 20, height: 20,
//     resizeMode: 'contain',
//   },
//   menuText: {
//     ...FONTS.fontMd,
//     color: '#292929',
//     flex: 1,
//   },
//   arrow: {
//     fontSize: 20,
//   },
//   logoutButton: {
//     backgroundColor: '#FF4D4D',
//     padding: 15,
//     alignItems: 'center',
//     marginTop: 20,
//     marginHorizontal: 20,
//     borderRadius: 5,
//   },
//   logoutText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default ProfileScreen;