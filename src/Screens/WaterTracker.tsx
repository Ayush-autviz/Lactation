import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import GradientCircularProgress from '../Components/GradienrCircularProgress';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../Components/Header';
import { COLORS, FONTS } from '../Constants/Theme';
import CustomCard from '../Components/ListCard';
import Button from '../Components/Button';

const WaterIntakeTracker: React.FC = () => {
  const [waterIntake, setWaterIntake] = useState<number>(2000); // Initial intake in ml
  const targetIntake = 3000; // Target intake in ml

  // Calculate progress percentage
  const progress = Math.min((waterIntake / targetIntake) * 100, 100);

  // Handlers for adding water
  const addWater = (amount: number) => {
    const newIntake = waterIntake + amount;
    setWaterIntake(newIntake > targetIntake ? targetIntake : newIntake); // Cap at target
  };

  // Handler for resetting tracking
  const resetTracking = () => {
    setWaterIntake(0);
  };

  return (
    <View style={styles.container}>
      <Header title="Water Tracker" />
      <View style={{justifyContent:'center',alignItems:'center'}}>
      <Text style={styles.title}>Water Intake Tracker</Text>
      <LinearGradient
            colors={["#EBFDFF", "#F9F9F9"]}
            // start={{ x: 0.1, y: 0.2 }}
            // end={{ x: 0.9, y: 1 }}
            style={styles.gradientCircle}
      >
      <AnimatedCircularProgress
        size={250}
        width={40}
        fill={progress}
        tintColor="#2CBDCB"
        backgroundColor="transparent"
        rotation={0}
        lineCap="round"
       
      >
        {() => (
          <View style={styles.progressTextContainer}>
            <Text style={styles.doneText}>Done</Text>
            <Text style={styles.intakeText}>
            {waterIntake}
            </Text>
            <Text style={styles.doneText}>
            of {targetIntake}ml
            </Text>
          </View>
        )}
      </AnimatedCircularProgress>
      </LinearGradient>
      {/* <GradientCircularProgress
  progress={66.7}
  waterIntake={2000}
  targetIntake={3000}
/> */}

<View>

      <Text style={styles.title}>Quick Add</Text>
      <View style={styles.buttonContainer}>
      <LinearGradient
            colors={["#EDFDFF", "#F9F9F9"]}
            // start={{ x: 0.1, y: 0.2 }}
            // end={{ x: 0.9, y: 1 }}
            style={styles.gradientButton}

            
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => addWater(250)}
        >
          <Text style={styles.buttonText}>+250ml</Text>
        </TouchableOpacity>
    </LinearGradient>
        <LinearGradient
            colors={["#EDFDFF", "#F9F9F9"]}
            // start={{ x: 0.1, y: 0.2 }}
            // end={{ x: 0.9, y: 1 }}
            style={styles.gradientButton}

            
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => addWater(500)}
        >
          <Text style={styles.buttonText}>+500ml</Text>
        </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
            colors={["#EDFDFF", "#F9F9F9"]}
            // start={{ x: 0.1, y: 0.2 }}
            // end={{ x: 0.9, y: 1 }}
            style={styles.gradientButton}

            
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => addWater(1000)}
        >
          <Text style={styles.buttonText}>+1000ml</Text>
        </TouchableOpacity>
        </LinearGradient>
      </View>
      <CustomCard Colors={["#E9E9E9", "#fff"]} style={{marginTop:20}}>
      <Text style={styles.note}>
        Staying hydrated is crucial for milk production. The recommended daily water intake for nursing mothers is 64oz (about 8 cups).
      </Text>
      </CustomCard>
     <Button onPress={resetTracking} >
     Reset Tracking
     </Button>
      </View>
    </View>
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
    marginVertical:20
  },
  progressTextContainer: {
    gap:8,
    justifyContent:"center",
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor:"#fff",
    height:150,
    width:150,
    borderRadius:999
  },
  doneText: {
    ...FONTS.font,
    color: "#797979",
  },
  intakeText: {
    ...FONTS.fontXl,
    color: "#797979",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  gradientButton:{
    borderRadius: 10,
    borderWidth:0.8,
    borderColor:'#C7F1F5'
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  
    alignItems: 'center',
  },
  buttonText: {
    ...FONTS.font,
    color: '#292929',
  },
  note: {
    ...FONTS.font,
    color: "#797979",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
  },
  resetButton: {
    backgroundColor: '#4FC3F7',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  resetButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  gradientCircle:{
   width:265,
   height:265,
   borderRadius:350,
   justifyContent:'center',
   alignItems:'center',
   shadowColor: '#000',
   shadowOpacity: 0.3,
   shadowRadius: 5,
   elevation: 3,
   
  }
});

export default WaterIntakeTracker;