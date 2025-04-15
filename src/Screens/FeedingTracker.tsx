import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import Header from '../Components/Header';
import { COLORS, FONTS } from '../Constants/Theme';
import Button from '../Components/Button';
import CustomCard from '../Components/ListCard';

const FeedingTrackerScreen: React.FC = () => {
  const [timer, setTimer] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [interruptionCount, setInterruptionCount] = useState<number>(0);
  const [leftBreastTime, setLeftBreastTime] = useState<number>(0);
  const [rightBreastTime, setRightBreastTime] = useState<number>(0);
  const [totalBreaks, setTotalBreaks] = useState<number>(3);
  const [totalDuration, setTotalDuration] = useState<number>(45);
  const [leftBreastCount, setLeftBreastCount] = useState<number>(4);
  const [rightBreastCount, setRightBreastCount] = useState<number>(3);
  const [selectedBreast, setSelectedBreast] = useState<string | null>(null);

  useEffect(() => {
    let intervalId: number | undefined;
    if (isRunning) {
      intervalId = BackgroundTimer.setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (intervalId) BackgroundTimer.clearInterval(intervalId);
    };
  }, [isRunning]);

  const startTimer = (): void => {
    setIsRunning(true);
  };

  const pauseTimer = (): void => {
    setIsRunning(false);
  };

  const logInterruption = (): void => {
    setInterruptionCount((prev) => prev + 1);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const selectedGradient = ['#2CBDCB', '#F9F9F9']; // Light blue to blue
  const defaultGradient = ['#EBFDFF', '#F9F9F9'];

  return (
    <View style={styles.container}>
      <Header title="Feeding Trackeer" />
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(timer)}</Text>
        <Text style={styles.timerSubText}>
          Started at 09:55am 
        </Text>
        <Text style={styles.timerSubText}>
         Interruption: {interruptionCount}
        </Text>
        <View style={styles.timerButtons}>
          <TouchableOpacity style={styles.button} onPress={startTimer}>
            <Image source={require("../assets/images/pause.png")}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={pauseTimer}>
          <Image source={require("../assets/images/stop.png")}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonRow}>
      <CustomCard
       Colors={selectedBreast === 'left' ? selectedGradient : defaultGradient}
       style={{ width: '48%' }} shadow={false}>
      <TouchableOpacity
          style={styles.feedButton}
          onPress={() => {
            setSelectedBreast('left');
            setLeftBreastTime(0);
          }}
        //  onPress={() => setLeftBreastTime(leftBreastTime + timer)}
        >
          <Text
                           style={[
                            styles.feedButtonText,
                            selectedBreast === 'left' && { color: 'white' }
                          ]}
           >Left Breast</Text>
          <Text 
                style={[
                  styles.feedButtonTime,
                  selectedBreast === 'left' && { color: 'white' }
                ]}
          >{formatTime(leftBreastTime)} min</Text>
        </TouchableOpacity>
      </CustomCard>
      <CustomCard 
      
      Colors={selectedBreast === 'right' ? selectedGradient : defaultGradient}
      
      style={{ width: '48%' }} shadow={false}>
      <TouchableOpacity
          style={styles.feedButton}
          onPress={() => {
            setSelectedBreast('right');
            setLeftBreastTime(0);
          }}
         // onPress={() => setRightBreastTime(rightBreastTime + timer)}
        >
          <Text 
                style={[
                  styles.feedButtonText,
                  selectedBreast === 'right' && { color: 'white' }
                ]}
          >
            Right Breast
            </Text>
          <Text 
                style={[
                  styles.feedButtonTime,
                  selectedBreast === 'right' && { color: 'white' }
                ]}
          
          >{formatTime(rightBreastTime)} min</Text>
        </TouchableOpacity>
      </CustomCard>


      </View>
      <Button>
      Log interruption
      </Button>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Today’s Summary</Text>
        <View style={styles.summaryRow}>
          <CustomCard Colors={['#EBFDFF', '#F9F9F9']} style={styles.summaryBox} shadow={false}>
            <View style={{padding:10}}>
          <Text style={styles.summaryLabel}>Total Breaks</Text>
            <Text style={styles.summaryValue}>{totalBreaks}</Text>
            </View>
          </CustomCard>
                    <CustomCard Colors={['#EBFDFF', '#F9F9F9']} style={styles.summaryBox} shadow={false}>
            <View style={{padding:10}}>
            <Text style={styles.summaryLabel}>Total Duration</Text>
            <Text style={styles.summaryValue}>{totalDuration} min</Text>
            </View>
          </CustomCard>
        </View>
        <View style={styles.summaryRow}>
        <CustomCard Colors={['#EBFDFF', '#F9F9F9']} style={styles.summaryBox} shadow={false}>
            <View style={{padding:10}}>
            <Text style={styles.summaryLabel}>Left Breast</Text>
            <Text style={styles.summaryValue}>{leftBreastCount} times</Text>
            </View>
          </CustomCard>
          <CustomCard Colors={['#EBFDFF', '#F9F9F9']} style={styles.summaryBox} shadow={false}>
            <View style={{padding:10}}>
            <Text style={styles.summaryLabel}>Right Breast</Text>
            <Text style={styles.summaryValue}>{rightBreastCount} times</Text>
            </View>
          </CustomCard>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    backgroundColor: '#fff' 
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  timerContainer: { 
    width:220,
    height:220,
    marginHorizontal:'auto',
    borderRadius:110,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20 ,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  timerText: { 
    ...FONTS.font2Xl,
    color: '#797979',
  },
  timerSubText: { 
    ...FONTS.font,
    color: '#797979',
  },
  timerButtons: { 
    flexDirection: 'row',
    gap:10,
    marginTop: 10 },
  button: { 
     height: 38,
     width: 38, 
     backgroundColor: '#2CBCCA', 
     borderRadius:  19,
     alignItems: 'center',
     justifyContent: 'center'
  },
  buttonText: { fontSize: 18 },
  buttonRow: { 
    flexDirection: 'row',
     justifyContent: 'space-between', 
     },
  feedButton: { padding: 15 },
  feedButtonText: { 
    ...FONTS.fontMd,
    color: '#292929',
  },
  feedButtonTime: { 
    ...FONTS.fontXs,
    color: '#292929',
    marginTop:5
   },
  interruptionButton: { padding: 15, backgroundColor: '#26a69a', borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  interruptionButtonText: { color: '#fff', fontSize: 16 },
  summaryContainer: { 
    padding: 20, 
    backgroundColor: '#fff',
     borderRadius: 10,
     shadowColor: '#000',
     shadowOpacity: 0.1,
     shadowRadius: 5,
     elevation: 3,
     marginTop:20

   },
  summaryTitle: { 
    ...FONTS.h4,
    color: '#292929',
     marginBottom: 20 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryBox: {
     backgroundColor: '#fff',
     borderWidth: 0.6, 
     borderColor: '#C7F1F5', 
     borderRadius: 8, 
     width: '48%', 
     },
  summaryLabel: { 
    ...FONTS.font,
    color: '#797979',
  },
  summaryValue: { 
    marginTop:8,
    ...FONTS.h2,
    color: '#292929',
   },
});

export default FeedingTrackerScreen;