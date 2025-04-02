// LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { COLORS, FONTS } from '../Constants/Theme';
import Input from '../Components/Input';
import { navigate } from '../utils/NavigationUtil';
import Header from '../Components/Header';


const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('info@gmail.com');
  const [password, setPassword] = useState<string>('••••••••••••');

  const handleNavigation = ()=>{
    navigate("ResetPassword")
  }

  return (
    <View style={styles.container}>
      <Header backButton={false}/>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/Logo.png') as ImageSourcePropType}
          style={styles.logo}
        />
      </View>

      {/* Welcome Section */}
      <Text style={styles.welcomeText}>Welcome Back</Text>
      <Text style={styles.subText}>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
      </Text>

      {/* Inputs */}
      <Text style={styles.label}>Email Address</Text>
      <Input
        value={email}
        onChangeText={setEmail}
        placeholder="info@gmail.com"
        iconSource={require('../assets/images/email.png') as ImageSourcePropType}
      />

      <Text style={styles.label}>Password</Text>
      <Input
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••••••"
        secureTextEntry
        iconSource={require('../assets/images/lock.png') as ImageSourcePropType}
      />

      {/* Forgot Password */}
      <TouchableOpacity onPress={handleNavigation}  style={styles.forgetPasswordContainer}>
        <Text style={styles.label}>Forget Password</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    resizeMode: 'contain',
    height: 130,
    width: 197,
  },
  welcomeText: {
    ...FONTS.h1,
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    ...FONTS.fontXs,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  label: {
    ...FONTS.font,
    color: '#000',
    marginBottom: 5,
  },
  forgetPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;