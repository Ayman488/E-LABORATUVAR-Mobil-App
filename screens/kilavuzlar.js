import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const HavuzList = ({ navigation }) => {
    const havuzlar = ['1.havuz', '2.havuz', '3.havuz', '4.havuz', '5.havuz', '6.havuz', '7.havuz'];

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.headerText}>اختيار الحوض</Text>
            {havuzlar.map((havuz, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.button}
                    onPress={() => navigation.navigate('HavuzDetails', { havuz })}
                >
                    <Text style={styles.buttonText}>{havuz}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#6D28D9',
        padding: 15,
        borderRadius: 5,
        marginBottom: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HavuzList;
