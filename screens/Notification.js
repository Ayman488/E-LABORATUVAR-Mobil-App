import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Notification = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Notification Page</Text>
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
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6D28D9',
    },
});

export default Notification;
