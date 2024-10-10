import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useFonts, Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { Picker } from '@react-native-picker/picker'; // Import Picker for dropdown
import Button from "../components/Button"; // Import the Button component

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Expenses = () => {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  const [selectedSortOption, setSelectedSortOption] = useState("date_latest"); // State to track selected sort option

  if (!fontsLoaded) {
    return null; // Add a loading spinner or screen here if needed
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>EXPENSES</Text>

      {/* Rectangular Box (Green) */}
      <View style={styles.box}>
        <View style={styles.innerBox}>
          <Text style={styles.amount}>SGD 0.00</Text>
          <Text style={styles.budgetText}>Set a budget</Text>
          <Button
            title="View Summary"
            onPress={null}
            backgroundColor="#006D77" // Same as box color
            textColor="#FFFFFF"
            paddingVertical={8} // Lesser padding
            borderRadius={25}
            width={screenWidth * 0.45} // Wider button width (80% of screen width)
            borderColor="#FFFFFF" // White border color
            borderWidth={2} // Thicker border
          />
        </View>
      </View>

      {/* Overlay Rectangular Box (White) */}
      <View style={styles.whiteBox}>
        {/* "Your Expenses" text in top left-hand corner */}
        <Text style={styles.topLeftText}>Your Expenses</Text>

        {/* Sort Text and Dropdown */}
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

        <Text style={styles.noExpenses}>You haven’t added any expenses yet.</Text>

        <View style={styles.buttonContainer}>
        <Button
            title="Add Expense"
            onPress={null}
            backgroundColor="#F47966"
            textColor="#FFFFFF"
            paddingVertical={10}
            borderRadius={25}
            width={screenWidth * 0.5} 
            iconName="add"
        />
        </View>

      </View>
    </View>
  );
};

export default Expenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: screenHeight * 0.05, // Dynamic top padding
  },
  header: {
    fontSize: screenHeight * 0.03, // Dynamic font size
    fontFamily: 'Nunito_700Bold', // App font
    color: '#006D77', // Font color
    marginBottom: screenHeight * 0.02, // Space between header and box
    marginLeft: screenWidth * 0.05, // Add margin for the header
    marginRight: screenWidth * 0.05, // Add margin for the header
  },
  box: {
    width: '100%', // Full width
    height: screenHeight * 0.5, // Dynamic height based on screen size
    backgroundColor: '#006D77', // Same color as the "EXPENSES" text
    borderTopLeftRadius: screenWidth * 0.05, // Dynamic rounded top-left corner
    borderTopRightRadius: screenWidth * 0.05, // Dynamic rounded top-right corner
    borderBottomLeftRadius: 0, // No rounding for bottom-left
    borderBottomRightRadius: 0, // No rounding for bottom-right
    alignItems: 'center', // Center items horizontally
    position: 'relative', // Set position to relative for positioning white box
  },
  innerBox: {
    alignItems: 'center', // Center text horizontally
    marginTop: screenHeight * 0.025, // Remove top margin (no padding at the top)
  },
  amount: {
    fontSize: screenHeight * 0.04, // Larger dynamic font size for amount
    fontFamily: 'Nunito_700Bold', // Bold font for the amount
    color: '#FFF', // White color for text
  },
  budgetText: {
    fontSize: screenHeight * 0.025, // Smaller dynamic font size for budget text
    fontFamily: 'Nunito_400Regular', // Regular font for the budget text
    color: '#FFF', // White color for text
    marginTop: screenHeight * 0.01, // Space between amount and budget text
    marginBottom: screenHeight*0.005,
  },
  whiteBox: {
    position: 'absolute', // Positioning it absolutely to overlap
    top: screenHeight * 0.35, // Adjust this value as needed for overlay position
    left: 0,
    right: 0,
    paddingHorizontal: screenWidth * 0.05,
    paddingTop: screenHeight * 0.03, // Reduced top padding to make the space smaller
    height: screenHeight * 0.65, // Dynamic height for the white box
    backgroundColor: '#FCF7F7', // White background
    borderTopLeftRadius: screenWidth * 0.05, // Rounded top corners
    borderTopRightRadius: screenWidth * 0.05, // Rounded top corners
  },
  topLeftText: {
    fontSize: screenHeight * 0.03, // Font size for the "Your Expenses" text
    fontFamily: 'Nunito_700Bold', // Bold font
    color: '#000', // Black text
  },
  sortContainer: {
    flexDirection: 'row', // Align the text and picker in a row
    alignItems: 'center', // Center vertically within the row
  },
  sortText: {
    fontSize: screenHeight * 0.025, // Font size for "Sort:" text
    fontFamily: 'Nunito_700Bold', // Regular font
    color: '#000', // Black text color
    marginRight: screenWidth * 0.01, // Space between "Sort:" and the dropdown
  },
  picker: {
    height: screenHeight * 0.025, // Adjust height of the dropdown
    width: screenWidth * 0.6, // Width of the picker dropdown
  },
  noExpenses: {
    fontSize: screenHeight * 0.0225, // Font size for "No Expenses" text
    fontFamily: 'Nunito_400Regular', // Regular font
    color: '#879192', // Grey text color
    marginTop: screenHeight * 0.02, // Space after the picker
  },
  buttonContainer: {
    position: 'absolute',
    bottom: screenHeight * 0.03, // Adjust bottom margin as needed
    left: 0,
    right: 0,
    alignItems: 'center', // Center the button horizontally
  },
});
