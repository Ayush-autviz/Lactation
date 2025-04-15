import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

const RADIUS = 90;
const STROKE_WIDTH = 15;
const CIRCLE_LENGTH = 2 * Math.PI * RADIUS;

type GradientCircularProgressProps = {
  progress: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  waterIntake: number;
  targetIntake: number;
};

const GradientCircularProgress = ({
  progress,
  waterIntake,
  targetIntake,
  size = 200,
  strokeWidth = STROKE_WIDTH,
}: GradientCircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#4FC3F7" />
            <Stop offset="100%" stopColor="#B2EBF2" />
          </LinearGradient>
        </Defs>

        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E0E0E0"
          strokeWidth={strokeWidth}
        />

        {/* Foreground Gradient Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#grad)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      {/* Centered Text */}
      <View style={styles.textContainer}>
        <Text style={styles.doneText}>Done</Text>
        <Text style={styles.intakeText}>
          {waterIntake} of {targetIntake}ml
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    shadowColor: '#4FC3F7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  textContainer: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneText: {
    fontSize: 16,
    color: '#666',
  },
  intakeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default GradientCircularProgress;
