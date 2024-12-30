import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { db } from '../firebase'; // استيراد ملف التهيئة
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const Kullancilari = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'users'));
                const userList = [];
                querySnapshot.forEach(doc => {
                    const userData = doc.data();
                    // إضافة المستخدم إذا لم يكن لديه role "doctor"
                    if (userData.role !== 'doctor') {
                        userList.push({
                            id: doc.id,
                            ...userData,
                        });
                    }
                });
                setUsers(userList);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        try {
            await deleteDoc(doc(db, 'users', userId));
            Alert.alert('Success', 'User deleted successfully');
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
            Alert.alert('Error', 'Failed to delete user');
        }
    };

    const handleEdit = (user) => {
        navigation.navigate('EditUser', { 
            userId: user.id,        
            currentEmail: user.email 
        });
    };

    const handleAddUser = () => {
        navigation.navigate('AddUser');
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#6D28D9" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.userItem}>
                        <Text style={styles.userText}>User Email: {item.email}</Text>
                        <View style={styles.actionButtons}>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => handleEdit(item)}
                            >
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => handleDelete(item.id)}
                            >
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyList}>
                        <Text>No users available</Text>
                    </View>
                }
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddUser}
            >
                <Text style={styles.buttonText}>Add User</Text>
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
        padding: 20,
        backgroundColor: '#ffffff',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    userText: {
        fontSize: 16,
    },
    actionButtons: {
        flexDirection: 'row',
    },
    editButton: {
        backgroundColor: '#10B981',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: '#EF4444',
        padding: 10,
        borderRadius: 5,
    },
    addButton: {
        backgroundColor: '#6D28D9',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#6D28D9',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '50%',
        alignSelf: 'center',
    },
    logoutButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonSpacing: {
        marginTop: 20,
    },
    emptyList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    }
});

export default Kullancilari;
