import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../Components/Header'
import { COLORS,FONTS } from '../Constants/Theme';

interface ListItem {
    id: string;
    name: string;
    text: string;
    image: any; // You can replace 'any' with a more specific type if you have image data
  }
  
  // Sample data (you can replace this with your actual data)
  const DATA: ListItem[] = [
    {
      id: '1',
      name: 'Sam Gamjee',
      text: 'Sed ut perspiciatis unde omnis iste natus error',
      image: require('../assets/images/profile.png'), // Replace with actual image path
    },
    {
      id: '2',
      name: 'Sam Gamjee',
      text: 'Sed ut perspiciatis unde omnis iste natus error',
      image: require('../assets/images/profile.png'), // Replace with actual image path
    },
    {
      id: '3',
      name: 'Sam Gamjee',
      text: 'Sed ut perspiciatis unde omnis iste natus error',
      image: require('../assets/images/profile.png'), // Replace with actual image path
    },
    {
      id: '4',
      name: 'Sam Gamjee',
      text: 'Sed ut perspiciatis unde omnis iste natus error',
      image: require('../assets/images/profile.png'), // Replace with actual image path
    },
  ];




const NotificationScreen = () => {
    const Item: React.FC<{ item: ListItem }> = ({ item }) => (
        <View style={styles.item}>
          <Image source={item.image} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        </View>
      );
  return (
    <View style={styles.container}>
      <Header title='Notifiaction'/>
      <FlatList
      data={DATA}
      renderItem={({ item }) => <Item item={item} />}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.list}
    />
    </View>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding:20
      },
      list: {
  
      },
      item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingVertical:20,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E2E2',
      },
      image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
      },
      textContainer: {
        flex: 1,
        paddingLeft:10
      },
      name: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      text: {
        ...FONTS.font,
        color: '#434342',
      },
})