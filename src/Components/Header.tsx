import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
} from 'react-native';
import { goBack } from '../utils/NavigationUtil';
import { FONTS } from '../Constants/Theme';

// Define props interface
interface HeaderProps {
  title?: string;
  backgroundColor?: string;
  textColor?: string;
  backButton?:boolean
}

const Header: React.FC<HeaderProps> = ({
  title,
  backgroundColor = '#ffffff',
  textColor = '#000000',
  backButton = true
}) => {


  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor={backgroundColor} />
      <View style={[styles.headerContainer, { backgroundColor }]}>
        {
            backButton && <TouchableOpacity
            style={styles.backButton}
            onPress={() => goBack()}
          >
           <Image source={require("../assets/images/arrow.png")}/>
          </TouchableOpacity>
        }

        {
            title &&  <Text style={[styles.title, { color: textColor }]}>{title}</Text>
        }
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:10,
    
    height: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    ...FONTS.h3,
    textAlign: 'center',
  },
});

export default Header;