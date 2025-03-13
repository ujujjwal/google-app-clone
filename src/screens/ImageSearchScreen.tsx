import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text ,Image} from "react-native";
import SearchBar from '../components/SearchBar';
import { fetchImages } from '../utils/api';
import ImageGrid from '../components/ImageGrid';
import ImagePickerComponent from "../components/ImagePicker";

const ImageSearchScreen = () => {
  const [imageResults, setImageResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

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
		  <ImagePickerComponent onImageSelected={setSelectedImage} />
		        {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
      
      {selectedImage && <Text>Now Implement Reverse Search using this Image!</Text>}
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