import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import Splash from '../Screens/SplashSreen';
import LoginScreen from '../Screens/LoginScreen';
import ResetPassword from '../Screens/ResetPassword';
import CreateNewPassword from '../Screens/CreateNewPassword';
import OtpScreen from '../Screens/OtpScreen';
import NotificationScreen from '../Screens/NotificationScreen';
import TimeSelector from '../Screens/SlotScreens';



export type StackParamList = {
  Tabs: undefined;
  Details: undefined;
  Splash:undefined;
  Login:undefined;
  ResetPassword:undefined;
  CreateNewPassword:undefined;
  OtpScreen:undefined;
  Notification:undefined;
  SlotScreen:undefined;
};

const Stack = createStackNavigator<StackParamList>();

const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
    <Stack.Screen
     name='Splash' 
     component={Splash}
     options={{ headerShown: false
    }}
     />
      <Stack.Screen 
        name="Tabs" 
        component={BottomTabNavigator}
        options={{ headerShown: false,
          animation:"fade"
        }}
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ResetPassword" 
        component={ResetPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Notification" 
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="CreateNewPassword" 
        component={CreateNewPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="OtpScreen" 
        component={OtpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="SlotScreen" 
        component={TimeSelector}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;