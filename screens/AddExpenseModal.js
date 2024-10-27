import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Button from '../components/Button';
import GrayLine from '../components/GrayLine';
import RoundedSquareIcon from '../components/RoundedSquareIcon';

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const scaleFont = (size) => (screenWidth / 375) * size;
const iconSize = screenWidth * 0.20; // Slightly larger width for each icon

const AddExpenseModal = ({ visible, onClose, onAdd }) => {
  const [newExpense, setNewExpense] = useState("");

  const iconData = [
    { iconName: 'home', backgroundColor: '#4A90E2', label: 'Home' },
    { iconName: 'car', backgroundColor: '#F5A623', label: 'Transportation' },
    { iconName: 'cart', backgroundColor: '#50E3C2', label: 'Shopping' },
    { iconName: 'restaurant', backgroundColor: '#B8E986', label: 'Dining Out' },
    { iconName: 'airplane', backgroundColor: '#9013FE', label: 'Travel' },
    { iconName: 'heart', backgroundColor: '#D0021B', label: 'Health & Wellness' },
    { iconName: 'paw', backgroundColor: '#F8E71C', label: 'Pets' },
    { iconName: 'game-controller', backgroundColor: '#417505', label: 'Entertainment' },
  ];

  if (!visible) return null;

  const handleAddExpense = () => {
    if (newExpense.trim()) {
      onAdd(newExpense.trim());
      setNewExpense("");
      onClose();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <GrayLine width={screenWidth * 0.2} height={screenHeight * 0.005} marginBottom={screenHeight * 0.03} />

            <Text style={styles.modalHeader}>Add Expense</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.currencyText}>SGD</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                value={newExpense}
                onChangeText={setNewExpense}
                keyboardType="numeric"
              />
            </View>

            <GrayLine width={screenWidth * 0.9} height={screenHeight * 0.0025} />

            <Text style={styles.categoryHeader}>Category</Text>

            <View style={styles.iconGrid}>
              {iconData.map((item, index) => (
                <View key={index} style={styles.iconWrapper}>
                  <RoundedSquareIcon
                    iconName={item.iconName}
                    iconSize={screenWidth*0.08}
                    iconColor="#FFFFFF"
                    backgroundColor={item.backgroundColor}
                    size={iconSize}
                  />
                  <Text style={styles.iconLabel} numberOfLines={2}>{item.label}</Text>
                </View>
              ))}
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Add"
                onPress={handleAddExpense}
                backgroundColor="#F47966"
                textColor="#FFFFFF"
                paddingVertical={screenHeight * 0.01}
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
    marginVertical: screenHeight * 0.03,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Reduced space between icons
    width: '100%',
    marginBottom: screenHeight * 0.02,
  },
  iconWrapper: {
    width: '24%', // Wider icons to fit 4 per row
    alignItems: 'center',
    marginBottom: screenHeight * 0.03, // Reduced space between rows
  },
  iconLabel: {
    fontSize: scaleFont(12),
    textAlign: 'center',
    marginTop: 5,
    color: '#333333',
  },
});
