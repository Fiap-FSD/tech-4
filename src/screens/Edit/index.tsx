import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { IPost, RootStackParamList } from "../../types";
import { useRoute, RouteProp, useNavigation, NavigationProp } from "@react-navigation/native";
import PostForm from "../../components/FormPost/FormPost";
import { Alert, KeyboardAvoidingView, Platform, Text } from "react-native";
import usePosts from "../../hooks/usePosts";

export default function EditPostScreen() {
  const { accessToken } = useAuth();
  const route = useRoute<RouteProp<{ params: { postId: string } }, 'params'>>();
  const { postId } = route.params;
  const [post, setPost] = useState<IPost | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { getPostById, updatePost, loading, error } = usePosts(accessToken || "");

  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPost = await getPostById(postId);
      setPost(fetchedPost);
    };

    if (postId && accessToken) {
      fetchPost();
    }
  }, [postId, accessToken, getPostById]);

  const handleSubmit = async (values: IPost) => {
    if (postId) {
      await updatePost(postId, values);
      if (!error) {
        navigation.navigate("Home");
      } else {
        Alert.alert("Erro", "Não foi possível editar o post. Tente novamente.");
      }
    }
  };

  if (loading && !post) {
    return <Text>Carregando post...</Text>;
  }

  if (error && !post) {
    return <Text>Erro ao carregar o post.</Text>;
  }

  if (!post) {
    return null; // Ou outra mensagem de carregamento/erro
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={10}
    >
      <PostForm initialData={post} onSubmit={handleSubmit} />
    </KeyboardAvoidingView>
  );
}