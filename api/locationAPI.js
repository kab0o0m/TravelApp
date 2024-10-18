// Import BASE_URL from config
import BASE_URL from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchLocations = async () => {
  try {
    // Send the POST request using fetch
    const response = await fetch(`${BASE_URL}/api/get-locations`);

    const result = await response.json();
    
    return result.data;
  } catch (error) {
    console.error("[API] Error fetching locations:", error);
  }
};
