import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Kullancilari = ({ navigation }) => {
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [users, setUsers] = useState([]); // Initial empty array of users


    useEffect(() => {
        const subscriber = firestore()
          .collection('users')
          .onSnapshot(querySnapshot => {
            const users = [];
      
            querySnapshot.forEach(documentSnapshot => {
              users.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
      
            setUsers(users);
            setLoading(false);
          });
          console.log(users);

        // Unsubscribe from events when no longer in use
        return () => subscriber();
      }, []);

    

      if (loading) {
        return <ActivityIndicator />;
      }
    
    return (
        <View style={styles.container}>
        <FlatList
            data={users}
            renderItem={({ item }) => (
                <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                
                <Text>User Name: {item.email}</Text>
                </View>
            )}
        />
            
            <TouchableOpacity
                style={[styles.logoutButton, styles.buttonSpacing]}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.logoutButtonText}>تسجيل الخروج</Text>
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
    addButton: {
        backgroundColor: '#10B981',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 20,
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
    },
    logoutButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonSpacing: {
        marginTop: 10,
    },
});

export default Kullancilari;
