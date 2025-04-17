// LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { COLORS, FONTS } from '../Constants/Theme';
import Input from '../Components/Input';
import Header from '../Components/Header';
import { navigate } from '../utils/NavigationUtil';
import { useForgotPasswordMutation } from '../store/apis/publicAuthApi';
import { useDispatch } from 'react-redux';
import { BallIndicator } from 'react-native-indicators';
import Snackbar from 'react-native-snackbar';

type ResetPasswordScreenProps = {
    navigation: any;
};


const ResetPassword: React.FC<ResetPasswordScreenProps> = () => {
  const [email, setEmail] = useState<string>('email@gmail.com');
  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation();

  const handleResetPassword = async () => {
    try {
      const data = {
        email: email,
      };
      const response = await forgotPassword(data).unwrap();
      Snackbar.show({
        text: response.message,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor:COLORS.secondary
      });
      navigate("OtpScreen",{email:email})
    } catch (err: any) {
      const errorMessage = err?.data?.message || 'Login failed. Please try again.';
      Snackbar.show({
        text: err.message,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor:COLORS.secondary
      });
      console.log(err)
    }
  };

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
      <TouchableOpacity onPress={handleResetPassword} style={styles.loginButton}>
        {isLoading ? <BallIndicator size={20} color="#fff" /> : <Text style={styles.loginButtonText}>Continue</Text>}
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
    height:50
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResetPassword;