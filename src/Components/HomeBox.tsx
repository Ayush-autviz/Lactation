import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SIZES,FONTS } from '../Constants/Theme';

const HomeBox = ({ item }: { item: any }) => {
  return (
    <LinearGradient
      colors={[...item.colors]}
      start={{ x: 0.1, y: 0.2 }}
      end={{ x: 0.9, y: 1 }}
      style={styles.container} 
    >
      <View style={{padding:10,flexDirection:'column',justifyContent:'space-between',height:"100%"}}>
        <Image source={item.image} style={{width:24,height:24,resizeMode:'contain'}}/>
        <Text style={styles.subHeading} >{item.subHeading}</Text>
        <Text style={styles.Heading} >{item.value}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginTop:20,
    width:SIZES.width/3-20,
    height:110,
    shadowOpacity: 0.1,
    shadowRadius: 8.5,
    elevation: 5, // For Android shadow
  },
  subHeading:{
   ...FONTS.h6
  },
  Heading:{
    ...FONTS.h3
   }
});

export default HomeBox;
