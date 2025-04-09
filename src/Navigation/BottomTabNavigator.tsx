import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import TrackingScreen from '../Screens/TrackingScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import BookingScreen from '../Screens/BookingScreen';
import { Image, StyleSheet } from 'react-native';
import { Camera, Home, ChartPie, UserRound, Calendar, Headset } from 'lucide-react-native';
import { COLORS } from '../Constants/Theme';

export type TabParamList = {
  Home: undefined,
  Track: undefined,
  Profile: undefined,
  Booking: undefined,
  Support: undefined
};

const Tab = createBottomTabNavigator<TabParamList>();

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.secondary, // Changes text color when focused
        tabBarInactiveTintColor: 'gray', // Optional: set inactive text color
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return focused ? (
              <Home strokeWidth={2} color={COLORS.secondary} size={size} /> // Active icon
            ) : (
              <Home color={color} strokeWidth={1.6} size={size} /> // Inactive icon
            );
          },
        }}
      />
      <Tab.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return focused ? (
              <Calendar strokeWidth={2} color={COLORS.secondary} size={size} /> // Active icon
            ) : (
              <Calendar strokeWidth={1.6}  color={color} size={size} /> // Inactive icon
            );
          },
        }}
      />
      <Tab.Screen
        name="Track"
        component={TrackingScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return focused ? (
              <ChartPie strokeWidth={2} color={COLORS.secondary} size={size} /> // Active icon
            ) : (
              <ChartPie strokeWidth={1.6} color={color} size={size} /> // Inactive icon
            );
          },
        }}
      />
      <Tab.Screen
        name="Support"
        component={BookingScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return focused ? (
              <Headset strokeWidth={2} color={COLORS.secondary} size={size} /> // Active icon
            ) : (
              <Headset strokeWidth={1.6} color={color} size={size} /> // Inactive icon
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return focused ? (
              <UserRound strokeWidth={2} color={COLORS.secondary} size={size} /> // Active icon
            ) : (
              <UserRound strokeWidth={1.6} color={color} size={size} /> // Inactive icon
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarLabel: {
    fontFamily: 'Lato-Regular', // Use the specific Lato variant you want
    fontSize: 12,
    marginBottom: 2,
  },
});

export default BottomTabNavigator;