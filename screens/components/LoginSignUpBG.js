import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import VectorBackground from "../../assets/Vector-1.png"

const LoginSignUpBG = ({ children }) => {
  return (
    <ImageBackground
      source={VectorBackground} // Background image
      style={styles.background}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.contentContainer}>
        {children}  {/* This will render the content for each page */}
      </View>
    </ImageBackground>
  );
};

export default LoginSignUpBG;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  imageStyle: {
    resizeMode: 'cover',  // Adjust based on how you want the image to fit
  },
  contentContainer: {
    flex: 1,
    padding: 20,  // Adjust padding as needed
    justifyContent: 'center',  // Center content if necessary
  },
});
