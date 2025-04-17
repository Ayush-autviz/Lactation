import React, { memo } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../Constants/Theme';
import CustomCard from '../Components/ListCard';
import { useGetBookingsQuery } from '../store/apis/internalApi';
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

// Define props for UpcomingBookingsScreen
interface UpcomingBookingsScreenProps {
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

// Utility function to format section date
const formatSectionDate = (booking: Booking): string => {
  const bookingDate = new Date(booking.booking_date);
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  return bookingDate.toLocaleDateString('en-US', options);
};

const UpcomingBookingsScreen = memo(({ navigation }: UpcomingBookingsScreenProps) => {
  const { data: bookings, isLoading: bookingsLoading, isError: bookingError } = useGetBookingsQuery();

  // Filter and group upcoming bookings
  const today = new Date('2025-04-17');
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const upcomingBookings = bookings?.data?.filter((booking: Booking) => {
    const bookingDate = new Date(booking.booking_date);
    return (
      !booking.is_cancelled &&
      !booking.is_past &&
      booking.current_status === 'pending' &&
      bookingDate >= today
    );
  }) || [];

  const todayBookings = upcomingBookings.filter((booking: Booking) => {
    const bookingDate = new Date(booking.booking_date);
    return bookingDate.toDateString() === today.toDateString();
  });

  const tomorrowBookings = upcomingBookings.filter((booking: Booking) => {
    const bookingDate = new Date(booking.booking_date);
    return bookingDate.toDateString() === tomorrow.toDateString();
  });

  const futureBookings = upcomingBookings.filter((booking: Booking) => {
    const bookingDate = new Date(booking.booking_date);
    return bookingDate > tomorrow;
  });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Header title="Upcoming Bookings"/>

        {bookingsLoading ? (
          <Text>Loading bookings...</Text>
        ) : bookingError ? (
          <Text>Error loading bookings</Text>
        ) : upcomingBookings.length === 0 ? (
          <Text>No upcoming bookings</Text>
        ) : (
          <>
            {/* Today Section */}
            {todayBookings.length > 0 && (
              <>
                <Text style={[styles.subHeading, styles.sectionSpacing]}>Today</Text>
                {todayBookings.map((booking: Booking) => (
                  <AppointmentCard
                    key={booking.id}
                    title={`Lactation Room ${booking.lactation_room_slot.lactation_room}`}
                    time={formatBookingTime(booking)}
                    colors={["#DEFCFF", "#F9F9F9"]}
                  />
                ))}
              </>
            )}

            {/* Tomorrow Section */}
            {tomorrowBookings.length > 0 && (
              <>
                <Text style={[styles.subHeading, styles.sectionSpacing]}>Tomorrow</Text>
                {tomorrowBookings.map((booking: Booking) => (
                  <AppointmentCard
                    key={booking.id}
                    title={`Lactation Room ${booking.lactation_room_slot.lactation_room}`}
                    time={formatBookingTime(booking)}
                    colors={["#DEFCFF", "#F9F9F9"]}
                  />
                ))}
              </>
            )}

            {/* Future Bookings Section */}
            {futureBookings.length > 0 && (
              <>
                <Text style={[styles.subHeading, styles.sectionSpacing]}>Future Bookings</Text>
                {futureBookings.map((booking: Booking) => (
                  <AppointmentCard
                    key={booking.id}
                    title={`Lactation Room ${booking.lactation_room_slot.lactation_room}`}
                    time={`${formatSectionDate(booking)}, ${formatBookingTime(booking)}`}
                    colors={["#DEFCFF", "#F9F9F9"]}
                  />
                ))}
              </>
            )}
          </>
        )}
        <SafeAreaView/>
      </ScrollView>
    </View>
  );
});

// Define styles with TypeScript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
  },
  title: {
    ...FONTS.h3,
  },
  paragraph: {
    ...FONTS.fontSm,
  },
  paragraphTitle: {
    ...FONTS.font,
    color: "#292929",
  },
  subHeading: {
    ...FONTS.h5,
  },
  sectionSpacing: {
    marginTop: 20,
  },
  cardContent: {
    padding: 18,
    flexDirection: "row" as const,
    gap: 20,
    alignItems: "center" as const,
  },
  calendarIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain" as const,
  },
});

export default UpcomingBookingsScreen;