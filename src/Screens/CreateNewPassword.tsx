
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { COLORS, FONTS } from '../Constants/Theme';
import Input from '../Components/Input';
import Header from '../Components/Header';
import { useResetPasswordMutation } from '../store/apis/publicAuthApi';
import { BallIndicator } from 'react-native-indicators';
import Snackbar from 'react-native-snackbar';
import { resetAndNavigate } from '../utils/NavigationUtil';

type ResetPasswordScreenProps = {
    navigation: any;
    route:any
};


const CreateNewPassword: React.FC<ResetPasswordScreenProps> = ({route}) => {
  const email = route.params.email;
  const reset_token = route.params.reset_token;
  const [password, setPassword] = useState<string>('••••••••••••');
  const [confirmPassword, setconfirmPassword] = useState<string>('••••••••••••');


  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();

  const handleLogin = async () => {
    try {
      const data = {
        email:email,
        reset_token: reset_token,
        new_password: password,
        confirm_password: confirmPassword
      };
      console.log(data,'data')
      const response = await resetPassword(data).unwrap();
      console.log(response,'response'); 
      Snackbar.show({
        text: response.message,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor:COLORS.secondary
      });
      resetAndNavigate("Login")
    } catch (err: any) {
      const errorMessage = err?.data?.message || 'Login failed. Please try again.';
      console.log(err)
      Snackbar.show({
        text: err.message,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor:COLORS.secondary
      });
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
      <Text style={styles.welcomeText}>Create New Password</Text>
      <Text style={styles.subText}>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
      </Text>

      {/* Inputs */}
      <Text style={styles.label}>Password</Text>
      <Input
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••••••"
        secureTextEntry
        iconSource={require('../assets/images/lock.png') as ImageSourcePropType}
      />


      <Text style={styles.label}>Confirm Password</Text>
      <Input
        value={confirmPassword}
        onChangeText={setconfirmPassword}
        placeholder="••••••••••••"
        secureTextEntry
        iconSource={require('../assets/images/lock.png') as ImageSourcePropType}
      />

      {/* Login Button */}
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
      {isLoading ? <BallIndicator size={20} color="#fff" /> : <Text style={styles.loginButtonText}>Reset</Text>}
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

export default CreateNewPassword;