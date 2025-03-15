import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Linking, StyleSheet } from "react-native";

const newsData = [
  {
    id: "1",
    title: "This superstar was Ratan Tata's closest friend, shared same room, went for picnics...",
    imageUrl: "https://picsum.photos/id/237/200/300",
    link: "https://www.businesstoday.in/visualstories/news/a-debt-forgiven-a-bond-forever-ratan-tatas-final-gesture-to-his-friend-shantanu-naidu-181961-25-10-2024",
  },
  {
    id: "2",
    title: "Tech giant unveils new AI features in latest update",
    imageUrl: "https://i.ibb.co/JkH9R7b/news2.jpg",
    link: "https://www.example.com/news2",
  },
  {
    id: "3",
    title: "Breaking: Major breakthrough in renewable energy sector",
    imageUrl: "https://i.ibb.co/8N2f5qd/news3.jpg",
    link: "https://www.example.com/news3",
  },
  {
    id: "4",
    title: "New discoveries in space exploration by NASA",
    imageUrl: "https://i.ibb.co/gz0qNVm/news4.jpg",
    link: "https://www.example.com/news4",
  },
];

const NewsComponent = () => {
  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("❌ Error opening link:", err));
  };

  return (
    <FlatList
      data={newsData}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => openLink(item.link)}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NewsComponent;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    backgroundColor: "#1f2125",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
    elevation: 3, // Shadow effect for Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  textContainer: {
    padding: 12,
  },
  title: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "500",
  },
});
