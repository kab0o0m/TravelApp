import BASE_URL from "../config";

// Function to request password reset
export const requestPasswordReset = async (email) => {
  try {
    // Prepare the data object to be sent in the request body
    const data = {
      email: email,
    };

    // Send the POST request using fetch to request a password reset
    const response = await fetch(`${BASE_URL}/api/request-password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Send the email as JSON
    });

    // Parse the response
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Password reset request failed");
    }

    console.log("Password reset request successful:", result);
    return result;
  } catch (error) {
    console.error("Error requesting password reset:", error.message);
    throw new Error("An error occurred during the password reset request. Please try again.");
  }
};
