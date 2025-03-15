import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// ✅ Firebase Configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDWEl64EXl3gCv4EIy2dO22W3X_IsbcHcI',
  authDomain: 'my--clone-assignment.firebaseapp.com',
  projectId: 'my--clone-assignment',
  storageBucket: 'my--clone-assignment.firebasestorage.app',
  messagingSenderId: '146581606434',
  appId: '1:146581606434:ios:658e9475e0800709a27a7b',
};

// ✅ Initialize Firebase App (Check if already initialized)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Configure Google Sign-In
GoogleSignin.configure({
  webClientId: '146581606434-f2tcq9jp98495i4jp5vu09go4jj4q8qt.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  offlineAccess: true,
});

console.log("🔥 Web Client ID in use:", GoogleSignin.getTokens);


export { app, auth, GoogleSignin };
