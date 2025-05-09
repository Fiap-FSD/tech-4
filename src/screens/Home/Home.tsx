// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { homeStyles } from "./styles"; // importando os estilos
import Footer from "../../components/Footer";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { accessToken, isAuthenticated, isAdmin } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://blog-posts-hori.onrender.com/post", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setPosts(res.data);
    } catch (err) {
      console.error("Erro ao buscar posts", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id: string) => {
    Alert.alert("Remover post?", "Essa ação não pode ser desfeita.", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`https://blog-posts-hori.onrender.com/post/${id}`, {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            fetchPosts();
          } catch (error) {
            console.error("Erro ao remover:", error);
            Alert.alert("Erro", "Erro ao remover o post.");
          }
        },
      },
    ]);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} size="large" />;

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.title}>Postagens</Text>

      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={homeStyles.postCard}>
            <Image
              source={{ uri: item.imageUrl || "https://via.placeholder.com/100" }}
              style={homeStyles.postImage}
            />
            <View style={{ flex: 1 }}>
              <Text style={homeStyles.postTitle}>{item.title}</Text>
              <Text style={homeStyles.postAuthor}>{item.author}</Text>
              <Text numberOfLines={2} style={homeStyles.postIntro}>
                {item.intro}
              </Text>
            </View>

            {isAdmin && (
              <View style={homeStyles.postActions}>
                <TouchableOpacity onPress={() => handleRemove(item._id)}>
                  <Text style={homeStyles.removeText}>Remover</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={homeStyles.editText}>Editar</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
      <Footer/>
    </View>
  );
}
