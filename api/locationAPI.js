// Import BASE_URL from config
import BASE_URL from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchWithTimeout = (url, options, timeout = 3000) => {
  // Create a timeout promise that rejects after the specified time
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timed out")), timeout)
  );

  // Race the fetch request against the timeout promise
  return Promise.race([fetch(url, options), timeoutPromise]);
};

export const fetchLocations = async () => {
  try {
    // Send the POST request using fetch
    const response = await fetchWithTimeout(`${BASE_URL}/api/get-locations`);

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const result = await response.json();

    return result.locations;
  } catch (error) {
    console.error("[API] Error fetching locations:", error);
    throw error;
  }
};

export const fetchSavedLocations = async (user_id) => {
  try {
    // Send the POST request with the user_id in the request body
    const response = await fetchWithTimeout(`${BASE_URL}/api/get-saved-locations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user_id }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    

    const result = await response.json();

    return result.savedLocations; // Assuming saved locations are under "saved-locations"

  } catch (error) {
    console.error("[API] Error fetching saved locations:", error);
    throw error;
  }
};

export const removeSavedLocation = async (user_id, location_id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/remove-saved-location`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, location_id }), // Send the saved_location ID
    });

    if (!response.ok) {
      throw new Error(`Failed to remove saved location: ${response.status}`);
    }
  } catch (error) {
    console.error("Error removing saved location:", error);
    throw error;
  }
};


export const addSavedLocation = async (user_id, location_id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/add-saved-location`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, location_id }), // Send user_id and location_id
    });

    if (!response.ok) {
      throw new Error(`Failed to add saved location: ${response.status}`);
    }
  } catch (error) {
    console.error("Error adding saved location:", error);
    throw error; // Re-throw error to handle it in the calling function
  }
};