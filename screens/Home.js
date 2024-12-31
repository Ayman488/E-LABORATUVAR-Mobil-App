import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen'; // شاشة الصفحة الرئيسية
import Notification from './Notification'; // شاشة الإشعارات
import Profile from './Profile'; // شاشة الملف الشخصي

const Tab = createBottomTabNavigator();

const Home = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home-outline';
                    } else if (route.name === 'Notification') {
                        iconName = 'notifications-outline';
                    } else if (route.name === 'Profile') {
                        iconName = 'person-outline';
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#6D28D9',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Notification" component={Notification} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
};

export default Home;
