import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from './styles';

interface Post {
  id: string;
  title: string;
  author: string;
  description: string;
}

const posts: Post[] = [
  {
    id: '1',
    title: 'React Native Tips',
    author: 'João Silva',
    description: 'Dicas essenciais para desenvolver com React Native.',
  },
  {
    id: '2',
    title: 'Expo ou CLI?',
    author: 'Maria Souza',
    description: 'Comparativo prático entre Expo e React Native CLI.',
  },
  {
    id: '3',
    title: 'Styled Components',
    author: 'Carlos Lima',
    description: 'Como utilizar styled-components no seu app.',
  },
];

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tech 4 - Blog</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>Por {item.author}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}
