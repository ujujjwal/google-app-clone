import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import SearchBar from '../components/SearchBar';
import { fetchImages } from '../utils/api';
import ImageGrid from '../components/ImageGrid';
const ImageSearchScreen = () => {
  const [imageResults, setImageResults] = useState([]);

  useEffect(() => {
    handleSearch(""); // 🔥 Test with default query
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
		  <ImageGrid images={imageResults} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
	image: { width: 100, height: 100, margin: 5 },
  noResults:{fontSize: 20, textAlign: 'center', marginTop: 20}
});

export default ImageSearchScreen;