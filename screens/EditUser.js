import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const EditUser = ({ route, navigation }) => {
    const { userId, currentEmail } = route.params || {}; // استلام البيانات
    const [email, setEmail] = useState(currentEmail || ''); // التأكد من وجود قيمة

    const handleUpdateUser = async () => {
        if (!userId || !email) {
            Alert.alert('Error', 'Missing user ID or email');
            return;
        }

        try {
            const userDocRef = doc(db, 'users', userId);
            await updateDoc(userDocRef, { email });
            Alert.alert('Success', 'User updated successfully');
            navigation.goBack();
        } catch (error) {
            console.error('Error updating user:', error);
            Alert.alert('Error', `Failed to update user: ${error.message}`);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit User</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleUpdateUser}>
                <Text style={styles.buttonText}>Save Changes</Text>
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
    saveButton: {
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

export default EditUser;
