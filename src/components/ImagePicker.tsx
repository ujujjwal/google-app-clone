import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import ImagePicker from "react-native-image-crop-picker";

const ImagePickerComponent = ({ onImageSelected }) => {
  
  const pickFromGallery = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true, // ✂️ Enable Cropping
      });
      onImageSelected(image.path);
    } catch (error) {
      console.log("Gallery Error:", error);
    }
  };

  const captureFromCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true, // ✂️ Enable Cropping
      });
      onImageSelected(image.path);
    } catch (error) {
      console.log("Camera Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Capture from Camera */}
      <TouchableOpacity style={styles.button} onPress={captureFromCamera}>
        <Text style={styles.buttonText}>📸 Capture Image</Text>
      </TouchableOpacity>

      {/* Pick from Gallery */}
      <TouchableOpacity style={styles.button} onPress={pickFromGallery}>
        <Text style={styles.buttonText}>🖼️ Pick from Gallery</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImagePickerComponent;

// 🔥 Styling
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
