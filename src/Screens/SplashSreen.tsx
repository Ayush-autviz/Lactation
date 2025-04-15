import { View, Image, StatusBar, Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../Constants/Theme';
import { BallIndicator } from 'react-native-indicators';
import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { resetAndNavigate } from '../utils/NavigationUtil';

type SplashScreenProps = {
  navigation: any;
};

const { width, height } = Dimensions.get('screen');

const Splash: React.FC<SplashScreenProps> = ({ navigation }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleNavigation = useCallback(() => {
    resetAndNavigate(!isAuthenticated ? 'Tabs' : 'Login');
  }, [isAuthenticated, navigation]);

  useEffect(() => {
    const timer = setTimeout(handleNavigation, 2000);
    return () => clearTimeout(timer);
  }, [handleNavigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent />
      <Image
        source={require('../assets/images/splash1.png')}
        style={styles.topImage}
      />
      <Image
        source={require('../assets/images/splash2.png')}
        style={styles.bottomImage}
      />
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/Logo.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.indicatorContainer}>
        <BallIndicator size={30} color={COLORS.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  topImage: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bottomImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    resizeMode: 'contain',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 120,
    width,
    alignItems: 'center',
  },
});

export default Splash;