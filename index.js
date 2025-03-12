/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {initializeApp, getApps} from 'firebase/app';
import {firebaseConfig} from './src/config/firebaseConfig'; // Ensure this file exists

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

AppRegistry.registerComponent(appName, () => App);
