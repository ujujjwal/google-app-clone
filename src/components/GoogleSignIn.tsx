import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId: '146581606434-f2tcq9jp98495i4jp5vu09go4jj4q8qt.apps.googleusercontent.com', // ✅ Web Client ID
  iosClientId: '146581606434-hf6p8tid1jlnb40ehjj7fok50mbbpo30.apps.googleusercontent.com', // ✅ iOS Client ID
  scopes: ['profile', 'email'],
  offlineAccess: true,
});

export const signInWithGoogle = async () => {
  try {
    console.log("🚀 Checking Play Services...");
    await GoogleSignin.hasPlayServices();

    console.log("🔑 Signing in...");
    const userInfo = await GoogleSignin.signIn();
    console.log("✅ Google Sign-In Response:", userInfo.data?.idToken);

    if (!userInfo || !userInfo.data || !userInfo.data.idToken) {
      throw new Error("Google Sign-In Failed: No ID Token!");
    }

    // ✅ Create Firebase Credential
    const googleCredential = auth.GoogleAuthProvider.credential(userInfo.data?.idToken);

    // ✅ Sign in to Firebase
    const firebaseUser = await auth().signInWithCredential(googleCredential);
    console.log("🔥 Firebase Auth Success:", firebaseUser);

    return firebaseUser;
  } catch (error) {
    console.error('❌ Google Sign-In Error:', error);
    throw error;
  }
};
