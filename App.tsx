import './src/config/firebaseConfig'; // ✅ Ensure Firebase is initialized
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import TextResults from './src/screens/TextResults';
import Home from './src/screens/Home';
import {LogBox, Image, View, StyleSheet} from 'react-native';

// 🔹 Import Custom Icons
const homeIcon = require('./src/assets/icons/home.png');
const homeIconActive = require('./src/assets/icons/homeActive.png');
const textIcon = require('./src/assets/icons/textSearch.png');
const textIconActive = require('./src/assets/icons/textSearchActive.png');

// Ignore VirtualizedLists Warning
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarStyle: styles.tabBar, // Custom tab bar style
          tabBarIcon: ({focused}) => {
            let iconSource;

            if (route.name === 'Home') {
              iconSource = focused ? homeIconActive : homeIcon;
            } else if (route.name === 'Text') {
              iconSource = focused ? textIconActive : textIcon;
            }

            return (
              <View style={styles.iconContainer}>
                <Image source={iconSource} style={styles.icon} />
              </View>
            );
          },
          tabBarShowLabel: false, // Hide tab labels
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'red',
        })}>
        <Tab.Screen
          options={{headerShown: false}}
          name="Home"
          component={Home}
        />
        <Tab.Screen name="Text" component={TextResults} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// 🔥 Styling
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#2f3133', // Dark background color
    borderTopWidth: 0, // Remove top border
    height: 60, // Adjust height
    paddingBottom: 5, // Ensure proper spacing
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 25, // Adjust icon size
    height: 25 ,
    resizeMode: 'contain',
  },
});

export default App;
