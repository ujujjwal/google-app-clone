import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import ImageSearchScreen from './ImageSearchScreen';
import WeatherLocationComponent from '../components/WeatherLocationComponent';
import NewsComponent from '../components/NewsComponent';
import GoogleAccountModal from '../components/GoogleAccountModal';
const Home = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView style={styles.scrollContainer}>
      <SafeAreaView style={{flex: 1, padding: 16}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <Image
            source={require('../assets/icons/labIcon.png')}
            style={styles.iconStyle}
          />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={require('../assets/icons/labIcon.png')}
              style={{width: 30, height: 30, alignSelf: 'flex-end'}}
            />
          </TouchableOpacity>
        </View>

        <View>
          <Image
            source={require('../assets/icons/googleLogo.png')}
            style={styles.googleLogo}
          />
        </View>

        <ImageSearchScreen />
        <WeatherLocationComponent />
			  <NewsComponent />
			        <GoogleAccountModal visible={isModalVisible} onClose={() => setModalVisible(false)} />

      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {flex: 1, backgroundColor: '#1f2125'},
  searchBubbles: {
    paddingHorizontal: 25,
    backgroundColor: 'red',
    borderRadius: 13,
    paddingVertical: 10,
    flex: 1,
    marginHorizontal: 6,
  },
  iconStyle: {width: 30, height: 30},
  googleLogo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});

export default Home;
