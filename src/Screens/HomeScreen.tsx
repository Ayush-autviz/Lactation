import { Bell } from 'lucide-react-native';
import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../Constants/Theme';
import HomeBox from '../Components/HomeBox';
import Button from '../Components/Button';
import Divider from '../Components/Divider';
import CustomCard from '../Components/ListCard';
import { navigate } from '../utils/NavigationUtil';
import { useGetBookingsQuery } from '../store/apis/internalApi';

// Define types for the box data
interface BoxItem {
  image: ImageSourcePropType;
  colors: [string, string];
  subHeading: string;
  value: string;
}

// Define props for the HomeScreen
interface HomeScreenProps {
  navigation: any; // Replace 'any' with your navigation type if using a navigation library
}

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

// Define static box data
const BOXES: BoxItem[] = [
  {
    image: require("../assets/images/bottle.png"),
    colors: ['#E8FFF1', '#FFFFFF'],
    subHeading: 'Sessions',
    value: "8",
  },
  {
    image: require("../assets/images/mug.png"),
    colors: ["#FFEFF6", "#F9F9F9"],
    subHeading: 'Volume',
    value: "240ml",
  },
  {
    image: require("../assets/images/time.png"),
    colors: ["#EDFDFF", "#F9F9F9"],
    subHeading: 'Duration',
    value: "25min",
  },
];

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
  const bookingDate = new Date(booking.booking_date);
  const today = new Date('2025-04-17');
  const isToday = bookingDate.toDateString() === today.toDateString();
  const isTomorrow = new Date(bookingDate).setDate(bookingDate.getDate() - 1) === today.getTime();

  const startTime = booking.slot_start_time;
  const endTime = booking.slot_end_time;

  const timeStr = `${startTime} - ${endTime}`;
  if (isToday) {
    return `Today, ${timeStr}`;
  } else if (isTomorrow) {
    return `Tomorrow, ${timeStr}`;
  } else {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return `${bookingDate.toLocaleDateString('en-US', options)}, ${timeStr}`;
  }
};

const HomeScreen = memo(({ navigation }: HomeScreenProps) => {
  const { data: bookings, isLoading: bookingsLoading, isError: bookingError } = useGetBookingsQuery();

  const handleNotificationNavigation = (): void => {
    navigate("Notification");
  };

  const handleViewAllBookings = (): void => {
    navigate("UpcomingBookingsScreen");
  };

  // Filter upcoming bookings
  const upcomingBookings = bookings?.data?.filter((booking: Booking) => {
    const bookingDate = new Date(booking.booking_date);
    const today = new Date('2025-04-17');
    return (
      !booking.is_cancelled &&
      !booking.is_past &&
      booking.current_status === 'pending' &&
      bookingDate >= today
    );
  }) || [];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <SafeAreaView style={styles.header}>
          <View>
            <Text style={styles.title}>Today's Stats</Text>
            <Text style={styles.paragraph}>
              Sed ut perspiciatis unde omnis iste natus error
            </Text>
          </View>
          <TouchableOpacity onPress={handleNotificationNavigation}>
            <Bell size={30} />
          </TouchableOpacity>
        </SafeAreaView>

        <View style={styles.boxesContainer}>
          {BOXES.map((item, index) => (
            <HomeBox key={index} item={item} />
          ))}
        </View>

        <Button>New Session</Button>
        <Button textStyle={{ color: "#434342" }} style={{ backgroundColor: COLORS.white }}>
          Book Consult
        </Button>
        <Divider />

        <Text style={styles.subHeading}>Upcoming Appointments</Text>
        <AppointmentCard
          title="Lactation Consultation"
          time="Tomorrow, 2:00 PM"
          colors={["#FFF4F9", "#F9F9F9"]}
        />

        <View style={styles.bookingsHeader}>
          <Text style={styles.subHeading}>Upcoming Bookings</Text>
          <TouchableOpacity onPress={handleViewAllBookings}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        {bookingsLoading ? (
          <Text>Loading bookings...</Text>
        ) : bookingError ? (
          <Text>Error loading bookings</Text>
        ) : upcomingBookings.length === 0 ? (
          <Text>No upcoming bookings</Text>
        ) : (
          upcomingBookings.slice(0, 3).map((booking: Booking, index: number) => (
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
  boxesContainer: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    marginBottom: 20,
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
  bookingsHeader: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    marginTop: 20,
  },
  viewAllText: {
    ...FONTS.font,
    color: COLORS.primary,
  //  textDecorationLine: "underline" as const,
  },
});

export default HomeScreen;