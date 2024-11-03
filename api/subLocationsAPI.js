// Import BASE_URL from config and fetchWithTimeout utility
import BASE_URL from "../config";

const fetchWithTimeout = (url, options, timeout = 3000) => {
    // Create a timeout promise that rejects after the specified time
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    );
  
    // Race the fetch request against the timeout promise
    return Promise.race([fetch(url, options), timeoutPromise]);
  };

export const fetchSublocationsByLocationId = async (location_id) => {
  try {
    const response = await fetchWithTimeout(`${BASE_URL}/api/sublocations/${location_id}`);

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const result = await response.json();
    return result; // Assuming result is an array of sublocations
  } catch (error) {
    console.error("[API] Error fetching sublocations:", error);
    throw error; // Re-throw to handle in calling component
  }
};

export default {
  fetchSublocationsByLocationId,
};
