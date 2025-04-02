// LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { COLORS, FONTS } from '../Constants/Theme';
import Input from '../Components/Input';
import Header from '../Components/Header';
import { navigate } from '../utils/NavigationUtil';

type ResetPasswordScreenProps = {
    navigation: any;
};


const ResetPassword: React.FC<ResetPasswordScreenProps> = () => {

  const [email, setEmail] = useState<string>('info@gmail.com');
  const [password, setPassword] = useState<string>('••••••••••••');

  const handleNavigation = ()=>{
    navigate("OtpScreen")
  }

  return (
    <View style={styles.container}>
    <Header />
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/ResetPassword.png') as ImageSourcePropType}
          style={styles.logo}
        />
      </View>

      {/* Welcome Section */}
      <Text style={styles.welcomeText}>Reset Password</Text>
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

      {/* Login Button */}
      <TouchableOpacity onPress={handleNavigation} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
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

export default ResetPassword;