import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Alert } from 'react-native'; // Se você estiver usando React Native
import { IPost } from '../types';

const API_BASE_URL = 'https://blog-posts-hori.onrender.com/post';

const usePosts = (accessToken: string) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(API_BASE_URL, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setPosts(res.data);
    } catch (err: any) {
      console.error("Erro ao buscar posts", err);
      setError("Erro ao buscar os posts.");
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  const deletePost = useCallback(async (id: string, onSuccess?: () => void) => {
    Alert.alert("Remover post?", "Essa ação não pode ser desfeita.", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: async () => {
          setLoading(true);
          setError(null);
          try {
            await axios.delete(`${API_BASE_URL}/${id}`, {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            if (onSuccess) {
              onSuccess(); // Chame a função de sucesso se fornecida
            } else {
              fetchPosts(); // Recarrega os posts após a exclusão, se não houver onSuccess
            }
          } catch (error: any) {
            console.error("Erro ao remover:", error);
            setError("Erro ao remover o post.");
            Alert.alert("Erro", "Erro ao remover o post.");
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  }, [accessToken, fetchPosts]);

  const createPost = useCallback(async (values: any) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(API_BASE_URL, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      fetchPosts(); // Recarrega os posts após a criação
    } catch (error: any) {
      console.error("Erro ao criar post:", error);
      setError("Erro ao criar o post.");
      Alert.alert("Erro", "Erro ao criar o post.");
    } finally {
      setLoading(false);
    }
  }, [accessToken, fetchPosts]);

  const updatePost = useCallback(async (postId: string, values: any) => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(`${API_BASE_URL}/${postId}`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      fetchPosts(); // Recarrega os posts após a atualização
    } catch (error: any) {
      console.error("Erro ao atualizar post:", error);
      setError("Erro ao atualizar o post.");
      Alert.alert("Erro", "Erro ao atualizar o post.");
    } finally {
      setLoading(false);
    }
  }, [accessToken, fetchPosts]);

  const getPostById = useCallback(async (postId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/${postId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error(`Erro ao buscar post com ID ${postId}:`, error);
      setError(`Erro ao buscar o post com ID ${postId}.`);
      Alert.alert("Erro", `Erro ao buscar o post com ID ${postId}.`);
      return null;
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  const filterPosts = useCallback((query: string) => {
    if (!query.trim()) {
      return posts;
    }
    const lowerCaseQuery = query.toLowerCase();
    return posts.filter((post) =>
      post.title.toLowerCase().includes(lowerCaseQuery) ||
      post.author.toLowerCase().includes(lowerCaseQuery) ||
      post.intro.toLowerCase().includes(lowerCaseQuery)
    );
  }, [posts]);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    deletePost,
    createPost,
    updatePost,
    getPostById,
    filterPosts, // Adicionamos a função de filtro
  };
};

export default usePosts;