import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home'; // يحتوي على BottomTabNavigator
import sonuclarim from './screens/sonuclarim';
import DoctorPage from './screens/DoctorPage';
import SonucBul from './screens/SonucBul';
import kilavuzlar from './screens/kilavuzlar';
import Kullancilari from './screens/Kullancilari';
import AddUser from './screens/AddUser';
import EditUser from './screens/EditUser';
import HavuzDetails from './screens/HavuzDetails';
import DataEntry from './screens/DataEntry';


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
                    component={Home} // يحتوي على BottomTabNavigator
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="sonuclarim"
                    component={sonuclarim}
                    options={{ title: 'sonuclarim' }}
                />
                <Stack.Screen
                    name="DoctorPage"
                    component={DoctorPage}
                    options={{ title: 'DoctorPage' }}
                />
                <Stack.Screen
                    name="SonucBul"
                    component={SonucBul}
                    options={{ title: 'SonucBul' }}
                />
                <Stack.Screen
                    name="kilavuzlar"
                    component={kilavuzlar}
                    options={{ title: 'kilavuzlar' }}
                />
                <Stack.Screen
                    name="Kullancilari"
                    component={Kullancilari}
                    options={{ title: 'Kullancilari' }}
                />
                <Stack.Screen
                    name="AddUser"
                    component={AddUser}
                    options={{ title: 'AddUser' }}
                />
                <Stack.Screen
                    name="EditUser"
                    component={EditUser}
                    options={{ title: 'EditUser' }}
                />
                <Stack.Screen
                    name="HavuzDetails"
                    component={HavuzDetails}
                    options={{ title: 'HavuzDetails' }}
                />
                <Stack.Screen
                    name="DataEntry"
                    component={DataEntry}
                    options={{ title: 'DataEntry' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
