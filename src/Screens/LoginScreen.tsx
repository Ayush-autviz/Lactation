// LoginScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { COLORS, FONTS } from '../Constants/Theme';
import Input from '../Components/Input';
import { navigate } from '../utils/NavigationUtil';
import Header from '../Components/Header';
import { useGetDomainMutation, useLoginMutation } from '../store/apis/publicAuthApi';
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess, updateDomain } from '../store/slices/authSlice';
import { BallIndicator } from 'react-native-indicators';
import Snackbar from 'react-native-snackbar';


const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [login, { isLoading, error }] = useLoginMutation();
  const [getdomain, { isLoading:getDomainLoading, error:getDomainError }] = useGetDomainMutation();
  const dispatch = useDispatch();

  console.log(password,'password')

  const handleNavigation = ()=>{
    navigate("ResetPassword")
  }



  const handleLogin = async () => {

    try {
      const credentials = {
        email: email,
        password: password
      };

      const domain = await getdomain({email:email}).unwrap()
      dispatch(updateDomain(domain.data.domain));

      console.log(domain,'dpomainn logi screem')
      
      const response = await login(credentials).unwrap();
     

      console.log(response,'response');
      
      // Assuming the response matches your provided structure
      const authData = {
        user: response.data.user,
        accessToken: response.data.access,
        refreshToken: response.data.refresh
      };

      console.log(authData,'authData')
      Snackbar.show({
        text: response.message,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor:COLORS.secondary,
        fontFamily:'Lato-Regular'
      });
      //dispatch(updateDomain(response.data.user.domain));
      dispatch(loginSuccess(authData));

      navigate('Tabs'); // Adjust to your main screen route
      
    } catch (err: any) {
      const errorMessage = err?.data?.message || 'Login failed. Please try again.';
      console.log(err)

      Snackbar.show({
        text: err.message,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor:COLORS.secondary
      });
      dispatch(loginFailure(errorMessage));
    }
  };

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
        placeholder="email@gmail.com"
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
      <TouchableOpacity onPress={handleLogin} style={[styles.loginButton]} disabled={isLoading}>
        {isLoading ? <BallIndicator size={20} color="#fff" /> : <Text style={styles.loginButtonText}>Login</Text>}
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
    height:50
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    
  },
});

export default LoginScreen;