import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const kilavuzlar = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Kilavuzlar sayfası</Text>
            <TouchableOpacity
                style={[styles.logoutButton, styles.buttonSpacing]}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6D28D9',
        marginBottom: 20,
    },
    logoutButton: {
        backgroundColor: '#6D28D9',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '50%',
    },
    logoutButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonSpacing: {
        marginBottom: 20, 
    },
});

export default kilavuzlar;
