import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ActivityIndicator, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import { useFonts, Nunito_700Bold, Nunito_800ExtraBold, Nunito_900Black } from '@expo-google-fonts/nunito';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');
const { height: screenHeight } = Dimensions.get('window');

SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from auto-hiding

const AIRandomiser = () => {
    const [fontsLoaded] = useFonts({
        Nunito_900Black,
        Nunito_700Bold,
        Nunito_800ExtraBold,
      });

    const [showMessage, setShowMessage] = useState(false); 
    
    const navigation = useNavigation(); 

    // Set up animated values
    const cup1Anim = useRef(new Animated.Value(0)).current;
    const cup2Anim = useRef(new Animated.Value(0)).current;
    const cup3Anim = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        if (fontsLoaded) {
        SplashScreen.hideAsync(); 
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#006D77" />
        </View>
        );
    }

    // Create the shuffle animation
    const animateCups = () => {
        Animated.sequence([
            // Swap cup 1 and cup 2
            Animated.parallel([
                Animated.timing(cup1Anim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(cup2Anim, {
                    toValue: -1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]),
            // Swap cup 2 and cup 3
            Animated.parallel([
                Animated.timing(cup2Anim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(cup3Anim, {
                    toValue: -1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]),
            // Swap cup 1 and cup 3
            Animated.parallel([
                Animated.timing(cup1Anim, {
                    toValue: -1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(cup3Anim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]),
            // Additional swaps for more complexity
            Animated.parallel([
                Animated.timing(cup1Anim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(cup2Anim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(cup3Anim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]),
            Animated.parallel([
                Animated.timing(cup1Anim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(cup3Anim, {
                    toValue: -1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]),
            Animated.parallel([
                Animated.timing(cup1Anim, {
                    toValue: -1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(cup2Anim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]),
            // Reset to original positions
            Animated.parallel([
                Animated.timing(cup1Anim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(cup2Anim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(cup3Anim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]),
        ]).start(() => {
            // Delay showing the message box by 1 sec
            setTimeout(() => {
                // Display the message box after animation completes
                setShowMessage(true);
            }, 600);
        });
    };

    // Trigger the animation on button press
    const handleShuffle = () => {
        setShowMessage(false); // Hide the message box before starting the animation
        animateCups();
    };

    // Define the animated styles for the cups
    const cup1Style = {
        transform: [
            {
                translateX: cup1Anim.interpolate({
                    inputRange: [-1, 0, 1],
                    outputRange: [100, 0, -100], // Move between positions
                }),
            },
        ],
    };

    const cup2Style = {
        transform: [
            {
                translateX: cup2Anim.interpolate({
                    inputRange: [-1, 0, 1],
                    outputRange: [100, 0, -100], // Move between positions
                }),
            },
        ],
    };

    const cup3Style = {
        transform: [
            {
                translateX: cup3Anim.interpolate({
                    inputRange: [-1, 0, 1],
                    outputRange: [100, 0, -100], // Move between positions
                }),
            },
        ],
    };

    // Function to navigate to PlannerNewTrip (BACKEND)
    const navigateToPlannerNewTrip = () => {
        navigation.navigate("PlannerNewTrip", {
            destination: "Paris" // Pass the destination
        });
    };

    
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={require('../assets/AITopBG.png')} style={styles.headerImage} />
                <Text style={styles.header}>Discover Your Next Adventure!</Text>
                <View style={styles.divider} />
            </View>

            
            
            <View style={styles.cupsContainer}>
                <Animated.Image source={require('../assets/Cup.png')} style={[styles.cup, cup1Style]} />
                <Animated.Image source={require('../assets/Cup.png')} style={[styles.cup, cup2Style]} />
                <Animated.Image source={require('../assets/Cup.png')} style={[styles.cup, cup3Style]} />
            </View>

            <View style={styles.bottomContainer}>
                <Image source={require('../assets/AIBottomBG.png')} style={styles.bottomImage} />
                <Image source={require('../assets/Frog.png')} style={styles.frogImage} />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.shuffleButton} onPress={handleShuffle}> 
                        <Text style={styles.shuffleText}>Shuffle Me!</Text>
                    </TouchableOpacity>
                </View>

                {showMessage && (
                    <ImageBackground 
                        source={require('../assets/MessageBox.png')} 
                        style={styles.messageContainer}
                    >
                        <Text style={styles.messageText}>FROLIC TO</Text>
                        <TouchableOpacity
                            style={styles.destinationButton} onPress={navigateToPlannerNewTrip}>
                            <Text style={styles.destinationText}>[DESTINATION]</Text>
                        </TouchableOpacity>
                        <Text style={styles.messageText}>FOR A RIBBITING TIME!</Text>
                    </ImageBackground>
                )}

            </View>

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCF7F7',
        alignItems: 'center',
      },
    headerContainer: {
        position: 'relative',
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',

     },
    header: {
        position: 'absolute',
        top: 55,
        left: 21, 
        fontSize: 28,
        fontFamily: 'Nunito_900Black',
        color: 'black',
        width: 252,
    },
    headerImage:{
        width: screenWidth,
        height: 181,
        resizeMode: 'cover',
    },
    divider: {
        position: 'absolute',
        width: '100%',
        height: 1, 
        backgroundColor: '#879192',
        bottom: 30,
    },
    cupsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '95%',
        marginBottom: 140,
        marginTop: 150,
    },
    cup: {
        width: 100,
        height: 130,
    },
    bottomContainer: {
        position: 'relative',
        marginTop: -90,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomImage: {
        height: 450,
    },
    frogImage: {
        position: 'absolute',
        //marginBottom: -9,
        bottom: 308,
        zIndex: 1,
    },
    buttonContainer:{
        position: 'absolute',
        width: 214,
        height: 47,
        bottom: 230, 
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: '#006D77',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0)',
    },
    shuffleButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    shuffleText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Nunito_700Bold',
    },
    messageContainer: {
        position: 'absolute',
        width: 352,
        height: 336,
        borderRadius: 24,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        top: -275,
        left: screenWidth / 2 - 176,
        zIndex: 2,
    },
    messageText: {
        top: -20,
        fontSize: 24,
        fontFamily: 'Nunito_800ExtraBold',
        color: '#FF6F61',
        textAlign: 'center',
    },
    destinationButton: {
        padding: 0,
    },
    destinationText: {
        top: -20,
        fontSize: 36,
        fontFamily: 'Nunito_900Black',
        color: '#FF6F61',
        textAlign: 'center',
       
    },

});


export default AIRandomiser; 

