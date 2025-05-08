import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Container, Title, BackButtonContainer, MenuContainer } from './styles';

interface HeaderProps {
  title: string;
  onMenuPress: () => void;
  canGoBack?: boolean;
}

export default function Header({ title, onMenuPress, canGoBack }: HeaderProps) {
  const navigation = useNavigation();

  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: '#2e2e2e' }}>
      <Container>
        {canGoBack ? (
          <BackButtonContainer onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="white" />
          </BackButtonContainer>
        ) : (
          <View style={{ width: 28 }} />
        )}
        <Title>{title}</Title>
        <MenuContainer onPress={onMenuPress}>
          <Ionicons name="menu" size={28} color="white" />
        </MenuContainer>
      </Container>
    </SafeAreaView>
  );
}
