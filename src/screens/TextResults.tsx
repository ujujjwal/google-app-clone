import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Linking, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
import { fetchGoogleResults } from "../utils/api";

const TextResults = () => {
  const [textResults, setTextResults] = useState([]);

  useEffect(() => {
    handleSearch(""); // 🔥 Test with default query
  }, []);

  const handleSearch = async (query) => {
    const results = await fetchGoogleResults(query);
    setTextResults(results);
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      {textResults.length === 0 ? (
        <Text style={styles.noResults}>No results found</Text>
      ) : (
        <FlatList
          data={textResults}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.link} onPress={() => Linking.openURL(item.link)}>
              {item.title}
            </Text>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  link: { color: "blue", textDecorationLine: "underline", marginVertical: 5 },
});

export default TextResults;