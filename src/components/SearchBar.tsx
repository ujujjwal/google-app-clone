import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { fetchGoogleSuggestions } from "../utils/api";


const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
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

  // 🔥 Handle Suggestion Click
  const handleSuggestionPress = (suggestion: string) => {
    setQuery(suggestion);
    setSuggestions([]); // Hide suggestions after selection
    onSearch(suggestion); // Trigger search
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={query}
        onChangeText={handleSearchChange}
      />

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
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default SearchBar;

// 🔥 Styling
const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  suggestionsContainer: {
    backgroundColor: "#fff",
    marginTop: 5,
    borderRadius: 5,
    elevation: 2,
    maxHeight: 150,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
