
const GOOGLE_API_KEY = "AIzaSyBGhvb7XwvH3iSZeX7Sgc2fGemfX6uo05M"; 
const SEARCH_ENGINE_ID = "d5ed10f8baedc4c47";
const SERPAPI_KEY='5acbb957e073b913b3983df299d4f1ac2ab3cf0efccf3ae52d9f270b81d47691'

export const fetchImages = async (query) => {
  try {
    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${SEARCH_ENGINE_ID}&searchType=image&key=${GOOGLE_API_KEY}`;
    const response = await fetch(url);
    const json = await response.json();
    
    console.log("🔍 Image API Response:", JSON.stringify(json, null, 2)); // 🛠️ Debugging

    return json.items ? json.items.map((item) => item.link) : [];
  } catch (error) {
    console.error("❌ Image Fetch Error:", error);
    return [];
  }
};

export const fetchGoogleResults = async (query) => {
  try {
    const url = `https://serpapi.com/search.json?q=${query}&hl=en&gl=us&api_key=${SERPAPI_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    
    console.log("🔍 Text API Response:", JSON.stringify(data, null, 2)); // 🛠️ Debugging

    return data["organic_results"] || [];
  } catch (error) {
    console.error("❌ Text Fetch Error:", error);
    return [];
  }
};
