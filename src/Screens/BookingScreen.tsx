import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Header from '../Components/Header';
import LinearGradient from 'react-native-linear-gradient';
import CustomCard from '../Components/ListCard';
import Button from '../Components/Button';
import { COLORS, FONTS } from '../Constants/Theme';
import { navigate } from '../utils/NavigationUtil';
import { useGetLactationRoomsQuery } from '../store/apis/internalApi';

type BookingScreenProps = {
  navigation: any;
  route: any;
};

const BookingScreen: React.FC<BookingScreenProps> = ({ navigation }) => {
  const { data, error, isLoading } = useGetLactationRoomsQuery();

  // Handle loading and error states
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Header title="Booking" backButton={false} />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error || !data?.data) {
    return (
      <View style={styles.container}>
        <Header title="Booking" backButton={false} />
        <Text>Error loading lactation rooms.</Text>
      </View>
    );
  }

  const handleBook = (roomId: number) => {
    navigate('SlotScreen', { roomId });
  };

  return (
    <View style={styles.container}>
      <Header title="Booking" backButton={false} />
      <ScrollView style={{paddingTop:10 ,backgroundColor:COLORS.white }}>
      {data.data.map((room) => (
        <CustomCard key={room.id} style={{ marginBottom: 20,marginHorizontal:4 }} Colors={['#FFEFF6', '#F9F9F9']}>
          <View style={{ flexDirection: 'column', padding: 15 }}>
            <View style={styles.cardHeader}>
              <View style={styles.roomInfo}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <Text style={[styles.Heading, styles.roomName]}>{room.name}</Text>
                  {/* <Image source={require('../assets/images/room.png')} /> */}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 5 }}>
                  <Text style={styles.subHeading}>{room.location}</Text>
                  {/* <Image source={require('../assets/images/Pin.png')} /> */}
                </View>
              </View>
              {/* <View
                style={[
                  styles.availabilityBadge,
                  { backgroundColor: room.is_available ? '#DCFCE7' : '#FEE2E2' },
                ]}
              >
                <Text
                  style={[
                    styles.subHeading,
                    { color: room.is_available ? '#03953B' : '#B91C1C' },
                  ]}
                >
                  {room.is_available ? 'Available' : 'Unavailable'}
                </Text>
              </View> */}
            </View>
            <Button
              onPress={() => handleBook(room.id)}
              style={{ paddingHorizontal: 20, paddingVertical: 10 }}
              disabled={!room.is_available}
            >
              Book
            </Button>
          </View>
        </CustomCard>
      ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  roomInfo: {
    flex: 1,
    flexDirection: 'column',
  },
  roomName: {
    flexShrink: 1,
    maxWidth: '80%',
  },
  availabilityBadge: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100,
  },
  Heading: {
    ...FONTS.fontLg,
    color: '#292929',
  },
  subHeading: {
    ...FONTS.font,
  },
});

export default BookingScreen;