import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Header from '../Components/Header';
import { COLORS, FONTS } from '../Constants/Theme';
import { useRoute } from '@react-navigation/native';
import { useBookRoomMutation, useGetRoomSlotsQuery } from '../store/apis/internalApi';
import LinearGradient from 'react-native-linear-gradient';
import { Calendar } from 'react-native-calendars';
import { navigate } from '../utils/NavigationUtil';
import { BallIndicator } from 'react-native-indicators';
import Snackbar from 'react-native-snackbar'; // Import Snackbar

// Utility function to format military time (e.g., "13:00") to 12-hour format (e.g., "1:00pm")
const formatTime = (militaryTime: string): string => {
  const [hours, minutes] = militaryTime.split(':').map(Number);
  const period = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes.toString().padStart(2, '0')}${period}`;
};

// Utility function to format date to YYYY-MM-DD
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const TimeSelector: React.FC = () => {
  const route = useRoute();
  const { roomId } = route.params as { roomId: string };
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(formatDate(new Date()));

  // Fetch room slots for the given roomId and selected date
  const { data, isLoading, isError } = useGetRoomSlotsQuery(
    {
      roomId,
      date: selectedDate,
    },
    { refetchOnMountOrArgChange: true }
  );

  const [bookingRoom, { isLoading: isBookingLoading, error: bookingError }] = useBookRoomMutation();

  // Extract available slots from the API response
  const slots = data?.data?.slots?.filter((slot: any) => slot.is_available && !slot.is_past) || [];
  const times: string[] = slots.map((slot: any) => formatTime(slot.start_time));

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time === selectedTime ? null : time);
    console.log(`Selected time: ${time}`);
  };

  // Handle date selection from the calendar
  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setSelectedTime(null); // Reset selected time when date changes
    console.log(`Selected date: ${day.dateString}`);
  };

  // Handle booking
  const handleBooking = async () => {
    if (!selectedTime) {
      Snackbar.show({
        text: 'Please select a time slot.',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: COLORS.secondary,
        fontFamily: 'Lato-Regular',
      });
      return;
    }

    // Find the slot ID corresponding to the selected time
    const selectedSlot = slots.find(
      (slot: any) => formatTime(slot.start_time) === selectedTime
    );

    console.log(selectedSlot, 'selectedSlot');

    if (!selectedSlot) {
      Snackbar.show({
        text: 'Selected slot is not available.',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: COLORS.secondary,
        fontFamily: 'Lato-Regular',
      });
      return;
    }

    try {
      const response = await bookingRoom({
        lactation_room_slot_id: selectedSlot.id,
        booking_date: selectedDate,
      }).unwrap();

      // if (response.status === 'success') {
      // if (response.status === 'success') {
         navigate('BookingSuccesScreen');

        Snackbar.show({
          text: response.message,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: COLORS.secondary,
          fontFamily: 'Lato-Regular',
        });
      // } else {
      //   Snackbar.show({
      //     text: response.message || 'Unable to book the room.',
      //     duration: Snackbar.LENGTH_SHORT,
      //     backgroundColor: COLORS.secondary,
      //     fontFamily: 'Lato-Regular',
      //   });
      // }
    } catch (error: any) {
      console.error('Booking error:', error);
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: COLORS.secondary,
        fontFamily: 'Lato-Regular',
      });
    }
  };

  const buttonText = selectedTime ? `Book for ${selectedTime}` : 'Select Your Slot';

  return (
    <View style={styles.container}>
      <Header title="Select Time" />
      <LinearGradient
        colors={['#F0FEFF', '#D7FBFF']}
        style={styles.calendarContainer}
      >
        <Calendar
          current={selectedDate}
          onDayPress={handleDayPress}
          monthFormat={'MMMM'}
          hideArrows={false}
          renderArrow={(direction) =>
            direction === 'left' ? (
              <View
                style={{
                  backgroundColor: '#2CBCCA',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 6,
                  paddingVertical: 5,
                  borderRadius: 999,
                }}
              >
                <Image source={require('../assets/images/arrowLeft.png')} />
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: '#2CBCCA',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 6,
                  paddingVertical: 5,
                  borderRadius: 999,
                }}
              >
                <Image source={require('../assets/images/arrowRight.png')} />
              </View>
            )
          }
          disableAllTouchEventsForDisabledDays={true}
          markedDates={{
            [selectedDate]: { selected: true, marked: true, selectedColor: '#2CBCCA' },
          }}
          theme={{
            backgroundColor: 'transparent',
            calendarBackground: 'transparent',
            textSectionTitleColor: '#696969',
            selectedDayBackgroundColor: '#2CBCCA',
            selectedDayTextColor: '#FFFFFF',
            todayTextColor: '#00BCD4',
            dayTextColor: '#696969',
            textDisabledColor: '#696969',
            dotColor: '#00BCD4',
            selectedDotColor: '#ffffff',
            monthTextColor: '#696969',
            textDayFontFamily: 'JosefinSans-Regular',
            textMonthFontFamily: 'JosefinSans-Regular',
            textDayHeaderFontFamily: 'JosefinSans-Regular',
          }}
        />
      </LinearGradient>
      {isLoading ? (
        <Text style={styles.loadingText}>Loading slots...</Text>
      ) : isError ? (
        <Text style={styles.errorText}>Error fetching slots</Text>
      ) : times.length === 0 ? (
        <Text style={styles.noSlotsText}>No available slots for this date</Text>
      ) : (
        <View style={styles.timeGrid}>
          {times.map((time, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.timeButton,
                selectedTime === time && styles.selectedButton,
              ]}
              onPress={() => handleTimeSelect(time)}
            >
              <Text
                style={[
                  styles.timeText,
                  selectedTime === time && styles.selectedText,
                ]}
              >
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.overlay}>
        <TouchableOpacity
          onPress={handleBooking}
          style={[styles.loginButton]}
          disabled={isBookingLoading || !selectedTime}
        >
          {isBookingLoading ? (
            <BallIndicator size={20} color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>{buttonText}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles remain unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  timeButton: {
    width: '30%',
    paddingVertical: 15,
    marginVertical: 0,
    backgroundColor: '#e6f0fa',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedButton: {
    backgroundColor: '#2CBDCB',
  },
  timeText: {
    ...FONTS.fontMd,
    color: '#333',
  },
  selectedText: {
    ...FONTS.fontMd,
    color: '#fff',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    textAlign: 'center',
    ...FONTS.h5,
    marginTop: 20,
    color: 'red',
  },
  noSlotsText: {
    ...FONTS.h5,
    textAlign: 'center',
    marginTop: 20,
    color: '#797979',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  calendarContainer: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    height: 50,
    width: '100%',
  },
  loginButtonText: {
    ...FONTS.fontMd,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TimeSelector;