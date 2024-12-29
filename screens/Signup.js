import React, { useState } from 'react';
import { TextInput, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase'; 

const Colors = {
    primary: '#ffffff',
    secondary: '#E5E7EB',
    tertiary: '#1F2937',
    darkLight: '#9CA3AF',
    brand: '#6D28D9',
    green: '#10B981',
    red: '#EF4444',
};

const { primary, secondary, darkLight, brand } = Colors;

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();

    const handleSignup = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                createdAt: new Date(),
            });

            console.log('User signed up and added to Firestore:', user.uid);
        } catch (error) {
            console.error('Signup error:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.pageTitle}>Signup</Text>

                <View style={styles.inputContainer}>
                    <Icon name="envelope" size={20} color={styles.icon.color} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email Address"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} color={styles.icon.color} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                </View>

                <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                    <Text style={styles.signupButtonText}>SIGNUP</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: primary,
    },
    innerContainer: {
        width: '90%',
        alignItems: 'center',
    },
    pageTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: brand,
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
        backgroundColor: secondary,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: brand,
    },
    icon: {
        marginRight: 10,
        color: brand,
    },
    signupButton: {
        backgroundColor: brand,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '90%',
        marginTop: 10,
    },
    signupButtonText: {
        color: primary,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Signup;
