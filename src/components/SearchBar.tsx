import React, { useState } from "react";
import { View, TextInput, StyleSheet ,SafeAreaView} from "react-native";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearchChange = async (text) => {
    setQuery(text);
    if (text.length > 1) {
      onSearch(text);
    }
  };

	return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={query}
        onChangeText={handleSearchChange}
      />
		</View>
  );
};

const styles = StyleSheet.create({
  container: { margin: 10 },
  input: { height: 40, borderWidth: 1, borderColor: "#ccc", paddingHorizontal: 10, borderRadius: 5 },
});

export default SearchBar;