import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const sonuclarim = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the sonuclariniz Page</Text>
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.logoutButtonText}>Back to Home page</Text>
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
});

export default sonuclarim;