import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import ImageSearchScreen from './ImageSearchScreen';
import WeatherLocationComponent from '../components/WeatherLocationComponent';
import NewsComponent from '../components/NewsComponent';
import GoogleAccountModal from '../components/GoogleAccountModal';
import auth from '@react-native-firebase/auth';

const Home = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
    });
    return subscriber; // Unsubscribe on unmount
  }, []);

  // ✅ Get First Initial from Name
  const getInitial = name => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  // ✅ Generate Random Background Color for Initial
  const getRandomColor = () => {
    const colors = ['#ff6b6b', '#6b5b95', '#ffa07a', '#ffcc5c', '#88b04b'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.header}>
          {/* Left Lab Icon */}
          <Image
            source={require('../assets/icons/labIcon.png')}
            style={styles.iconStyle}
          />

          {/* Right Profile (Lab Icon → Avatar) */}
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.profileContainer}>
            {user?.photoURL ? (
              <Image source={{uri: user.photoURL}} style={styles.avatar} />
            ) : (
              <View
                style={[
                  styles.avatarPlaceholder,
                  {backgroundColor: getRandomColor()},
                ]}>
                <Text style={styles.initialText}>
                  {getInitial(user?.displayName)}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Google Logo */}
        <View>
          <Image
            source={require('../assets/icons/googleLogo.png')}
            style={styles.googleLogo}
          />
        </View>

        {/* Components */}
        <ImageSearchScreen />
        <WeatherLocationComponent />
        <NewsComponent />

        {/* Google Account Modal */}
        <GoogleAccountModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {flex: 1, backgroundColor: '#1f2125'},
  safeContainer: {flex: 1, padding: 16},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  iconStyle: {width: 30, height: 30},
  googleLogo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  profileContainer: {
    width: 35,
    height: 35,
    borderRadius: 50,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 35,
    height: 35,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Home;
