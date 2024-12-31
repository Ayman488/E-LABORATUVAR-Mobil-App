import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { db } from '../firebase'; // تهيئة Firebase
import { collection, getDocs, doc } from 'firebase/firestore';

const DataEntry = ({ route, navigation }) => {
    const [age, setAge] = useState('');
    const [IgA, setIgA] = useState('');
    const [IgM, setIgM] = useState('');
    const [IgG, setIgG] = useState('');
    const [IgG1, setIgG1] = useState('');
    const [IgG2, setIgG2] = useState('');
    const [IgG3, setIgG3] = useState('');
    const [IgG4, setIgG4] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');

    const fetchData = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'havuzlar'));
            const data = [];

            for (const docSnap of querySnapshot.docs) {
                const docRef = docSnap.ref;
                const subCollectionSnapshot = await getDocs(collection(docRef, '1.havuz'));

                for (const subDoc of subCollectionSnapshot.docs) {
                    const subDocRef = subDoc.ref;
                    const rowDocsSnap = await getDocs(collection(subDocRef, '1.satir'));
                    rowDocsSnap.forEach((rowDocSnap) => {
                        if (rowDocSnap.exists()) {
                            const rowData = rowDocSnap.data();
                            data.push(rowData);
                        }
                    });
                }
            }
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            Alert.alert('Error', 'حدث خطأ أثناء جلب البيانات');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!age || !IgA || !IgM || !IgG || !IgG1 || !IgG2 || !IgG3 || !IgG4) {
            Alert.alert('Error', 'يرجى إدخال جميع القيم');
            return;
        }

        const data = await fetchData();
        let resultMessage = '';

        const patientAge = parseInt(age, 10);

        const matchingRow = data.find((row) => {
            const minAge = parseInt(row['min-age'], 10);
            const maxAge = parseInt(row['max-age'], 10);

            console.log(`Patient Age: ${patientAge}, Min Age: ${minAge}, Max Age: ${maxAge}`); // عرض القيم للمراجعة

            return patientAge >= minAge && patientAge <= maxAge;
        });

        if (matchingRow) {
            resultMessage += checkValue(IgA, matchingRow['IgA-min'], matchingRow['IgA-max'], 'IgA');
            resultMessage += checkValue(IgM, matchingRow['IgM-min'], matchingRow['IgM-max'], 'IgM');
            resultMessage += checkValue(IgG, matchingRow['IgG-min'], matchingRow['IgG-max'], 'IgG');
            resultMessage += checkValue(IgG1, matchingRow['IgG1-min'], matchingRow['IgG1-max'], 'IgG1');
            resultMessage += checkValue(IgG2, matchingRow['IgG2-min'], matchingRow['IgG2-max'], 'IgG2');
            resultMessage += checkValue(IgG3, matchingRow['IgG3-min'], matchingRow['IgG3-max'], 'IgG3');
            resultMessage += checkValue(IgG4, matchingRow['IgG4-min'], matchingRow['IgG4-max'], 'IgG4');
        } else {
            resultMessage = 'لا توجد بيانات متوافقة مع العمر المدخل';
        }

        setResult(resultMessage);
    };

    const checkValue = (value, min, max, label) => {
        const numericValue = parseFloat(value);
        if (numericValue < min) {
            return `${label} أقل من الحد الأدنى. `;
        } else if (numericValue > max) {
            return `${label} أعلى من الحد الأقصى. `;
        } else {
            return `${label} طبيعي. `;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>إدخال البيانات</Text>

            <TextInput
                style={styles.input}
                placeholder="العمر (بالشهور)"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
            />

            <TextInput
                style={styles.input}
                placeholder="IgA"
                keyboardType="numeric"
                value={IgA}
                onChangeText={setIgA}
            />
            <TextInput
                style={styles.input}
                placeholder="IgM"
                keyboardType="numeric"
                value={IgM}
                onChangeText={setIgM}
            />
            <TextInput
                style={styles.input}
                placeholder="IgG"
                keyboardType="numeric"
                value={IgG}
                onChangeText={setIgG}
            />
            <TextInput
                style={styles.input}
                placeholder="IgG1"
                keyboardType="numeric"
                value={IgG1}
                onChangeText={setIgG1}
            />
            <TextInput
                style={styles.input}
                placeholder="IgG2"
                keyboardType="numeric"
                value={IgG2}
                onChangeText={setIgG2}
            />
            <TextInput
                style={styles.input}
                placeholder="IgG3"
                keyboardType="numeric"
                value={IgG3}
                onChangeText={setIgG3}
            />
            <TextInput
                style={styles.input}
                placeholder="IgG4"
                keyboardType="numeric"
                value={IgG4}
                onChangeText={setIgG4}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>إرسال</Text>
            </TouchableOpacity>

            {loading ? <ActivityIndicator size="large" color="#6D28D9" /> : null}

            {result ? <Text style={styles.resultText}>{result}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#6D28D9',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultText: {
        marginTop: 20,
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
    },
});

export default DataEntry;
