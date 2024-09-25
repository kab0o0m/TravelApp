// Import BASE_URL from config
import BASE_URL from "../config";

// Function to login using fetch
export const loginUser = async (email, password) => {
  try {
    // Prepare the data object to be sent in the body
    const data = {
      email: email,
      password: password,
    };

    // Send the POST request using fetch
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Send the email and password as JSON
    });

    // Parse the response
    const result = await response.json();

    if (response.ok) {
      // If login is successful, return the user data
      console.log("Login successful:", result);
      return result; // Return the result (user data)
    } else {
      // If there was an error, throw an error with the response message
      console.error("Login failed:", result.message);
      throw new Error(result.message || "Login failed");
    }
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw new Error("An error occurred during login. Please try again.");
  }
};

export const signup = async (firstname, lastname, email, password) => {
  try {
    // Prepare the data to send in the POST request
    const data = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: password,
    };

    // Send the POST request to the API
    const response = await fetch(`${BASE_URL}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      // If the request was successful, navigate to the login page or another screen
      console.log("Registration successful:", result);
      return result;
    } else {
      // If there was an error, display the error message from the response
      console.log("Registation failed:", result.message);
      throw new Error(result.message || "Registration failed");
    }
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw new Error("An error occurred during registration. Please try again.");
  }
};
