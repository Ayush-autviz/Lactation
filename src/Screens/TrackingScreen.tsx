import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CustomCard from '../Components/ListCard';
import Header from '../Components/Header';
import { COLORS, FONTS } from '../Constants/Theme';
import { navigate } from '../utils/NavigationUtil';

// Main Component
const TrackingScreen = () => {
  // Render Functions for Sections

  const handleWaterNavigation = ()=>{
    navigate("WaterTracking")
  }

  const handleFeedingNavigation = ()=>{
    navigate("FeedingTracking")
  }

  const handleExerciseNavigation = ()=>{
    navigate("ExerciseScreen")
  }

  const renderWaterFeedingSection = () => (
    <View style={styles.row}>
      <CustomCard Colors={['#EBFDFF', '#F9F9F9']} style={{ flex: 1 }} shadow={false}>
        <TouchableOpacity onPress={handleWaterNavigation} style={styles.cardContent}>
          <Image source={require('../assets/images/bottle.png')} />
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Water Tracking</Text>
            <Text style={styles.cardValue}>00:00 min</Text>
          </View>
        </TouchableOpacity>
      </CustomCard>
      
      <CustomCard Colors={['#FFEFF6', '#F9F9F9']} shadow={false} style={{ flex: 1 }}>
        {/* <View style={styles.cardContent}> */}
        <TouchableOpacity onPress={handleFeedingNavigation} style={styles.cardContent}>
          <Image source={require('../assets/images/bottle.png')} />
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Feeding Tracking</Text>
            <Text style={styles.cardValue}>00:00 min</Text>
          </View>
          </TouchableOpacity>
        {/* </View> */}
      </CustomCard>
    </View>
  );

  const renderWellnessActivities = () => (
    <CustomCard Colors={['#F3F3F3', '#fff']} shadow={false}>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Wellness Activities</Text>
        
        {[
          '5-Minute Breathing Exercise',
          'Quick Stretching Routine',
          'Mindfulness Session'
        ].map((activity, index) => (
          <TouchableOpacity onPress={handleExerciseNavigation} key={index} style={styles.listContent}>
            <Image source={require('../assets/images/bottle.png')} />
            <Text style={styles.cardTitle}>{activity}</Text>
            <Text style={styles.cardValue}>0 Today</Text>
          </TouchableOpacity>
        ))}
      </View>
    </CustomCard>
  );

  const renderTodaySummary = () => (
    <CustomCard Colors={['#F3F3F3', '#fff']} shadow={false} style={styles.summaryCard}>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Today's Summary</Text>
        <View style={styles.summaryContainer}>
          {Array(4).fill(null).map((_, index) => (
            <View key={index} style={styles.summaryRow}>
              <Text style={styles.cardValue}>Water Intake</Text>
              <Text style={styles.cardValue}>1.2L / 2.5L</Text>
            </View>
          ))}
        </View>
      </View>
    </CustomCard>
  );

  // Main Render
  return (
    <View style={styles.container}>
      <Header title="Track" backButton={false} />
      {renderWaterFeedingSection()}
      {renderWellnessActivities()}
      {renderTodaySummary()}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  // Layout Styles
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    marginBottom: 20,
  },
  sectionContainer: {
    flexDirection: 'column',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  summaryContainer: {
    flexDirection: 'column',
    gap: 5,
  },
  // Card Styles
  cardContent: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
    gap: 10,
    marginRight: 10,
  },
  listContent: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginTop: 10,
    gap: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  summaryCard: {
    marginTop: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'column',
  },
  // Text Styles
  title: {
    ...FONTS.h5,
    marginBottom: 10,
  },
  cardTitle: {
    ...FONTS.font,
    color: '#292929',
  },
  cardValue: {
    ...FONTS.font,
  },
});

export default TrackingScreen;