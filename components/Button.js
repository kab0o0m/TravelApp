import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import the icon library

const Button = ({ 
  title, 
  onPress, 
  backgroundColor = '#F47966', // Default background color
  textColor = '#FFFFFF', // Default text color
  paddingVertical = 10, // Reduced default vertical padding
  borderRadius = 25, // Default border radius
  marginTop = 5, // Default margin top
  borderColor = '#F47966', // Default border color
  borderWidth = 2, // Thickness of the border
  width = 'auto', // Default width
  iconName = null, // Default no icon
  iconSize = 24, // Default icon size
  iconColor = '#FFFFFF', // Default icon color
  style 
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        { 
          backgroundColor, 
          paddingVertical, 
          borderRadius, 
          marginTop,
          borderColor, // Set border color
          borderWidth, // Set border width
          width, // Set width
          borderStyle: 'solid', // Ensures the border is solid
        }, 
        style
      ]}
      onPress={onPress}
    >
      {/* Container for the icon and the text */}
      <View style={styles.buttonContent}>
        {/* Only render the icon if iconName is provided */}
        {iconName && (
          <Ionicons name={iconName} size={iconSize} color={iconColor} style={styles.icon} />
        )}
        <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2, // Set the border width here
    borderColor: '#FFFFFF', // Default border color
  },
  buttonContent: {
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center', // Center vertically
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10, // Space between icon and text
  },
});

export default Button;
