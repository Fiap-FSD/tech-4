import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { IPost } from "../../types";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native"; // Para pegar o id do post
import PostForm from "../../components/FormPost/FormPost";
import { Alert, Text } from "react-native";

export default function EditPostScreen() {
  const { accessToken } = useAuth();
  const route = useRoute<RouteProp<{ params: { postId: string } }, 'params'>>();
  const { postId } = route.params; 
  const [post, setPost] = useState<IPost | null>(null);
  const navigation = useNavigation();

  // Função para carregar o post a ser editado
  const loadPost = async () => {
    try {
      const response = await axios.get(`https://blog-posts-hori.onrender.com/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setPost(response.data); // Definindo os dados do post no estado
    } catch (err) {
      console.error("Erro ao carregar o post:", err);
      Alert.alert("Erro", "Não foi possível carregar o post.");
    }
  };

  // Carregar o post ao montar o componente
  useEffect(() => {
    loadPost();
  }, [postId]);

  const handleSubmit = async (values: IPost) => {
    try {
      // Enviando os dados editados do post para a API usando axios
      await axios.put(`https://blog-posts-hori.onrender.com/post/${postId}`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      navigation.goBack();
    } catch (err) {
      console.error("Erro ao editar post:", err);
      Alert.alert("Erro", "Não foi possível editar o post. Tente novamente.");
    }
  };

  // Verificar se o post está carregado
  if (!post) {
    return <Text>Carregando...</Text>; // Exibe um carregando enquanto o post não for carregado
  }

  return <PostForm initialData={post} onSubmit={handleSubmit} />;
}
