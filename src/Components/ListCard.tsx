import React from 'react';
import { ViewStyle, StyleSheet, StyleProp } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SIZES, FONTS } from '../Constants/Theme';

type CustomCardProps = {
  Colors: string[];
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  shadow?: boolean; // New optional shadow prop
};

const CustomCard = ({ Colors, children, style, shadow = true }: CustomCardProps) => {
  return (
    <LinearGradient
      colors={[...Colors]}
      start={{ x: 0.1, y: 0.2 }}
      end={{ x: 0.9, y: 1 }}
      style={[styles.card, shadow && styles.shadow, style]} // Conditionally apply shadow
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardText: {
    ...FONTS.fontSm,
    color: '#8C8C8C',
  },
  CardHeading: {
    ...FONTS.font,
    color: '#292929',
  },
});

export default CustomCard;