import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ 
  title, 
  onPress, 
  backgroundColor = '#F47966', // Default background color
  textColor = '#FFFFFF', // Default text color
  paddingVertical = 15, // Default vertical padding
  borderRadius = 25, // Default border radius
  marginTop = 5, // Default margin top
  style 
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        { backgroundColor, paddingVertical, borderRadius, marginTop }, 
        style
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Button;
