import React, { useState, useEffect } from 'react';
import { TextInput, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { auth , db} from '../firebase'; 
import { doc, getDoc } from 'firebase/firestore';
const Colors = {
    primary: '#ffffff',
    secondary: '#E5E7EB',
    tertiary: '#1F2937',
    darkLight: '#9CA3AF',
    brand: '#6D28D9',
    green: '#10B981',
    red: '#EF4444',
};

const { primary, secondary, tertiary, darkLight, brand } = Colors;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                checkUserRole(user.uid);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const checkUserRole = async (userId) => {
        try {
            const docRef = doc(db, 'users', userId); 
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                if (userData.role === 'doctor') {
                    navigation.navigate('DoctorPage'); 
                } else {
                    navigation.navigate('Home'); 
                }
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error('Error fetching user role:', error);
        }
    };

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Logged in:', userCredential.user);
                checkUserRole(userCredential.user.uid); 
            })
            .catch((error) => {
                console.error('Login error:', error);
            });
    };
    

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/img/Login.jpg')} />
            <View style={styles.innerContainer}>
                <Text style={styles.welcomeText}>Merhaba</Text>
                <Text style={styles.welcomeText}>E-laboratuvar sonuçları</Text>
                <Text style={styles.pageTitle}>Login</Text>

                <View style={styles.inputContainer}>
                    <Icon name="envelope" size={20} color={styles.icon.color} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email Address"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} color={styles.icon.color} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                </View>

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>LOGIN</Text>
                </TouchableOpacity>


                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Don't have an account already? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.signupLink}>Signup</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: primary,
    },
    logo: {
        width: 200,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    innerContainer: {
        width: '90%',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: darkLight,
        marginBottom: 10,
        textAlign: 'center',
    },
    pageTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: brand,
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
        backgroundColor: secondary,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: brand,
    },
    icon: {
        marginRight: 10,
        color: brand,
    },
    loginButton: {
        backgroundColor: brand,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '90%',
        marginTop: 10,
    },
    loginButtonText: {
        color: primary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    userInfo: {
        marginTop: 20,
        fontSize: 16,
        color: brand,
    },
    signupContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    signupText: {
        fontSize: 14,
        color: darkLight,
    },
    signupLink: {
        fontSize: 14,
        color: brand,
        fontWeight: 'bold',
    },
});

export default Login;
