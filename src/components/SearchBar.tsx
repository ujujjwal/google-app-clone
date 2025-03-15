import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
	StyleSheet,
  Image
} from "react-native";
import { fetchGoogleSuggestions } from "../utils/api";
import ImagePicker from "react-native-image-crop-picker";


const SearchBar = ({ onSearch,onImageSelected }: { onSearch: (query: string) => void, }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // 🔥 Handle Input Change & Fetch Suggestions
  const handleSearchChange = async (text: string) => {
    setQuery(text);
    if (text.length > 1) {
      const results = await fetchGoogleSuggestions(text);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };
	
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


  // 🔥 Handle Suggestion Click
  const handleSuggestionPress = (suggestion: string) => {
    setQuery(suggestion);
    setSuggestions([]); // Hide suggestions after selection
    onSearch(suggestion); // Trigger search
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        {/* 🔍 Search Icon */}
       				<Image
					source={require('../assets/icons/search.png')}
					style={{width: 20, height: 20,tintColor:"#414548",marginRight: 8}}
					/>

        {/* 🔤 Input Field */}
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor="#414548"
          value={query}
          onChangeText={handleSearchChange}
        />

        {/* 🎤 Voice Search Icon */}
        <TouchableOpacity onPress={() => console.log("Voice Search Triggered")} style={styles.iconButton}>
         				<Image
						source={require('../assets/icons/mic.png')}
						style={{width: 20, height: 20,tintColor:"#fff"}}
						/>
        </TouchableOpacity>

        {/* 📷 Image Search Icon */}
        <TouchableOpacity onPress={captureFromCamera} style={styles.iconButton}>
         				<Image
						source={require('../assets/icons/camera.png')}
						style={{width: 25, height: 25,resizeMode:"contain"}}
						/>
        </TouchableOpacity>
      </View>

      {/* 🔥 Search Suggestions List */}
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item, index) => index.toString()}
          style={styles.suggestionsContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => handleSuggestionPress(item)}
            >
              <Text style={{ color: "#fff" }}>{item}</Text>
            </TouchableOpacity>
          )}
        />
		  )}
		  
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
			  <TouchableOpacity
				  onPress={pickFromGallery}
            style={{...styles.searchBubbles, backgroundColor: '#4e4531'}}>
            <Image
              source={require('../assets/icons/imageSearch.png')}
              style={styles.iconStyle}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{...styles.searchBubbles, backgroundColor: '#363f4e'}}>
            <Image
              source={require('../assets/icons/languageTranslate.png')}
              style={styles.iconStyle}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{...styles.searchBubbles, backgroundColor: '#33432a'}}>
            <Image
              source={require('../assets/icons/googleLens.png')}
              style={styles.iconStyle}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{...styles.searchBubbles, backgroundColor: '#493034'}}>
            <Image
              source={require('../assets/icons/music.png')}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default SearchBar;

// 🔥 Styling
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2f3133",
    borderRadius: 40,
    paddingHorizontal: 10,
    height: 50,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
  },
  iconButton: {
    padding: 8,
  },
  suggestionsContainer: {
    backgroundColor: "#333",
    marginTop: 5,
    borderRadius: 5,
    elevation: 2,
    maxHeight: 150,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
	},
    searchBubbles: {
    paddingHorizontal: 25,
    backgroundColor: 'red',
    borderRadius: 13,
    paddingVertical: 10,
    flex: 1,
		marginHorizontal: 6,
	marginTop: 10,
  },
  iconStyle: {width: 30, height: 30},
});
