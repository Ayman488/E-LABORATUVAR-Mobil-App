import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const SonucBul = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!email) {
            Alert.alert('Hata', 'Lütfen bir e-posta adresi girin.');
            return;
        }

        setLoading(true);

        try {
            const querySnapshot = await getDocs(collection(db, 'users'));
            const allPatients = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            // تصفية المرضى بناءً على الإيميل فقط
            const matchedPatient = allPatients.find(
                (patient) => patient.email?.trim().toLowerCase() === email.trim().toLowerCase()
            );

            if (!matchedPatient) {
                Alert.alert('Hata', 'Bu e-posta adresine sahip bir hasta bulunamadı.');
            } else {
                navigation.navigate('DataEntry', { patient: matchedPatient });
            }
        } catch (error) {
            console.error('Error fetching patient data:', error);
            Alert.alert('Hata', 'Bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hastayı Bul</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>E-posta:</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="E-posta adresini girin"
                    keyboardType="email-address"
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSearch} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Aranıyor...' : 'Ara'}</Text>
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
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#6D28D9',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
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
});

export default SonucBul;
