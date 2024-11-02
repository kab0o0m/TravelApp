import React, { useState } from 'react';
import { View, Dimensions, Text, Modal, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Button from '../components/Button';

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const SetBudgetModal = ({ visible, onClose, onSetBudget }) => {
  const [budget, setBudget] = useState('');

  const handleSetBudget = () => {
    if (budget) {
      onSetBudget(budget);
      setBudget(''); // Clear input after setting budget
      onClose(); // Close the modal
    } else {
      alert('Please enter a budget.'); // Alert if budget is empty
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButtonContainer}>
            <Text style={styles.closeButton}>x</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Set Your Budget</Text>
          <Text style={styles.instruction}>Please enter your budget below:</Text>
          <TextInput
            style={styles.input}
            value={budget}
            onChangeText={setBudget}
            placeholder="Enter your budget"
            keyboardType="numeric"
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Set Budget"
              onPress={handleSetBudget} // Use handleSetBudget to set the budget
              backgroundColor="#F47966"
              textColor="#FFFFFF"
              borderRadius={25}
              width={screenWidth * 0.4}
              height={screenHeight * 0.055}
              fontSize={screenHeight * 0.02}
              paddingVertical={screenHeight * 0.001}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: screenWidth * 0.07,
    position: 'relative', // Set position to relative for absolute positioning of close button
  },
  closeButtonContainer: {
    position: 'absolute', // Positioning the close button
    top: screenHeight*0.005, // Space from the top
    right: screenWidth*0.04, // Space from the right
  },
  closeButton: {
    color: 'grey', // Grey color for the 'X'
    fontSize: screenHeight*0.04, // Adjust size of the 'X'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  instruction: {
    marginVertical: screenHeight * 0.02,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: screenWidth * 0.04,
    marginBottom: screenHeight * 0.03,
  },
  buttonContainer: {
    alignItems: 'center', // Center the button horizontally
    marginBottom: screenHeight * 0.02, // Add some space below the button
  },
});

export default SetBudgetModal;
