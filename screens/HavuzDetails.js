import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const HavuzDetails = ({ route }) => {
    const { havuz } = route.params;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [editedData, setEditedData] = useState({});

    useEffect(() => {
        const fetchHavuzData = async () => {
            try {
                // إذا كانت السطور ضمن مجموعة فرعية (على سبيل المثال، 'satir' لكل سطر داخل الحوض)
                const havuzRef = collection(db, 'havuzlar', havuz, '1.satir'); // يجب أن يكون المسار هنا هو "satir" أو أي مجموعة فرعية تحتوي على السطور
                const havuzRef1 = collection(db, 'havuzlar', havuz, '2.satir'); // يجب أن يكون المسار هنا هو "satir" أو أي مجموعة فرعية تحتوي على السطور
                const snapshot = await getDocs(havuzRef);
                const snapshot1 = await getDocs(havuzRef1);
                const fetchedData = [];
                
                snapshot.forEach(doc => {
                    fetchedData.push({ id: doc.id, ...doc.data() });
                });
                snapshot1.forEach(doc => {
                    fetchedData.push({ id: doc.id, ...doc.data() });
                });
        
                setData(fetchedData);
                setEditedData(
                    fetchedData.reduce((acc, item) => {
                        acc[item.id] = { ...item };
                        return acc;
                    }, {})
                );
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchHavuzData();
    }, [havuz]);

    const handleInputChange = (id, key, value) => {
        setEditedData(prevState => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                [key]: value,
            },
        }));
    };

    const handleSave = async (id) => {
        try {
            const docRef = doc(db, 'havuzlar', havuz, '1.satir', id);
            await updateDoc(docRef, editedData[id]);
            Alert.alert('نجاح', 'تم تحديث البيانات بنجاح');
        } catch (error) {
            console.error('Error updating data:', error);
            Alert.alert('خطأ', 'حدث خطأ أثناء تحديث البيانات');
        }
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#6D28D9" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.headerText}>تعديل بيانات {havuz}</Text>
            {data.length === 0 ? (
                <Text style={styles.noDataText}>لا توجد بيانات للعرض</Text>
            ) : (
                data.map((item, index) => (
                    <View key={index} style={styles.dataItem}>
                        {Object.entries(item).map(([key, value]) => {
                            if (key === 'id') return null; // تخطي حقل المعرف
                            return (
                                <View key={key} style={styles.inputContainer}>
                                    <Text style={styles.label}>{key}:</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={editedData[item.id]?.[key]?.toString() || ''}
                                        onChangeText={(text) => handleInputChange(item.id, key, text)}
                                    />
                                </View>
                            );
                        })}
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={() => handleSave(item.id)}
                        >
                            <Text style={styles.saveButtonText}>حفظ</Text>
                        </TouchableOpacity>
                    </View>
                ))
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollContent: {
        padding: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    noDataText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#555',
    },
    dataItem: {
        marginBottom: 15,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
    },
    inputContainer: {
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: '#10B981',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HavuzDetails;
