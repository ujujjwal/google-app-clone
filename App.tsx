import "./src/config/firebaseConfig"; // ✅ Ensure Firebase is initialized
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ImageSearchScreen from "./src/screens/ImageSearchScreen";
import TextResults from "./src/screens/TextResults";
import Home from "./src/screens/Home";
const Tab = createBottomTabNavigator();
import SignInScreen from './src/screens/SignInScreen'; 
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home"
          options={{headerShown: false}}
        >
          {() => < Home  />}
        </Tab.Screen>
        <Tab.Screen name="Images">
          {() => <ImageSearchScreen  />}
        </Tab.Screen>
        <Tab.Screen name="Text">
          {() => <TextResults  />}
        </Tab.Screen>
          <Tab.Screen name="Sign IN">
          {() => <SignInScreen  />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
