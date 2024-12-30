import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { db } from '../firebase'; // استيراد ملف التهيئة
import { collection, addDoc } from 'firebase/firestore';

const AddUser = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleAddUser = async () => {
        if (!email) {
            Alert.alert('Error', 'Please enter an email');
            return;
        }

        try {
            await addDoc(collection(db, 'users'), { email });
            Alert.alert('Success', 'User added successfully');
            navigation.goBack(); // العودة إلى الشاشة السابقة
        } catch (error) {
            console.error('Error adding user:', error);
            Alert.alert('Error', 'Failed to add user');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add New User</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddUser}
            >
                <Text style={styles.buttonText}>Add User</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#6D28D9',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    addButton: {
        backgroundColor: '#10B981',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddUser;
