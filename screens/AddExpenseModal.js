import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Button from '../components/Button';
import GrayLine from '../components/GrayLine'; // Import the GrayLine component

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const scaleFont = (size) => (screenWidth / 375) * size;

const AddExpenseModal = ({ visible, onClose, onAdd }) => {
  const [newExpense, setNewExpense] = useState("");

  // If modal is not visible, return null
  if (!visible) return null;

  const handleAddExpense = () => {
    if (newExpense.trim()) {
      onAdd(newExpense.trim());
      setNewExpense(""); // Reset input
      onClose(); // Close the modal after adding
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            {/* Customizable GrayLine */}
            <GrayLine width={screenWidth * 0.2} height={screenHeight * 0.005} marginBottom={screenHeight * 0.03} />

            <Text style={styles.modalHeader}>Add Expense</Text>

            {/* Row for input and currency */}
            <View style={styles.inputContainer}>
              <Text style={styles.currencyText}>SGD</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                value={newExpense}
                onChangeText={setNewExpense}
                keyboardType="numeric" // Ensures numeric keyboard appears
              />
            </View>

            <GrayLine width={screenWidth*0.9} height={screenHeight*0.0025}/>

            <Text style={styles.categoryHeader}>Category</Text>

            <View style={styles.buttonContainer}>
              <Button
                title="Add"
                onPress={handleAddExpense} // Handle adding the expense
                backgroundColor="#F47966"
                textColor="#FFFFFF"
                paddingVertical={10}
                borderRadius={25}
                width={screenWidth * 0.3} 
                iconName="add"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddExpenseModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: screenWidth,
    height: screenHeight * 0.8,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: screenWidth * 0.05,
    paddingTop: screenHeight * 0.02,
    paddingBottom: screenHeight * 0.05,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  modalHeader: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  currencyText: {
    fontSize: scaleFont(16),
    marginRight: 10,
  },
  input: {
    width: screenWidth * 0.2,
    height: 40,
    textAlign: 'right',
    fontSize: scaleFont(16),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: screenHeight * 0.025,
    width: '100%',
    alignItems: 'center',
  },
  categoryHeader: {
    fontSize: scaleFont(15),
    fontWeight: 'bold',
    marginVertical: screenHeight*0.03,
  },
});
