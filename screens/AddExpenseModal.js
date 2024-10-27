import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Button from '../components/Button';
import GrayLine from '../components/GrayLine';
import RoundedSquareIcon from '../components/RoundedSquareIcon';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const scaleFont = (size) => (screenWidth / 375) * size;
const iconSize = screenWidth * 0.20;

const iconData = [
    { id: 'shopping', iconName: 'cart', backgroundColor: '#EEF4F8', iconColor: '#81B2CA', label: 'Shopping' }, 
    { id: 'lodging', iconName: 'home', backgroundColor: '#faeee6', iconColor: '#c46d33', label: 'Lodging' }, 
    { id: 'food', iconName: 'restaurant', backgroundColor: '#EEEBED', iconColor: '#836F81', label: 'Food' }, 
    { id: 'transport', iconName: 'bus', backgroundColor: '#E5EEED', iconColor: '#42887B', label: 'Transport' }, 
    { id: 'activities', iconName: 'color-palette', backgroundColor: '#f5e4ef', iconColor: '#c957a5', label: 'Activities' }, 
    { id: 'health', iconName: 'medkit', backgroundColor: '#faf6e1', iconColor: '#e3bc0e', label: 'Health' }, 
    { id: 'souvenirs', iconName: 'gift', backgroundColor: '#f5e1e3', iconColor: '#c95762', label: 'Souvenirs' }, 
    { id: 'others', iconName: 'albums', backgroundColor: '#e6fae7', iconColor: '#418743', label: 'Others' }, 
];

const AddExpenseModal = ({ visible, onClose, onAdd }) => {
    const [newExpense, setNewExpense] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    if (!visible) return null;

    const handleAddExpense = () => {
        if (newExpense.trim() && selectedCategory) {
            onAdd({ amount: newExpense.trim(), category: selectedCategory, date: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) });
            setNewExpense("");
            setSelectedCategory(null);
            setDate(new Date()); // Reset date to current date
            onClose();
        }
    };

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
    };

    const showDatePicker = () => {
        setShowPicker(true);
    };

    const onDateChange = (event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) {
            setDate(selectedDate);
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
                            <Text style={styles.currencyText}>Description</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Title"
                                value={newExpense}
                                onChangeText={setNewExpense}
                                keyboardType="text"
                            />
                        </View>
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
                        <View style={styles.inputContainer}>
                            <Text style={styles.currencyText}>Date</Text>
                            <TouchableOpacity style={styles.dateInput} onPress={showDatePicker}>
                                <Text style={styles.dateText}>{date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
                            </TouchableOpacity>
                            {showPicker && (
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display="default"
                                    onChange={onDateChange}
                                />
                            )}
                        </View>

                        <GrayLine width={screenWidth * 0.9} height={screenHeight * 0.0025} />
                        <Text style={styles.categoryHeader}>Category</Text>

                        <View style={styles.iconGrid}>
                            {iconData.map((item) => (
                                <TouchableOpacity 
                                    key={item.id} 
                                    style={styles.iconWrapper} 
                                    onPress={() => handleSelectCategory(item.id)}
                                >
                                    <RoundedSquareIcon
                                        iconName={item.iconName}
                                        iconSize={screenWidth * 0.08}
                                        iconColor={item.iconColor}
                                        backgroundColor={selectedCategory === item.id ? '#FFCC00' : item.backgroundColor}
                                        size={iconSize}
                                    />
                                    <Text style={styles.iconLabel} numberOfLines={2}>{item.label}</Text>
                                </TouchableOpacity>
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
export { iconData };

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
        marginBottom: screenHeight*0.005,
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
    dateInput: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 10,
    },
    dateText: {
        fontSize: scaleFont(16),
        color: '#333333',
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
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: screenHeight * 0.02,
    },
    iconWrapper: {
        width: '24%', // Wider icons to fit 4 per row
        alignItems: 'center',
        marginBottom: screenHeight * 0.03,
    },
    iconLabel: {
        fontSize: scaleFont(12),
        textAlign: 'center',
        marginTop: 5,
    },
});
