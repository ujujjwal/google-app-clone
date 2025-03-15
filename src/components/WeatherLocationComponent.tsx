import React from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';

const data = [
  {
    id: '1',
    location: 'Gurugram',
    temperature: '30°',
    icon: require('../assets/icons/moon.png'), // Night mode icon
  },
  {
    id: '2',
    label: 'Air quality · 170',
    status: 'Moderate',
    icon: require('../assets/icons/air_quality.png'), // AQI Icon
  },
];

const WeatherLocationComponent = () => {
  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      renderItem={({item}) => (
        <View style={styles.card}>
          <Text style={styles.label}>{item.location || item.label}</Text>
          <View style={styles.row}>
            <Text style={styles.value}>{item.temperature || item.status}</Text>
            <Image source={item.icon} style={styles.icon} />
          </View>
        </View>
      )}
    />
  );
};

export default WeatherLocationComponent;

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 10,
  },
  card: {
    backgroundColor: 'transparent',
    borderRadius: 40,
    paddingHorizontal: 60,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#3b3d3f',
    marginTop: 20,
	  paddingVertical: 40,
	alignItems:"flex-start"
  },
  label: {
    color: '#fff',
    fontSize: 14,
	  fontWeight: '500',
	textAlign:"left"
  },
  row: {
    flexDirection: 'row',
    marginTop: 5,
  },
  value: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
