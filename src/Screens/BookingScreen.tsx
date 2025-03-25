import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


type BookingScreenProps = {
    navigation: any;
    route: any;
};

const BookingScreen: React.FC<BookingScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Screen</Text>
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

export default BookingScreen;