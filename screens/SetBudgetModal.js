// Inside SetBudgetModal component
import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const SetBudgetModal = ({ visible, onClose, onSetBudget }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Set Your Budget</Text>
          {/* Wrap all text in a Text component */}
          <Text style={styles.instruction}>Please enter your budget below:</Text>
          {/* Input for setting budget goes here */}
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
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
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  instruction: {
    marginVertical: 10,
  },
  closeButton: {
    color: 'blue',
  },
});

export default SetBudgetModal;
