import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, ScrollView } from "react-native";
import { styles } from "./styles";
import { PostFormProps } from "../../types";


export default function PostForm({ initialData, onSubmit }: PostFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [intro, setIntro] = useState(initialData?.intro || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title || !author || !intro || !content) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        title,
        author,
        intro,
        content,
        imageUrl,
        videoUrl,
      });
      Alert.alert("Sucesso", initialData ? "Post atualizado com sucesso!" : "Post criado com sucesso!");
    } catch (error) {
      console.error("Erro:", error);
      Alert.alert("Erro", "Não foi possível salvar o post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        {initialData ? "Editar Post" : "Novo Post"}
      </Text>

      {[
        { label: "Título", value: title, setter: setTitle },
        { label: "Autor", value: author, setter: setAuthor },
        { label: "Introdução", value: intro, setter: setIntro },
        { label: "URL da Imagem", value: imageUrl, setter: setImageUrl },
        { label: "URL do Vídeo", value: videoUrl, setter: setVideoUrl },
      ].map(({ label, value, setter }) => (
        <View key={label}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={setter}
            placeholder={`Digite ${label.toLowerCase()}`}
          />
        </View>
      ))}

      <Text style={styles.label}>Conteúdo</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={content}
        onChangeText={setContent}
        placeholder="Digite o conteúdo"
        multiline
      />

      <Button
        title={isSubmitting ? "Salvando..." : "Salvar"}
        onPress={handleSubmit}
        disabled={isSubmitting}
      />
    </ScrollView>
  );
}


