import React from 'react';
import { View, Button, Alert } from 'react-native';
import { signInWithGoogle } from '../components/GoogleSignIn'; // 🔥 FIX: Correct Import

const SignInScreen = (props) => {
  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      console.log('🎉 Google Sign-In Success:', user);
      Alert.alert("Signed In!", `Welcome ${user.user.displayName}`);
      // props.navigation.navigate("ImageSearch");
    } catch (error) {
      console.error('❌ Google Sign-In Failed:', error);
      Alert.alert("Error", "Google Sign-In Failed. Please try again.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Sign in with Google" onPress={handleGoogleSignIn} />
    </View>
  );
};

export default SignInScreen;
