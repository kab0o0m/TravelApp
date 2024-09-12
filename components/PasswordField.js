import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import InputField from '../components/InputField.js';

const PasswordField = ({ label = "Password", value, onChangeText, marginBottom = 0 }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={[styles.container, { marginBottom }]}>
      <InputField
        label={label}
        secureTextEntry={!passwordVisible}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.eyeIcon}
        onPress={togglePasswordVisibility}
      >
        <Icon name={passwordVisible ? "eye" : "eye-slash"} size={18} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    paddingRight: 35, // Adjust padding for the eye icon
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: '50%', // Center the icon vertically
    transform: [{ translateY: -5 }], // Adjust for vertical centering based on the icon size
  },
});

export default PasswordField;
