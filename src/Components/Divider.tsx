import React from 'react';
import { View, StyleSheet } from 'react-native';

const Divider = ({ height = 1.2, marginVertical = 20 }) => {
  return <View style={[styles.divider, { height, marginVertical }]} />;
};

const styles = StyleSheet.create({
  divider: {
    backgroundColor: '#E8E8E8',
    width: '100%',
  },
});

export default Divider;
