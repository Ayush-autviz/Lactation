import { Bell } from 'lucide-react-native';
import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS } from '../Constants/Theme';
import HomeBox from '../Components/HomeBox';
import Button from '../Components/Button';
import Divider from '../Components/Divider';
import CustomCard from '../Components/ListCard';
import { navigate } from '../utils/NavigationUtil';

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

// Props for AppointmentCard
interface AppointmentCardProps {
  title: string;
  time: string;
  colors: [string, string];
}

// Reusable Appointment Card Component
const AppointmentCard = memo(({ title, time, colors }: AppointmentCardProps) => (
  <CustomCard Colors={colors} style={{marginTop:20}}>
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

const HomeScreen = memo(({ navigation }: HomeScreenProps) => {
  const handleNotificationNavigation = (): void => {
    navigate("Notification");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Today's Stats</Text>
          <Text style={styles.paragraph}>
            Sed ut perspiciatis unde omnis iste natus error
          </Text>
        </View>
        <TouchableOpacity onPress={handleNotificationNavigation}>
          <Bell size={30} />
        </TouchableOpacity>
      </View>

      <View style={styles.boxesContainer}>
        {BOXES.map((item, index) => (
          <HomeBox key={index} item={item} />
        ))}
      </View>

      <Button />
      <Button />
      <Divider />

      <Text style={styles.subHeading}>Upcoming Appointments</Text>
      <AppointmentCard 
        title="Lactation Consultation"
        time="Tomorrow, 2:00 PM"
        colors={["#FFF4F9", "#F9F9F9"]}
      />

      <Text style={[styles.subHeading, styles.sectionSpacing]}>
        Recent Activity
      </Text>
      <AppointmentCard 
        title="Lactation Consultation"
        time="Tomorrow, 2:00 PM"
        colors={["#DEFCFF", "#F9F9F9"]}
      />
    </SafeAreaView>
  );
});

// Define styles with TypeScript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    marginBottom: 20,
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
});

export default HomeScreen;