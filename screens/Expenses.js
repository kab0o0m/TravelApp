import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useFonts, Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { Picker } from '@react-native-picker/picker'; 
import Button from "../components/Button"; 
import Footer from "../components/Footer"; 

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Expenses = () => {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  const [selectedSortOption, setSelectedSortOption] = useState("date_latest"); 

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
            backgroundColor="#006D77" 
            textColor="#FFFFFF"
            paddingVertical={8} 
            borderRadius={25}
            width={screenWidth * 0.45} 
            borderColor="#FFFFFF" 
            borderWidth={2} 
          />
        </View>
      </View>

      {/* Overlay Rectangular Box (White) */}
      <View style={styles.whiteBox}>
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


        
        
      </View>
      <View style={styles.footerContainer}>
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
        <Footer />
      </View>
    </View>
  );
};

export default Expenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: screenHeight * 0.05, 
  },
  header: {
    fontSize: screenHeight * 0.03, 
    fontFamily: 'Nunito_700Bold', 
    color: '#006D77', 
    marginBottom: screenHeight * 0.02, 
    marginLeft: screenWidth * 0.05, 
    marginRight: screenWidth * 0.05, 
  },
  box: {
    width: '100%', 
    height: screenHeight * 0.5, 
    backgroundColor: '#006D77', 
    borderTopLeftRadius: screenWidth * 0.05, 
    borderTopRightRadius: screenWidth * 0.05, 
    borderBottomLeftRadius: 0, 
    borderBottomRightRadius: 0, 
    alignItems: 'center', 
    position: 'relative', 
  },
  innerBox: {
    alignItems: 'center', 
    marginTop: screenHeight * 0.025, 
  },
  amount: {
    fontSize: screenHeight * 0.04, 
    fontFamily: 'Nunito_700Bold', 
    color: '#FFF', 
  },
  budgetText: {
    fontSize: screenHeight * 0.025, 
    fontFamily: 'Nunito_400Regular', 
    color: '#FFF', 
    marginTop: screenHeight * 0.01, 
    marginBottom: screenHeight*0.005,
  },
  whiteBox: {
    position: 'absolute', 
    top: screenHeight * 0.35, 
    left: 0,
    right: 0,
    paddingHorizontal: screenWidth * 0.05,
    paddingTop: screenHeight * 0.03, 
    height: screenHeight * 0.65, 
    backgroundColor: '#FCF7F7', 
    borderTopLeftRadius: screenWidth * 0.05, 
    borderTopRightRadius: screenWidth * 0.05, 
  },
  topLeftText: {
    fontSize: screenHeight * 0.03, 
    fontFamily: 'Nunito_700Bold', 
    color: '#000', 
  },
  sortContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  sortText: {
    fontSize: screenHeight * 0.025, 
    fontFamily: 'Nunito_700Bold', 
    color: '#000', 
    marginRight: screenWidth * 0.01, 
  },
  picker: {
    height: screenHeight * 0.025, 
    width: screenWidth * 0.6, 
  },
  noExpenses: {
    fontSize: screenHeight * 0.0225, 
    fontFamily: 'Nunito_400Regular', 
    color: '#879192', 
    marginTop: screenHeight * 0.02, 
  },
  buttonContainer: {
    bottom: screenHeight * 0.025, // Space above the footer
    left: 0,
    right: 0,
    alignItems: 'center', 
    justifyContent: 'flex-end',
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
