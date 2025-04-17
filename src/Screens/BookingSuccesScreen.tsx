import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { COLORS, SIZES } from '../Constants/Theme';
import { resetAndNavigate } from '../utils/NavigationUtil';

const BookingSuccessScreen = () => {
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            resetAndNavigate('Tabs');
        }, 3000);
        return () => clearTimeout(timeoutId);
      }, []); 
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animations/confirm.json')}
        autoPlay
        duration={2000}
        loop={true}
        speed={1}
        style={styles.lottieView}
        enableMergePathsAndroidForKitKatAndAbove={true}
        hardwareAccelerationAndroid
      />
      <Text style={styles.orderPlacedText}>Booking Confirmed</Text>
      <View style={styles.deliveryContainer}>
    
      </View>
      {/* <View style={{paddingVertical:10,paddingHorizontal:20 , backgroundColor:COLORS.primary,borderRadius:999,marginTop:10}}>
      <Text style={styles.addressText}>
         Done
      </Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor:'#fff'
  },
  lottieView: {
    width: SIZES.width * 0.6,
    height: 150,
  },
  orderPlacedText: {
    opacity: 0.4,
  },
  deliveryContainer: {
    borderBottomWidth: 2,
    marginVertical: 10,
    paddingBottom: 4,
    marginBottom: 5,
    width: 100,
    borderColor: COLORS.borderColor,
  },
  deliveryText: {
    marginTop: 15,
    borderColor: COLORS.borderColor,
  },
  addressText: {
    //opacity: 0.8,
    color:COLORS.white
  },
});

export default BookingSuccessScreen;