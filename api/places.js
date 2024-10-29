import axios from "axios";
import BASE_URL from "../config";

// Function to search places by text using the backend endpoint
export const searchPlacesByText = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/places`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching place details:", error);
    throw new Error("Failed to fetch place details");
  }
};
