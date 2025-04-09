import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Header from '../Components/Header';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import CustomCard from '../Components/ListCard';
import Button from '../Components/Button';
import { COLORS,FONTS } from '../Constants/Theme';
import { navigate } from '../utils/NavigationUtil';

type BookingScreenProps = {
    navigation: any;
    route: any;
};

const BookingScreen: React.FC<BookingScreenProps> = ({ navigation }) => {
  const markedDate = {
    '2025-01-14': {
      selected: true,
      marked: true,
      selectedColor: '#00BCD4', // Matches the highlighted color in your image
    },
  };

  const handleBook = ()=>{
    navigate("SlotScreen")
  }
  
  return (
    <View style={styles.container}>
      <Header title='Booking' backButton={false}/>
      <LinearGradient
      colors={['#F0FEFF', '#D7FBFF']} // Gradient from light cyan to a slightly darker shade
      style={styles.calendarContainer}
    >
      <Calendar
        // Current date
        // Callback that gets called when day presses
        onDayPress={(day) => {
          console.log('selected day', day);
        }}
        // Month format
        monthFormat={'MMMM'}
        // Hide arrows
        hideArrows={false}
        // Replace default arrows with custom ones
        renderArrow={(direction) => direction === 'left' ? 
        <View style={{backgroundColor:'#2CBCCA',alignItems:'center',justifyContent:'center',paddingHorizontal:6,paddingVertical:5,borderRadius:999}}>
          <Image source={require("../assets/images/arrowLeft.png")}/>
        </View>
        :          <View style={{backgroundColor:'#2CBCCA',alignItems:'center',justifyContent:'center',paddingHorizontal:6,paddingVertical:5,borderRadius:999}}>
        <Image source={require("../assets/images/arrowRight.png")}/>
      </View>
      
    }
        // Disable all touch events for disabled days
        disableAllTouchEventsForDisabledDays={true}
        // Marked dates
       
        // Custom styling
        theme={{
          backgroundColor: 'transparent',
          calendarBackground: 'transparent',
          textSectionTitleColor: '#696969',
          selectedDayBackgroundColor: '#2CBCCA',
          selectedDayTextColor: '#FFFFFF',
          todayTextColor: '#00BCD4',
          dayTextColor: ' #696969',
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

      <CustomCard Colors={["#FFEFF6", "#F9F9F9"] }>
        <View  style={{flexDirection:'column',padding:15,}}>
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
         <View style={{flexDirection:'column'}}>
              <View style={{flexDirection:'row',alignItems:'center',gap:10}} >
                  <Text style={styles.Heading}>Room 101</Text>
                  <Image source={require("../assets/images/room.png")}/>
              </View>
              <View style={{flexDirection:'row',alignItems:'center',gap:5,marginTop:5}} >
                  <Text style={styles.subHeading}>Floor 1, West Wing</Text>
                  <Image source={require("../assets/images/Pin.png")}/>
              </View>
         </View>
         <View style={{paddingVertical:8,paddingHorizontal:12,borderRadius:999,backgroundColor:'#DCFCE7',justifyContent:'center',alignItems:'center'}}>
               <Text style={[styles.subHeading,{color:'#03953B'}]}>Available</Text>  
         </View>
         </View>
         <Button onPress={handleBook} style={{paddingHorizontal:20,paddingVertical:10}}>
          Book
         </Button>

        </View>
      </CustomCard>
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
    marginBottom: 20,
  },
  calendarContainer:{
    borderRadius: 10,
     shadowColor: '#000',
     shadowOpacity: 0.1,
     shadowRadius: 5,
     elevation: 3,
  },
  Heading:{
    ...FONTS.fontLg,
    color:'#292929'
   },
   subHeading:{
    ...FONTS.font,
   },
});

export default BookingScreen;