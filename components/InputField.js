import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const InputField = ({ label, placeholder, secureTextEntry, value, onChangeText, style, marginBottom, flex }) => {
  return (
    <View style={[styles.container, { marginBottom: marginBottom || 12, ...(flex !== undefined ? { flex } : {}) }]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, style]}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0, // Default flex value if not specified
  },
  label: {
    fontSize: 14, // Adjust font size
    fontWeight: '600',
    marginBottom: 4, // Adjust margin
    color: '#006D77',
  },
  input: {
    height: 45, // Adjust height
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8, // Adjust padding
    fontFamily: 'Nunito_400Regular',
  },
});

export default InputField;
