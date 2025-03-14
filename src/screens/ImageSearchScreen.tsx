import React, { useState } from "react";
import { View, StyleSheet, Text, Image, Button, TouchableOpacity,Linking } from "react-native";
import SearchBar from "../components/SearchBar";
import { fetchImages } from "../utils/api";
import ImageGrid from "../components/ImageGrid";
import ImagePickerComponent from "../components/ImagePicker";
import RNFS from "react-native-fs";
import { WebView } from "react-native-webview";

const ImageSearchScreen = () => {
  const [imageResults, setImageResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [reverseSearchURL, setReverseSearchURL] = useState("");

  const handleSearch = async (query) => {
    console.log("📢 Searching for:", query);
    const results = await fetchImages(query);
    console.log("✅ API Response:", results);
    setImageResults(results);
  };

//   const handleReverseImageSearch = async (imageURI) => {
//     if (!imageURI) {
//       console.error("❌ No image selected for reverse search.");
//       return;
//     }

//     try {
//       console.log("📸 Converting Image to Base64...");
//       const base64Image = await RNFS.readFile(imageURI, "base64");

//       if (!base64Image) throw new Error("Failed to convert image to Base64.");

//       console.log("✅ Image converted successfully!");

//       // ✅ Using Google Lens instead of Google Reverse Image Search
//       const googleLensURL = "https://lens.google.com/upload";
//       setReverseSearchURL(googleLensURL);
//     } catch (error) {
//       console.error("❌ Reverse Image Search Error:", error);
//     }
	//   };
	
	const handleReverseImageSearch = async (imageURI) => {
  if (!imageURI) {
    console.error("❌ No image selected for reverse search.");
    return;
  }

  try {
    console.log("📸 Converting Image to Base64...");
    const base64Image = await RNFS.readFile(imageURI, "base64");

    if (!base64Image) throw new Error("Failed to convert image to Base64.");

    console.log("✅ Image converted successfully!");

    // ✅ Open Google Lens with Image
    const googleLensURL = `https://lens.google.com/uploadbyfile`;
    
    Linking.openURL(googleLensURL)
      .then(() => console.log("✅ Opened Google Lens Successfully"))
      .catch((err) => console.error("❌ Failed to open Google Lens:", err));

  } catch (error) {
    console.error("❌ Reverse Image Search Error:", error);
  }
};


  return (
    <View style={styles.container}>
      {/* 🔍 Search by Image Button */}
      <TouchableOpacity
        onPress={() => handleReverseImageSearch(selectedImage)}
        disabled={!selectedImage}
      >
        <Text style={styles.reverseSearchText}>🔍 Search by Image</Text>
      </TouchableOpacity>

      {/* 📸 Image Picker Component */}
      <ImagePickerComponent onImageSelected={setSelectedImage} />

      {/* ✅ Show selected image */}
      {selectedImage && (
        <>
          <Image source={{ uri: selectedImage }} style={styles.image} />
          <Text>Now Implement Reverse Search using this Image!</Text>
        </>
      )}

      {/* 🔍 Search Bar */}
      <SearchBar onSearch={handleSearch} onImageSelected={setSelectedImage} />

      {/* 🖼️ Image Results */}
      {imageResults.length === 0 ? (
        <Text style={styles.noResults}>No images found</Text>
      ) : (
        <ImageGrid images={imageResults} />
      )}

      {/* 🌍 WebView for Google Lens Search */}
      {reverseSearchURL !== "" && (
        <WebView
          source={{ uri: reverseSearchURL }}
          style={styles.webview}
          onLoad={() => console.log("✅ Google Lens Loaded")}
          onError={(e) => console.error("❌ WebView Error:", e)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  image: { width: 100, height: 100, margin: 5 },
  noResults: { fontSize: 20, textAlign: "center", marginTop: 20 },
  reverseSearchText: {
    fontSize: 18,
    color: "blue",
    textAlign: "center",
    marginBottom: 10,
  },
  webview: {
    flex: 1,
    marginTop: 10,
  },
});

export default ImageSearchScreen;
