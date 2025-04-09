import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../Components/Header';
import { COLORS,FONTS } from '../Constants/Theme';

const TimeSelector: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const times: string[] = [
    '9:00am',
    '10:00am',
    '11:00am',
    '01:00pm',
    '02:00pm',
    '03:00pm',
  ];

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time === selectedTime ? null : time); // Toggle selection
    console.log(`Selected time: ${time}`);
  };

  return (
    <View style={styles.container}>
      <Header title='Select Time' />
      <View style={styles.timeGrid}>
        {times.map((time, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.timeButton,
              selectedTime === time && styles.selectedButton, // Highlight selected button
            ]}
            onPress={() => handleTimeSelect(time)}
          >
            <Text  style={[
              styles.timeText,
              selectedTime === time && styles.selectedText, // Highlight selected button
            ]}>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  timeButton: {
    width: '30%',
    paddingVertical: 15,
    marginVertical: 10,
    backgroundColor: '#e6f0fa',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 1, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedButton: {
    backgroundColor: '#2CBDCB', // Selected button color
  },
  timeText: {
    ...FONTS.fontMd,
    color: '#333',
  },
  selectedText: {
    ...FONTS.fontMd,
    color: '#fff',
  },
});

export default TimeSelector;