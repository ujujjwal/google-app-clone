import React, { useState } from "react";
import { View, StyleSheet, Text, Image, Button, TouchableOpacity, Linking,SafeAreaView } from "react-native";
import ImageSearchScreen from "./ImageSearchScreen";
const Home = () => { 
	return (
		<SafeAreaView style={{flex:1,padding:16,backgroundColor:"#1f2125"}}>
			<View style={{flexDirection:"row",justifyContent:"space-between",padding:10}}>
				<Image
				source={require('../assets/icons/labIcon.png')}
				style={{width: 30, height: 30}}
				/>
				<Image
				source={require('../assets/icons/labIcon.png')}
				style={{width: 30, height: 30,alignSelf:"flex-end"}}
				/>
			</View>

			<View>
				<Image
				source={require('../assets/icons/googleLogo.png')}
				style={{width: 100, height: 100,alignSelf:"center",resizeMode:"contain"}}
				/>
			</View>

			<ImageSearchScreen />

		</SafeAreaView>
	);

}

export default Home;