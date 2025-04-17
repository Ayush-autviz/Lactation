import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Calendar } from 'react-native-calendars';
import { COLORS, FONTS } from '../Constants/Theme';
import CustomCard from '../Components/ListCard';
import { useGetBookingsByDateQuery } from '../store/apis/internalApi';
import Header from '../Components/Header';


// Define types for booking data
interface Booking {
  id: number;
  lactation_room_slot: {
    id: number;
    start_time: string;
    end_time: string;
    interval: number;
    lactation_room: number;
  };
  booking_date: string;
  is_cancelled: boolean;
  cancellation_reason: string | null;
  conflict_flag: boolean;
  attendance_status: string;
  created_at: string;
  updated_at: string;
  is_past: boolean;
  current_status: string;
  slot_start_time: string;
  slot_end_time: string;
}

// Define props for AppointmentCard
interface AppointmentCardProps {
  title: string;
  time: string;
  colors: [string, string];
}

// Define props for CalendarBookingsScreen
interface CalendarBookingsScreenProps {
  navigation: any; // Replace 'any' with your navigation type if using a navigation library
}

// Reusable Appointment Card Component
const AppointmentCard = memo(({ title, time, colors }: AppointmentCardProps) => (
  <CustomCard Colors={colors} style={{ marginTop: 20 }}>
    <View style={styles.cardContent}>
      <Image
        source={require("../assets/images/calendar.png")}
        style={styles.calendarIcon}
      />
      <View>
        <Text style={styles.paragraphTitle}>{title}</Text>
        <Text style={styles.paragraph}>{time}</Text>
      </View>
    </View>
  </CustomCard>
));

// Utility function to format date and time
const formatBookingTime = (booking: Booking): string => {
  const startTime = booking.slot_start_time;
  const endTime = booking.slot_end_time;
  return `${startTime} - ${endTime}`;
};

const BookingsHistoryScreen = memo(({ navigation }: CalendarBookingsScreenProps) => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date('2025-04-17').toISOString().split('T')[0]);

  const { data: bookingsData, isLoading: bookingsLoading, isError: bookingError } = useGetBookingsByDateQuery(selectedDate);

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  };

  // Filter valid bookings
  const bookings = bookingsData?.data?.filter((booking: Booking) => {
    return (
      !booking.is_cancelled &&
      !booking.is_past &&
      booking.current_status === 'pending'
    );
  }) || [];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} >
        <Header title="Booking History" />

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

        <Text style={[styles.subHeading, styles.sectionSpacing]}>Bookings for {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</Text>
        {bookingsLoading ? (
          <View style={{height:120,justifyContent:'center',alignItems:'center'}}>
          <Text style={styles.subHeading2}>Loading bookings...</Text>
          </View>
        ) : bookingError ? (
          <View style={{height:120,justifyContent:'center',alignItems:'center'}}>
          <Text style={styles.subHeading2}>Error loading bookings</Text>
          </View>
        ) : bookings.length === 0 ? (
          <View style={{height:120,justifyContent:'center',alignItems:'center'}}>
          <Text style={styles.subHeading2}>No bookings for this date</Text>
          </View>
        ) : (
          bookings.map((booking: Booking) => (
            <AppointmentCard
              key={booking.id}
              title={`Lactation Room ${booking.lactation_room_slot.lactation_room}`}
              time={formatBookingTime(booking)}
              colors={["#DEFCFF", "#F9F9F9"]}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
});

// Define styles with TypeScript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  title: {
    ...FONTS.h3,
  },
  paragraph: {
    ...FONTS.fontSm,
  },
  paragraphTitle: {
    ...FONTS.font,
    color: '#292929',
  },
  subHeading: {
    ...FONTS.h5,
    color: '#292929',
  },
  subHeading2: {
    ...FONTS.h5,
    color: '#797979',
  },
  sectionSpacing: {
    marginTop: 10,
  },
  cardContent: {
    padding: 18,
    flexDirection: 'row' as const,
    gap: 20,
    alignItems: 'center' as const,
  },
  calendarIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain' as const,
  },
  calendarContainer: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
});

export default BookingsHistoryScreen;