import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useAuth } from "../../contexts/AuthContext";

export default function NewPostScreen() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [intro, setIntro] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const { accessToken, isAdmin } = useAuth();

  const handleSavePost = () => {
    if (!title || !author || !intro || !content) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const newPost = {
      title,
      author,
      intro,
      content,
      imageUrl: imageUrl || "",
      videoUrl: videoUrl || "",
    };

    console.log("Novo Post:", newPost);
    Alert.alert("Sucesso", "Post criado com sucesso!");
    const savePost = async () => {
      try {

        console.log("Acessando a API com o token:", accessToken);
        const response = await fetch("https://blog-posts-hori.onrender.com/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(newPost),
        });

        let data = null;
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        }

        if (!response.ok) {
          throw new Error(data?.message || "Erro ao salvar o post");
        }

        console.log("Post salvo com sucesso:", data);
      } catch (error) {
        console.error("Erro ao salvar o post:", error);
        Alert.alert("Erro", "Não foi possível enviar o post para a API.");
      }
    };

    savePost();
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

      <Button title="Salvar Post" onPress={handleSavePost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50, // Adiciona espaçamento superior
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