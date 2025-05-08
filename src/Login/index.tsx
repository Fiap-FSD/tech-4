import React, { useState } from 'react';
import { View, TextInput, Text, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

export default function Login() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'aluno' | 'professor'>('aluno');

  const handleLogin = () => {
    const validUsers = [
      { username: 'aluno123', password: 'senha123', type: 'aluno' },
      { username: 'prof456', password: 'senha456', type: 'professor' },
    ];

    const userValid = validUsers.find(
      (user) => user.username === username && user.password === password && user.type === userType
    );

    if (userValid) {
      console.log('Login bem-sucedido como:', userType);
      navigation.replace('Home');
    } else {
      Alert.alert('Erro de login', 'Usuário, senha ou tipo incorreto.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Usuário:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu usuário"
        onChangeText={setUsername}
        value={username}
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <Text style={styles.label}>Tipo de usuário:</Text>
      <Picker
        selectedValue={userType}
        onValueChange={(itemValue) => setUserType(itemValue as 'aluno' | 'professor')}
        style={styles.picker}
      >
        <Picker.Item label="Aluno" value="aluno" />
        <Picker.Item label="Professor" value="professor" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
