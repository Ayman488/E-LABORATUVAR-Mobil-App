import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const DoctorPage = ({ navigation }) => {
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Merhaba Doktor!</Text>
            
            <TouchableOpacity
                style={[styles.logoutButton, styles.buttonSpacing]}
                onPress={() => navigation.navigate('SonucBul')}>
                <Text style={styles.logoutButtonText}>Sonuç Bulun</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.logoutButton, styles.buttonSpacing]}
                onPress={() => navigation.navigate('Kullancilari')}>
                <Text style={styles.logoutButtonText}>Kullancıları</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.logoutButton, styles.buttonSpacing]}
                onPress={() => navigation.navigate('kilavuzlar')}>
                <Text style={styles.logoutButtonText}>kilavuzlarda değişkenler yapın</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.logoutButton, styles.buttonSpacing]}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.logoutButtonText}>Çıkış yap</Text>
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
        padding: 20,
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
        marginTop: 20,
    },
    
});

export default DoctorPage;