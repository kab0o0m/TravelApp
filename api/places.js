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

export const getPlacePhotoByPlaceId = async (placeId) => {
  try {

    const detailsUrl = `${BASE_URL}/api/place-details?place_id=${placeId}`;

    const response = await fetch(detailsUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch place details");
    }

    const placeDetails = await response.json();

    const photoReference = placeDetails.photos?.[0]?.photo_reference;
    if (!photoReference) {
      console.warn("No photo reference found for placeId:", placeId);
      return null;
    }

    const photoUrl = `${BASE_URL}/api/place-photo?photo_reference=${photoReference}&maxwidth=400`;
    return photoUrl;
  } catch (error) {
    console.error("Error fetching place photo:", error);
    throw new Error("An error occurred while fetching the place photo. Please try again.");
  }
};

export const deleteTripById = async (tripId) => {
  try {
    console.log("tripid: ", tripId)
    const deleteUrl = `${BASE_URL}/api/trips/${tripId}`;

    const response = await fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete the trip");
    }

    console.log("Trip deleted successfully:", tripId);
    return true; // Indicate success
  } catch (error) {
    console.error("Error deleting trip:", error);
    throw new Error("An error occurred while deleting the trip. Please try again.");
  }
};

