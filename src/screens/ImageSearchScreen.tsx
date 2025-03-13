// import React, { useState } from "react";
// import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
// import SearchBar from '../components/SearchBar';
// import ImageGrid from '../components/ImageGrid';
// import { fetchImages } from "../utils/api"; // 🔥 Import API

// const ImageSearchScreen = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [imageResults, setImageResults] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async (query: string) => {
//     setSearchQuery(query);
//     setImageResults([]); // 🔄 Clear previous results
//     setLoading(true); // 🔄 Show loader

//     const images = await fetchImages(query);
//     setImageResults(images);
//     setLoading(false); // ✅ Hide loader
//   };

//   return (
//     <View style={styles.container}>
//       <SearchBar onSearch={handleSearch} />

//       {loading ? (
//         <ActivityIndicator size="large" color="#007AFF" />
//       ) : imageResults.length === 0 ? (
//         <Text style={styles.placeholder}>🔍 Search for Images</Text>
//       ) : (
//         <ImageGrid images={imageResults} />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 10 },
//   placeholder: { textAlign: "center", marginTop: 20, fontSize: 16, color: "#888" },
// });

// export default ImageSearchScreen;


// import React, { useState } from "react";
// import { View, Text, StyleSheet, FlatList, Linking } from "react-native";
// import SearchBar from "../components/SearchBar";

// const ImageSearch = () => {
//   const [searchResults, setSearchResults] = useState([]);

//   return (
//     <View style={styles.container}>
//       <SearchBar onSearch={(results) => setSearchResults(results)} />
//       <Text style={styles.resultsText}>Search Results:</Text>

//       {/* 🔥 Display Search Results (Clickable Links) */}
//       <FlatList
//         data={searchResults}
//         keyExtractor={(item) => item.position.toString()}
//         renderItem={({ item }) => (
//           <Text style={styles.link} onPress={() => Linking.openURL(item.link)}>
//             {item.title}
//           </Text>
//         )}
//       />
//     </View>
//   );
// };

// export default ImageSearch;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   resultsText: {
//     marginTop: 20,
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   link: {
//     color: "blue",
//     textDecorationLine: "underline",
//     marginVertical: 5,
//   },
// });


// import React, { useState } from "react";
// import { View, StyleSheet } from "react-native";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import SearchBar from "../components/SearchBar";
// import TextResults from "./TextResults";
// import ImageResults from "./ImageResults";

// const Tab = createMaterialTopTabNavigator();

// const ImageSearch = () => {
//   const [searchResults, setSearchResults] = useState([]);
//   const [imageResults, setImageResults] = useState([]);

//   return (
//     <View style={styles.container}>
//       {/* 🔥 Search Bar (Common for Both Tabs) */}
//       <SearchBar
//         onSearch={(textResults, imgResults) => {
//           setSearchResults(textResults);
//           setImageResults(imgResults);
//         }}
//       />

//       {/* 🔥 Tabs for Switching Between Image & Text Results */}
//       <Tab.Navigator
//         screenOptions={{
//           tabBarStyle: { backgroundColor: "#f8f8f8" }, // Light grey background
//           tabBarLabelStyle: { fontWeight: "bold" }, // Bold text
//         }}
//       >
//         <Tab.Screen name="Text Results">
//           {() => <TextResults searchResults={searchResults} />}
//         </Tab.Screen>
//         <Tab.Screen name="Image Results">
//           {() => <ImageResults imageResults={imageResults} />}
//         </Tab.Screen>
//       </Tab.Navigator>
//     </View>
//   );
// };

// export default ImageSearch;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 10,
//   },
// });

import React, { useEffect, useState } from "react";
import { View, FlatList, Image, StyleSheet, Text } from "react-native";
import SearchBar from "../components/SearchBar";
import { fetchImages } from "../utils/api";

const ImageSearchScreen = () => {
  const [imageResults, setImageResults] = useState([]);

  useEffect(() => {
    handleSearch("DSA"); // 🔥 Test with default query
  }, []);

  const handleSearch = async (query) => {
    console.log("📢 Searching for:", query); // 🔍 Check if function is running
    const results = await fetchImages(query);
    console.log("✅ API Response:", results); // 🔍 Log API response
    setImageResults(results);
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      {imageResults.length === 0 ? (
        <Text style={styles.noResults}>No images found</Text>
      ) : (
        <FlatList
          data={imageResults}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.image} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  image: { width: 100, height: 100, margin: 5 },
});

export default ImageSearchScreen;