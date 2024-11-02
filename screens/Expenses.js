import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Alert, Animated, Easing, TouchableOpacity } from 'react-native';
import { useFonts, Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { Picker } from '@react-native-picker/picker'; 
import Button from "../components/Button"; 
import Footer from "../components/Footer"; 
import AddExpenseModal from './AddExpenseModal';
import * as Progress from 'react-native-progress';
import RoundedSquareIcon from '../components/RoundedSquareIcon';
import { fetchExpenses } from '../api/expensesAPI';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PieChart } from 'react-native-chart-kit'; // Import the PieChart
import SetBudgetModal from './SetBudgetModal'; // Import the SetBudgetModal

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Expenses = () => {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  const [selectedSortOption, setSelectedSortOption] = useState("date_latest");
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const [summaryVisible, setSummaryVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(0))[0];
  const [budgetModalVisible, setBudgetModalVisible] = useState(false); 

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        let storedUserData = await AsyncStorage.getItem("userData");
        if (!storedUserData) {
          console.log("Fetching user data...");
          storedUserData = await fetchUserData();
          await AsyncStorage.setItem("userData", JSON.stringify(storedUserData));
        }
        const userData = JSON.parse(storedUserData);
        setUserId(userData.user_id);
  
        const fetchedExpenses = await fetchExpenses(userData.user_id);
        setExpenses(fetchedExpenses);
  
        const total = fetchedExpenses.reduce((sum, expense) => sum + expense.price, 0);
        setTotalSpent(total);
      } catch (error) {
        console.error("Error loading expenses:", error);
        Alert.alert("Error", "Failed to load expenses. Please try again later.");
      }
    };
  
    loadExpenses();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
    setTotalSpent((prevTotal) => prevTotal + expense.price);
  };

  const toggleSummary = () => {
    setSummaryVisible(!summaryVisible);
    Animated.timing(slideAnim, {
      toValue: summaryVisible ? 0 : screenHeight * 0.4, // Moves white box further down
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const progress = budget ? totalSpent / budget : 0;

  // Dummy data for the pie chart
  const pieChartData = [
    {
      name: "Food",
      population: 215,
      color: "#F47966",
      legendFontColor: "#fff",
      legendFontSize: 15,
    },
    {
      name: "Transport",
      population: 130,
      color: "#61A4AB",
      legendFontColor: "#fff",
      legendFontSize: 15,
    },
    {
      name: "Entertainment",
      population: 80,
      color: "#FFFFFF",
      legendFontColor: "#fff",
      legendFontSize: 15,
    },
    {
      name: "Utilities",
      population: 95,
      color: "#FFBB00",
      legendFontColor: "#fff",
      legendFontSize: 15,
    },
  ];

  return (
    <View style={styles.container}>
  <View style={styles.headerContainer}>
    <Text style={styles.header}>EXPENSES</Text>
    <View style={styles.tripContainer}>
      <Text style={styles.tripText}>Sentosa</Text>
      <View style={styles.line} />
    </View>
  </View>

  <View style={styles.box}>
    <View style={styles.innerBox}>
      <Text style={styles.amount}>SGD {totalSpent.toFixed(2)}</Text>

      {budget === 0 ? (
        <TouchableOpacity onPress={() => setBudgetModalVisible(true)}>
          <Text style={styles.budgetText}>Set a budget</Text>
        </TouchableOpacity>
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
          <Text style={styles.progressText}>BUDGET: SGD {budget.toFixed(2)}</Text>
        </View>
      )}




          <Button
            title="View Summary"
            onPress={toggleSummary}
            backgroundColor="#006D77" 
            textColor="#FFFFFF"
            paddingVertical={screenHeight*0.001} 
            borderRadius={25}
            width={screenWidth * 0.45} 
            borderColor="#FFFFFF" 
            borderWidth={2} 
            height={screenHeight*0.055}
            fontSize={screenHeight*0.02}
          />
        </View>
      </View>

      {summaryVisible && (
        <View style={styles.pieChartContainer}>
          <PieChart
            data={pieChartData}
            width={screenWidth * 0.8}
            height={screenWidth * 0.5}
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              strokeWidth: 2,
              barPercentage: 0.5,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute // This prop is necessary for a pie chart to show correctly
          />
        </View>
      )}

      <Animated.View style={[styles.whiteBox, { transform: [{ translateY: slideAnim }] }]}>
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
          <Text style={styles.noExpenses}>You haven’t added any expenses yet.</Text>
        ) : (
          <ScrollView>
            {expenses.map((expense) => (
              <View key={expense.id} style={styles.expenseCard}>
                <View style={styles.expenseDetailsContainer}>
                  <RoundedSquareIcon 
                    iconName="cash-outline"
                    iconSize={screenHeight*0.03}
                    iconColor="#FFFFFF"
                    backgroundColor="#006D77"
                    size={screenHeight*0.07}
                  />
                  <View style={styles.expenseTextContainer}>
                    <View style={styles.expenseRow}>
                      <Text style={styles.expenseCategory}>{expense.category}</Text>
                      <Text style={styles.expensePrice}>SGD {expense.price.toFixed(2)}</Text>
                    </View>
                    <View style={styles.expenseRow}>
                      <Text style={styles.expenseTitle}>{expense.title}</Text>
                      <Text style={styles.expenseDate}>{expense.date}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </Animated.View>

      <View style={styles.footerContainer}>
        <View style={styles.buttonContainer}>
          <Button
            title="Add Expense"
            onPress={() => setModalVisible(true)}
            backgroundColor="#F47966"
            textColor="#FFFFFF"
            borderRadius={25}
            width={screenWidth * 0.5} 
            iconName="add"
            height={screenHeight*0.055}
            fontSize={screenHeight*0.02}
            paddingVertical={screenHeight*0.001} 
          />
        </View>
        <Footer />
      </View>

      <AddExpenseModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        onAdd={handleAddExpense} 
      />

      {/* SetBudgetModal implementation */}
      <SetBudgetModal 
        visible={budgetModalVisible} 
        onClose={() => setBudgetModalVisible(false)} 
        onSetBudget={setBudget} 
      />
    </View>
  );
};

export default Expenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: screenHeight * 0.075, 
  },

  headerContainer: {
    flexDirection: 'row', // Aligns the texts in a row
    alignItems: 'baseline', // Aligns the texts at their baselines
    justifyContent: 'space-between', // Space between EXPENSES and Sentosa
    marginBottom: 10, // Adjust margin for spacing below the header
    paddingHorizontal: screenWidth * 0.05, // Added for uniform padding
  },
  header: {
    fontSize: screenHeight * 0.03,
    fontFamily: 'Nunito_700Bold',
    color: '#006D77',
  },
  tripText: {
    fontSize: screenHeight * 0.025, // Adjusted size for better balance with header
    fontWeight: 'bold',
    marginBottom: 2, // Adjust bottom margin if needed
  },
  tripContainer: {
    alignItems: 'center', // Center align Sentosa text and line
  },
  line: {
    width: '100%', // Full width of the parent
    height: 2, // Height of the line
    backgroundColor: '#F47966', // Line color
  },
  box: {
    width: '100%', 
    height: screenHeight * 0.8, 
    backgroundColor: '#006D77', 
    borderTopLeftRadius: screenWidth * 0.05, 
    borderTopRightRadius: screenWidth * 0.05, 
    alignItems: 'center', 
    position: 'relative', 
  },
  innerBox: {
    alignItems: 'center', 
    marginTop: screenHeight * 0.025, 
  },
  amount: {
    fontSize: screenHeight * 0.035, 
    fontFamily: 'Nunito_700Bold', 
    color: '#FFF', 
  },
  budgetText: {
    fontSize: screenHeight * 0.025, 
    fontFamily: 'Nunito_400Regular', 
    color: '#FFF', 
    marginTop: screenHeight * 0.01, 
    marginBottom: screenHeight * 0.005,
  },
  progressContainer: {
    alignItems: 'center', 
    marginVertical: screenHeight * 0.02,
  },
  progressText: {
    fontSize: screenHeight * 0.02,
    fontFamily: 'Nunito_400Regular',
    color: '#FFF',
    marginTop: screenHeight * 0.01,
  },
  whiteBox: {
    position: 'absolute', 
    top: screenHeight * 0.4, 
    left: 0,
    right: 0,
    paddingHorizontal: screenWidth * 0.05,
    paddingTop: screenHeight * 0.02,
    paddingBottom: screenHeight * 0.1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: screenWidth * 0.07,
    borderTopRightRadius: screenWidth * 0.07,
    height: screenHeight * 0.625,
  },
  topLeftText: {
    fontSize: screenHeight * 0.02,
    fontFamily: 'Nunito_700Bold',
    color: '#333',
    marginBottom: screenHeight * 0.02,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: screenHeight * 0.015,
  },
  sortText: {
    fontSize: screenHeight * 0.02,
    fontFamily: 'Nunito_400Regular',
    color: '#333',
    marginRight: screenWidth * 0.02,
  },
  picker: {
    height: screenHeight * 0.05,
    width: screenWidth * 0.5,
  },
  noExpenses: {
    fontSize: screenHeight * 0.02,
    fontFamily: 'Nunito_400Regular',
    color: '#888',
    textAlign: 'center',
    marginTop: screenHeight * 0.1,
  },
  expenseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: screenHeight * 0.015,
    paddingHorizontal: screenWidth * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  expenseDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expenseTextContainer: {
    flex: 1,
    marginLeft: screenWidth * 0.02,
  },
  expenseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expenseCategory: {
    fontSize: screenHeight * 0.02,
    fontFamily: 'Nunito_700Bold',
    color: '#333',
  },
  expensePrice: {
    fontSize: screenHeight * 0.02,
    fontFamily: 'Nunito_700Bold',
    color: '#333',
  },
  expenseTitle: {
    fontSize: screenHeight * 0.018,
    fontFamily: 'Nunito_400Regular',
    color: '#666',
  },
  expenseDate: {
    fontSize: screenHeight * 0.018,
    fontFamily: 'Nunito_400Regular',
    color: '#666',
  },
  pieChartContainer: {
    position: 'absolute',
    top: screenHeight * 0.4, // Position below the "View Summary" button
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: screenHeight * 0.02,
  },
  pieChartPlaceholder: {
    fontSize: screenHeight * 0.02,
    color: '#333',
    backgroundColor: '#eee',
    width: screenWidth * 0.6,
    height: screenWidth * 0.6,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: screenWidth * 0.3,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  buttonContainer: {
    marginVertical: screenHeight * 0.01,
  },
 
});
