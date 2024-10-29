import BASE_URL from "../config";

// Function to request location id
export const fetchWeatherData = async (latitude, longitude) => {
  try {
    // Prepare the data object to be sent in the request body
    const data = {
      latitude: latitude,
      longitude: longitude,
    };

    // Send the POST request using fetch to the weather API
    const response = await fetch(`${BASE_URL}/api/forecast`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Send the latitude and longitude as JSON
    });

    // Parse the response
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Weather forecast request failed");
    }

    console.log("Weather forecast request request successful:", result);
    return result;
  } catch (error) {
    console.error("Error fetching weather forecast:", error.message);
    throw new Error(
      "An error occurred while fetching the weather forecast. Please try again."
    );
  }
};
