// src/Profile/index.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { styles } from './styles';

type User = {
  id: string;
  name: string;
  email: string;
};

export default function UserProfile() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');

  // Simula requisição a uma API fictícia
  useEffect(() => {
    setTimeout(() => {
      const fakeData: User[] = [
        { id: '1', name: 'Ana Silva', email: 'ana@email.com' },
        { id: '2', name: 'Carlos Lima', email: 'carlos@email.com' },
        { id: '3', name: 'Julia Rocha', email: 'julia@email.com' },
      ];
      setUsers(fakeData);
      setLoading(false);
    }, 1500);
  }, []);

  const startEditing = (user: User) => {
    setEditingUserId(user.id);
    setEditedName(user.name);
    setEditedEmail(user.email);
  };

  const saveEdit = () => {
    if (!editedName || !editedEmail) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const updatedUsers = users.map((user) =>
      user.id === editingUserId ? { ...user, name: editedName, email: editedEmail } : user
    );

    setUsers(updatedUsers);
    setEditingUserId(null);
    setEditedName('');
    setEditedEmail('');
    Alert.alert('Sucesso', 'Usuário atualizado!');
  };

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.userCard}>
      {editingUserId === item.id ? (
        <>
          <TextInput
            style={styles.input}
            value={editedName}
            onChangeText={setEditedName}
            placeholder="Nome"
          />
          <TextInput
            style={styles.input}
            value={editedEmail}
            onChangeText={setEditedEmail}
            placeholder="Email"
          />
          <Button title="Salvar" onPress={saveEdit} />
        </>
      ) : (
        <>
          <Text style={styles.userText}>Nome: {item.name}</Text>
          <Text style={styles.userText}>Email: {item.email}</Text>
          <TouchableOpacity onPress={() => startEditing(item)} style={styles.editButton}>
            <Text style={styles.editText}>Editar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
}
