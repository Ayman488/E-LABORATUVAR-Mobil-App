import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const SonucBul = ({ navigation }) => {
    const [g1, setG1] = useState('');
    const [g2, setG2] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [calculatedAge, setCalculatedAge] = useState(null);
    const calculateAge = () => {
        if (!birthDate) {
            alert('Lütfen doğum tahihi giriniz!');
            return;
        }
        const today = new Date();
        const birth = new Date(birthDate);
        const age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            setCalculatedAge(age - 1);
        } else {
            setCalculatedAge(age);
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Merhaba Doktor!</Text>
            
            <View style={styles.inputContainer}>
                <Text style={styles.label}>G1 değeri:</Text>
                <TextInput
                    style={styles.input}
                    value={g1}
                    onChangeText={setG1}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>G2 değeri:</Text>
                <TextInput
                    style={styles.input}
                    value={g2}
                    onChangeText={setG2}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>G3 değeri:</Text>
                <TextInput
                    style={styles.input}
                    value={age}
                    onChangeText={setAge}
                    keyboardType="default"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>DOĞUM TARİHİ</Text>
                <TextInput
                    style={styles.input}
                    placeholder="YYYY-MM-DD"
                    value={birthDate}
                    onChangeText={setBirthDate}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={calculateAge}>
                <Text style={styles.buttonText}>Yaş Hesapla</Text>
            </TouchableOpacity>

            {calculatedAge !== null && (
                <Text style={styles.result}>{calculatedAge} yaşında </Text>
            )}

            <TouchableOpacity
                style={[styles.logoutButton, styles.buttonSpacing]}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.logoutButtonText}>Gönder</Text>
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
    inputContainer: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    label: {
        width: '40%',
        fontSize: 16,
        color: '#333',
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#6D28D9',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
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
    button: {
        backgroundColor: '#6D28D9',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '50%',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    result: {
        marginTop: 20,
        fontSize: 18,
        color: '#333',
    },
});

export default SonucBul;
