import React, { useState } from 'react';
import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
} from '../components/styles';
import { TextInput, Button, Text, View } from 'react-native';
import styled from 'styled-components';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // يمكنك وضع منطق تسجيل الدخول هنا
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <StyledContainer>
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('./../assets/img/Login.jpg')} />
                <WelcomeText>Merhaba</WelcomeText>
                <WelcomeText>E-laboratuvar sonuçları</WelcomeText>
                <PageTitle>Login</PageTitle>
                <StyledInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address"
                />
                <StyledInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                />
                <StyledButton onPress={handleLogin}>
                    <ButtonText>Login</ButtonText>
                </StyledButton>
            </InnerContainer>
        </StyledContainer>
    );
};

// أنماط مخصصة
const StyledInput = styled.TextInput`
    width: 90%;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.secondary || '#E5E7EB'};
    font-size: 16px;
`;

const StyledButton = styled.TouchableOpacity`
    width: 90%;
    padding: 15px;
    background-color: ${(props) => props.theme.brand || '#6D28D9'};
    align-items: center;
    border-radius: 5px;
    margin-top: 10px;
`;

const ButtonText = styled.Text`
    color: ${(props) => props.theme.primary || '#ffffff'};
    font-size: 16px;
    font-weight: bold;
`;

const WelcomeText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${(props) => props.theme.darkLight || '#9CA3AF'};
    margin-bottom: 10px;
    text-align: center;
`;

export default Login;