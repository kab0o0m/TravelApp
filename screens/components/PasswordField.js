// components/PasswordField.js
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import InputField from './components/InputField.js';

const PasswordField = ({ value, onChangeText }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={styles.container}>
      <InputField
        label="Password"
        placeholder="Enter your password"
        secureTextEntry={!passwordVisible}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.eyeIcon}
        onPress={togglePasswordVisibility}
      >
        <Icon name={passwordVisible ? "eye" : "eye-slash"} size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    paddingRight: 40, // Space for the eye icon
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: '50%', // Center the icon vertically
    transform: [{ translateY: -10 }], // Adjust for vertical centering
  },
});

export default PasswordField;
