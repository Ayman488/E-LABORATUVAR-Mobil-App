import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home'; 
import sonuclarim from './screens/sonuclarim';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Signup"
                    component={Signup}
                    options={{ title: 'Signup' }}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ title: 'Home' }}
                />
                <Stack.Screen
                    name="sonuclarim"
                    component={sonuclarim}
                    options={{ title: 'sonuclarim' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
