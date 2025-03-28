import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


type TrackingScreenProps = {
    navigation: any;
    route: any;
};

const TrackingScreen: React.FC<TrackingScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tracking Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default TrackingScreen;