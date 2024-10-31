import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold,
  Nunito_900Black,
} from "@expo-google-fonts/nunito";
import { Picker } from "@react-native-picker/picker";
import Button from "../components/Button";
import Footer from "../components/Footer";
import AddExpenseModal from "./AddExpenseModal";
import * as Progress from "react-native-progress";
import RoundedSquareIcon from "../components/RoundedSquareIcon";
import { fetchExpenses } from "../api/expensesAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchUserData } from "../api/authAPI";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Expenses = () => {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_900Black,
  });

  const [selectedSortOption, setSelectedSortOption] = useState("date_latest");
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(500);
  const [totalSpent, setTotalSpent] = useState(2);
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  // const [expenses, setExpenses] = useState([
  //   { id: 1, category: 'Food', title: 'Lunch', price: 30, date: '25 May 2024' },
  //   { id: 2, category: 'Transport', title: 'Taxi', price: 20, date: '24 May 2024' },
  //   { id: 3, category: 'Shopping', title: 'Groceries', price: 50, date: '23 May 2024' },
  // ]);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        if (!storedUserData) {
          console.log("Fetching user data...");
          storedUserData = await fetchUserData();
          await AsyncStorage.setItem(
            "userData",
            JSON.stringify(storedUserData)
          );
        }
        const userData = JSON.parse(storedUserData);
        setUserId(userData.id);
        const fetchedExpenses = await fetchExpenses(userData.id);
        setExpenses(fetchedExpenses);

        // Calculate the total spent amount
        const total = fetchedExpenses.reduce(
          (sum, expense) => sum + expense.amount,
          0
        );
        setTotalSpent(total);
      } catch (error) {
        console.error("Error loading expenses:", error);
        Alert.alert(
          "Error",
          "Failed to load expenses. Please try again later."
        );
      }
    };

    loadExpenses();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
    setTotalSpent((prevTotal) => prevTotal + expense.amount);
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);

    if (isNaN(date.getTime())) {
        return "Invalid Date"; // Return placeholder if date is invalid
    }

    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const progress = budget && budget > 0 ? totalSpent / budget : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>EXPENSES</Text>

      <View style={styles.box}>
        <View style={styles.innerBox}>
          {/* <Text style={styles.amount}>SGD {totalSpent.toFixed(2)}</Text> */}
          <Text style={styles.amount}>SGD {totalSpent.toFixed(2)}</Text>

          {budget === null ? (
            <Text style={styles.budgetText}>Set a budget</Text>
          ) : (
            <View style={styles.progressContainer}>
              <Progress.Bar
                progress={progress}
                width={screenWidth * 0.8}
                color="#F47966"
                unfilledColor="#61A4AB"
                height={screenHeight * 0.01}
                borderWidth={0}
              />
              <Text style={styles.progressText}>
                {/* BUDGET: SGD {budget.toFixed(2)} */}
                BUDGET: SGD {budget}
              </Text>
            </View>
          )}

          <Button
            title="View Summary"
            onPress={null}
            backgroundColor="#006D77"
            textColor="#FFFFFF"
            paddingVertical={screenHeight * 0.001}
            borderRadius={25}
            width={screenWidth * 0.45}
            borderColor="#FFFFFF"
            borderWidth={2}
            height={screenHeight * 0.055}
            fontSize={screenHeight * 0.02}
          />
        </View>
      </View>

      <View style={styles.whiteBox}>
        <Text style={styles.topLeftText}>Your Expenses</Text>

        <View style={styles.sortContainer}>
          <Text style={styles.sortText}>Sort:</Text>
          <Picker
            selectedValue={selectedSortOption}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedSortOption(itemValue)}
          >
            <Picker.Item label="Date (Oldest First)" value="date_oldest" />
            <Picker.Item label="Date (Latest First)" value="date_latest" />
          </Picker>
        </View>

        {expenses.length === 0 ? (
          <Text style={styles.noExpenses}>
            You haven’t added any expenses yet.
          </Text>
        ) : (
          <ScrollView>
            {expenses.map((expense) => (
              <View key={expense.id} style={styles.expenseCard}>
                <View style={styles.expenseDetailsContainer}>
                  <RoundedSquareIcon
                    iconName="cash-outline"
                    iconSize={screenHeight * 0.03}
                    iconColor="#FFFFFF"
                    backgroundColor="#006D77"
                    size={screenHeight * 0.07}
                  />
                  <View style={styles.expenseTextContainer}>
                    <View style={styles.expenseRow}>
                      <Text style={styles.expenseCategory}>
                        {expense.category}
                      </Text>
                      <Text style={styles.expensePrice}>
                        $ {expense.amount}
                      </Text>
                    </View>
                    <View style={styles.expenseRow}>
                      <Text style={styles.expenseDate}>{formatDate(expense.date)}</Text>
                      <Text style={styles.expenseTitle}>
                        {expense.payment_type}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>

      <View style={styles.footerContainer}>
        <View style={styles.buttonContainer}>
          <Button
            title="Add Expense"
            onPress={() => setModalVisible(true)}
            backgroundColor="#F47966"
            textColor="#FFFFFF"
            paddingVertical={10}
            borderRadius={25}
            width={screenWidth * 0.5}
            iconName="add"
          />
        </View>
        <Footer />
      </View>

      <AddExpenseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddExpense}
      />
    </View>
  );
};

export default Expenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: screenHeight * 0.075,
  },
  header: {
    fontSize: screenHeight * 0.03,
    fontFamily: "Nunito_900Black",
    color: "#006D77",
    marginBottom: screenHeight * 0.02,
    marginLeft: screenWidth * 0.05,
    marginRight: screenWidth * 0.05,
  },
  box: {
    width: "100%",
    height: screenHeight * 0.5,
    backgroundColor: "#006D77",
    borderTopLeftRadius: screenWidth * 0.05,
    borderTopRightRadius: screenWidth * 0.05,
    alignItems: "center",
    position: "relative",
  },
  innerBox: {
    alignItems: "center",
    marginTop: screenHeight * 0.025,
  },
  amount: {
    fontSize: screenHeight * 0.035,
    fontFamily: "Nunito_700Bold",
    color: "#FFF",
  },
  budgetText: {
    fontSize: screenHeight * 0.025,
    fontFamily: "Nunito_400Regular",
    color: "#FFF",
    marginTop: screenHeight * 0.01,
    marginBottom: screenHeight * 0.005,
  },
  progressContainer: {
    alignItems: "center",
    marginVertical: screenHeight * 0.02,
  },
  progressText: {
    fontSize: screenHeight * 0.02,
    fontFamily: "Nunito_400Regular",
    color: "#FFF",
    marginTop: screenHeight * 0.01,
  },
  whiteBox: {
    position: "absolute",
    top: screenHeight * 0.375,
    left: 0,
    right: 0,
    paddingHorizontal: screenWidth * 0.05,
    paddingTop: screenHeight * 0.03,
    height: screenHeight * 0.475,
    backgroundColor: "#FCF7F7",
    borderTopLeftRadius: screenWidth * 0.05,
    borderTopRightRadius: screenWidth * 0.05,
  },
  topLeftText: {
    fontSize: screenHeight * 0.03,
    fontFamily: "Nunito_700Bold",
    color: "#000",
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortText: {
    fontSize: screenHeight * 0.025,
    fontFamily: "Nunito_700Bold",
    color: "#000",
    marginRight: screenWidth * 0.01,
  },
  picker: {
    height: screenHeight * 0.025,
    width: screenWidth * 0.6,
  },
  noExpenses: {
    fontSize: screenHeight * 0.0225,
    fontFamily: "Nunito_400Regular",
    color: "#879192",
    marginTop: screenHeight * 0.02,
  },
  buttonContainer: {
    bottom: screenHeight * 0.025,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  expenseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: screenHeight * 0.02,
    marginVertical: screenHeight * 0.01,
    width: "100%",
    elevation: 3, // Add shadow effect for Android
  },
  expenseCategory: {
    fontSize: screenHeight * 0.025,
    fontFamily: "Nunito_700Bold",
  },
  expenseTitle: {
    fontSize: screenHeight * 0.02,
    fontFamily: "Nunito_400Regular",
  },
  expensePrice: {
    fontSize: screenHeight * 0.025,
    fontFamily: "Nunito_700Bold",
  },
  expenseDetailsContainer: {
    flexDirection: "row", // Align items in a row
    alignItems: "center", // Center vertically
  },
  expenseTextContainer: {
    marginLeft: screenWidth * 0.04, // Space between icon and text
    width: screenWidth * 0.625,
  },
  expenseRow: {
    flexDirection: "row", // Align items in a row
    justifyContent: "space-between", // Space between items
    alignItems: "center", // Center vertically
    marginVertical: screenHeight * 0.005, // Space between rows
  },
  expenseDate: {
    fontSize: screenHeight * 0.02,
    fontFamily: "Nunito_400Regular",
  },
});
