import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';
import { Container, FooterButton, FooterText } from './styles';

export default function Footer() {
  const navigation = useNavigation();

  const handleNavigateToHome = () => {
    navigation.navigate('Home');
  };

  const handleNavigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const handleLogout = async () => {
    navigation.navigate('Login');
  };

  return (
    <Container>
      <FooterButton onPress={handleNavigateToHome}>
        <Ionicons name="home" size={24} color="white" />
        <FooterText><Text>Home</Text></FooterText>
      </FooterButton>

      <FooterButton onPress={handleNavigateToProfile}>
        <Ionicons name="person" size={24} color="white" />
        <FooterText><Text>Profile</Text></FooterText>
      </FooterButton>

      <FooterButton onPress={handleLogout}>
        <Ionicons name="log-out" size={24} color="white" />
        <FooterText><Text>Logout</Text></FooterText>
      </FooterButton>
    </Container>
  );
}
