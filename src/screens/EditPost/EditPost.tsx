import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

export default function EditPostScreen({ route, navigation }: any) {
  const { post } = route.params; // Recebe o post selecionado da Home
  const { accessToken } = useAuth();

  const [title, setTitle] = useState(post.title);
  const [author, setAuthor] = useState(post.author);
  const [intro, setIntro] = useState(post.intro);
  const [content, setContent] = useState(post.content);
  const [imageUrl, setImageUrl] = useState(post.imageUrl || "");
  const [videoUrl, setVideoUrl] = useState(post.videoUrl || "");

  const handleSave = async () => {
    if (!title || !author || !intro || !content) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const updatedPost = {
      title,
      author,
      intro,
      content,
      imageUrl,
      videoUrl,
    };

    try {
      await axios.put(
        `https://blog-posts-hori.onrender.com/post/${post._id}`,
        updatedPost,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      Alert.alert("Sucesso", "Post atualizado com sucesso!");
      navigation.goBack(); // Volta para a tela anterior
    } catch (error) {
      console.error("Erro ao atualizar o post:", error);
      Alert.alert("Erro", "Não foi possível atualizar o post.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Digite o título"
      />

      <Text style={styles.label}>Autor</Text>
      <TextInput
        style={styles.input}
        value={author}
        onChangeText={setAuthor}
        placeholder="Digite o autor"
      />

      <Text style={styles.label}>Introdução</Text>
      <TextInput
        style={styles.input}
        value={intro}
        onChangeText={setIntro}
        placeholder="Digite a introdução"
      />

      <Text style={styles.label}>Conteúdo</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        placeholder="Digite o conteúdo"
        multiline
      />

      <Text style={styles.label}>URL da Imagem (opcional)</Text>
      <TextInput
        style={styles.input}
        value={imageUrl}
        onChangeText={setImageUrl}
        placeholder="Digite a URL da imagem"
      />

      <Text style={styles.label}>URL do Vídeo (opcional)</Text>
      <TextInput
        style={styles.input}
        value={videoUrl}
        onChangeText={setVideoUrl}
        placeholder="Digite a URL do vídeo"
      />

      <Button title="Salvar Alterações" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});