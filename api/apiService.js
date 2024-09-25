// Base URL for your API
const API_URL = 'http://10.0.2.2:3000';

// Function to login using fetch
export const loginUser = async (email, password) => {
  try {
    
    // Prepare the data object to be sent in the body
    const data = {
      email: email,
      password: password,
    };

    // Send the POST request using fetch
    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),  // Send the email and password as JSON
    });

    // Parse the response
    const result = await response.json();

    if (response.ok) {
      // If login is successful, return the user data
      console.log("Login successful:", result);
      return result;  // Return the result (user data)
    } else {
      // If there was an error, throw an error with the response message
      console.error("Login failed:", result.message);
      throw new Error(result.message || "Login failed");
    }
  } catch (error) {
    console.error('Error logging in:', error.message);
    throw new Error("An error occurred during login. Please try again.");
  }
};
