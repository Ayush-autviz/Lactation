
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import Header from '../Components/Header';
import { COLORS, FONTS, SIZES } from '../Constants/Theme';
// For icons (you can use any icon library)

// Define the props for the component (if needed)
interface VerificationScreenProps {}

// Main Verification Screen Component
const OtpScreen: React.FC<VerificationScreenProps> = () => {
  const [code, setCode] = useState<string[]>(['', '', '', '']); // State to store the 4-digit code

  // Handle number press
  const handleNumberPress = (number: string) => {
    const newCode = [...code];
    const firstEmptyIndex = newCode.findIndex((digit) => digit === '');
    if (firstEmptyIndex !== -1) {
      newCode[firstEmptyIndex] = number;
      setCode(newCode);
    }
  };

  // Handle backspace press
  const handleBackspacePress = () => {
    const newCode = [...code];
    const lastFilledIndex = newCode
      .slice()
      .reverse()
      .findIndex((digit) => digit !== '');
    if (lastFilledIndex !== -1) {
      const indexToClear = 3 - lastFilledIndex;
      newCode[indexToClear] = '';
      setCode(newCode);
    }
  };

  // Handle verify button press
  const handleVerifyPress = () => {
    const enteredCode = code.join('');
    if (enteredCode.length === 4) {
      console.log('Verifying code:', enteredCode);
      // Add your verification logic here
    } else {
      console.log('Please enter a 4-digit code');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Back Arrow */}
      <Header />

      {/* Verification Icon */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/otp.png')}
          style={styles.logo}
        />
      </View>

      {/* Welcome Section */}
      <Text style={styles.welcomeText}>Verification</Text>
      <Text style={styles.subText}>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
      </Text>

      {/* Code Input Boxes */}
      <View style={{justifyContent:"center",alignItems:'center',paddingHorizontal:20}}>
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <View key={index} style={styles.codeBox}>
            <Text style={styles.codeText}>{digit}</Text>
          </View>
        ))}
      </View>
      </View>

      {/* Custom Number Pad */}
      <View style={{backgroundColor:'#F6F6F6',borderTopLeftRadius:20,borderTopRightRadius:20,marginTop:20,width:SIZES.width,alignSelf:'center',paddingHorizontal:20}}>
      <View style={styles.numberPad}>
        

        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((number) => (
          <TouchableOpacity
            key={number}
            style={styles.numberButton}
            onPress={() => handleNumberPress(number)}
          >
            <Text style={styles.numberText}>{number}</Text>
          </TouchableOpacity>
        ))}
        {/* Backspace Button */}
        <TouchableOpacity
          style={styles.numberButton}
        >
          {/* <Ionicons name="backspace-outline" size={24} color="#000" /> */}
        </TouchableOpacity>

        <TouchableOpacity
        
            style={styles.numberButton}
            onPress={() => handleNumberPress("0")}
          >
            <Text style={styles.numberText}>0</Text>
          </TouchableOpacity>

        <TouchableOpacity
          style={styles.numberButton}
          onPress={handleBackspacePress}
        >
          {/* <Ionicons name="backspace-outline" size={24} color="#000" /> */}
          <Image source={require("../assets/images/Otpcross.png")}/>
        </TouchableOpacity>
      </View>

      {/* Verify Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Send</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    //paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  iconContainer: {
    marginTop: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
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
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    marginHorizontal: 20,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  codeBox: {
    width: "22%",
    height: 65,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  codeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  numberPad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    marginTop:10
  },
  numberButton: {
    width: "33%",
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',

  },
  numberText: {
    ...FONTS.h1
  },
  verifyButton: {
    backgroundColor: '#C71585',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 40,
    width: '80%',
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
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

export default OtpScreen;