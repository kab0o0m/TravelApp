// Import necessary modules
import BASE_URL from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const addExpense = async (expenseData) => {
  try {
    // Get the JWT token from AsyncStorage
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      throw new Error("User is not authenticated");
    }

    const response = await fetch(`${BASE_URL}/api/add-expenses`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData), // Send the expense data as JSON
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to add expense");
    }

    console.log("Expense added successfully:", result);
    return result;
  } catch (error) {
    console.error("Error adding expense:", error);
    throw new Error("An error occurred while adding the expense. Please try again.");
  }
};

export const fetchExpenses = async (userId) => {
    try {
      // Get the JWT token from AsyncStorage
      const token = await AsyncStorage.getItem("token");
  
      if (!token) {
        throw new Error("User is not authenticated");
      }

      const response = await fetch(`${BASE_URL}/api/get-expenses`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch expenses");
      }
  
      const result = await response.json();
      console.log("Fetched expenses:", result.expenses);
      return result.expenses;
    } catch (error) {
      console.error("Error fetching expenses:", error);
      throw new Error("An error occurred while fetching expenses. Please try again.");
    }
  };
  