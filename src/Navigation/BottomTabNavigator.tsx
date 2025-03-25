import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import TrackingScreen from '../Screens/TrackingScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import BookingScreen from '../Screens/BookingScreen';



export type TabParamList = {
  Home: undefined,
  Track: undefined,
  Profile:undefined,
  Booking:undefined
};

const Tab = createBottomTabNavigator<TabParamList>();

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Track" component={TrackingScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Booking" component={BookingScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;