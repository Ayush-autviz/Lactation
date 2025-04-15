import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Easing,
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import Header from '../Components/Header';
import { FONTS } from '../Constants/Theme';
import CustomCard from '../Components/ListCard';
import Button from '../Components/Button';

const BreathingExerciseScreen = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isPaused, setIsPaused] = useState(false);
  const rippleAnim = useRef(new Animated.Value(0)).current;
  const rippleAnim2 = useRef(new Animated.Value(0)).current;
  const rippleAnim3 = useRef(new Animated.Value(0)).current;

  // Start breathing exercise
  const startBreathing = () => {
    setIsBreathing(true);
    setTimeLeft(300);
    rippleAnim.setValue(0);
    rippleAnim2.setValue(0);
    rippleAnim3.setValue(0);
    startTimer();
    animateRipples();
  };

  // Animate ripples with staggered timing
  const animateRipples = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(rippleAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(rippleAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(rippleAnim2, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: false,
          delay: 1000,
        }),
        Animated.timing(rippleAnim2, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(rippleAnim3, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          delay: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(rippleAnim3, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  // Timer logic
  const startTimer = () => {
    // BackgroundTimer.run(() => {
    //   if (!isPaused && timeLeft > 0) {
    //     setTimeLeft((prev) => prev - 1);
    //   } else if (timeLeft === 0) {
    //     BackgroundTimer.stop();
    //     setIsBreathing(false);
    //     rippleAnim.setValue(0);
    //     rippleAnim2.setValue(0);
    //     rippleAnim3.setValue(0);
    //   }
    // }, 1000);
  };

  // Pause/Resume timer
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Clean up timer
  useEffect(() => {
    return () => BackgroundTimer.stop();
  }, []);

  return (
    <View style={styles.container}>
        <Header title="Exercise" />
      {!isBreathing ? (
        <>
          <Text style={styles.title}>5-Minute Breathing Exercise</Text>
          <Text style={styles.subtitle}>
            Find A Comfortable Position And Follow The Breathing Pattern Below
          </Text>
          <View style={styles.circleContainer}>
            <TouchableOpacity onPress={startBreathing} style={styles.startButton}>
              <Text style={styles.startText}>Start</Text>
            </TouchableOpacity>
          </View>
          <CustomCard Colors={['#F3F3F3', '#FFFFFF']} shadow={false}>
            <View style={{padding:20}}>
            <Text style={styles.tipsTitle}>Tips</Text>
            <View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
            <View style={{height:10,width:10,borderRadius:999,backgroundColor:'#CB2C6E',marginBottom:5}}/>
            <Text style={styles.tip}>Find a quiet place where you won't be disturbed</Text>
            </View>
            <View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
            <View style={{height:10,width:10,borderRadius:999,backgroundColor:'#CB2C6E',marginBottom:5}}/>
            <Text style={styles.tip}>Find a quiet place where you won't be disturbed</Text>
            </View>
            <View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
            <View style={{height:10,width:10,borderRadius:999,backgroundColor:'#CB2C6E',marginBottom:5}}/>
            <Text style={styles.tip}>Sit or lie in a comfortable position</Text>
            </View>
            <View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
            <View style={{height:10,width:10,borderRadius:999,backgroundColor:'#CB2C6E',marginBottom:5}}/>
            <Text style={styles.tip}>Close your eyes to help maintain focus</Text>
            </View>
            <View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
            <View style={{height:10,width:10,borderRadius:999,backgroundColor:'#CB2C6E',marginBottom:5}}/>
            <Text style={styles.tip}>Keep your shoulders relaxed</Text>
            </View>
            </View>
          </CustomCard>
        </>
      ) : (
        <>
          <Text style={styles.title}>5-Minute Breathing Exercise</Text>

          
          <View style={styles.circleContainer}>
            <Animated.View
              style={[
                styles.ripple,
                {
                  width: rippleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 200],
                  }),
                  height: rippleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 200],
                  }),
                  borderRadius: rippleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 100],
                  }),
                  opacity: rippleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 0],
                  }),
                },
              ]}
            />
            <Animated.View
              style={[
                styles.ripple,
                {
                  width: rippleAnim2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 200],
                  }),
                  height: rippleAnim2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 200],
                  }),
                  borderRadius: rippleAnim2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 100],
                  }),
                  opacity: rippleAnim2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.6, 0],
                  }),
                },
              ]}
            />
            <Animated.View
              style={[
                styles.ripple,
                {
                  width: rippleAnim3.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 200],
                  }),
                  height: rippleAnim3.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 200],
                  }),
                  borderRadius: rippleAnim3.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 100],
                  }),
                  opacity: rippleAnim3.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.4, 0],
                  }),
                },
              ]}
            />
            
          </View>
          <Text style={styles.subtitle}>
            {timeLeft > 0 ? `Breath In` : 'Exercise Complete'}
          </Text>
          <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
          <Button>
          {isPaused ? 'Resume' : 'Pause'}
          </Button>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    ...FONTS.h4,
    color: '#292929',
    marginVertical: 10,
    marginHorizontal:'auto',
    textAlign:'center'
  },
  subtitle: {
    ...FONTS.fontSm,
    color: '#797979',
   // marginVertical: 10,
    marginHorizontal:'auto',
    textAlign:'center'
  },
  timer: {
   ... FONTS.fontMd,
   marginHorizontal:'auto',
    marginBottom: 20,
  },
  circleContainer: {
    width: 200,
    height: 200,
    marginHorizontal:'auto',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    position:'relative'
  },
  startButton: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#b3e5fc',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  startText: {
    ...FONTS.h4,
    color: '#626262',
  },
  ripple: {
    backgroundColor: '#81d4fa',
    position: 'absolute',
  },
  tipsContainer: {
    backgroundColor: '#e0f7fa',
    padding: 10,
    borderRadius: 8,
  },
  tipsTitle: {
    ...FONTS.h5,
    color: '#292929',
    marginBottom: 10,
  },
  tip: {
    ...FONTS.fontSm,
    color: '#797979',
    marginBottom: 5,
  },
  pauseButton: {
    marginTop: "auto",
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4dd0e1',
    borderRadius: 8,
    alignItems: 'center',
    
  },
  pauseText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default BreathingExerciseScreen;