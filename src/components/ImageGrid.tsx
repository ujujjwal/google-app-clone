import React from "react";
import { View, Image, FlatList, StyleSheet } from "react-native";

const ImageGrid = ({ images }: { images: string[] }) => {
  return (
    <FlatList
      data={images}
      numColumns={2} // ✅ Display images in a 2-column grid
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.imageContainer}>
          <Image source={{ uri: item }} style={styles.image} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  imageContainer: { flex: 1, margin: 5 },
  image: { width: "100%", height: 150, borderRadius: 10 },
});

export default ImageGrid;
