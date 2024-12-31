import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { auth, db } from '../firebase'; // تأكد من إعداد ملف firebase.js
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

const AddUser = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleAddUser = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password');
            return;
        }

        try {
            // تسجيل المستخدم في Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // إضافة بيانات إضافية إلى Firestore
            await addDoc(collection(db, 'users'), {
                uid: userCredential.user.uid, // المعرف الخاص بالمستخدم
                email, // البريد الإلكتروني
                role: 'user', // افتراض دور المستخدم
                createdAt: new Date().toISOString(), // تاريخ الإنشاء
            });

            Alert.alert('Success', 'User added successfully');
            navigation.goBack(); // العودة إلى الشاشة السابقة
        } catch (error) {
            console.error('Error adding user:', error);
            Alert.alert('Error', error.message || 'Failed to add user');
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
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                autoCapitalize="none"
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
