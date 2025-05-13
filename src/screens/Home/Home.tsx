import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Alert, ActivityIndicator, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { homeStyles } from "./styles"; // importando os estilos
import { RootStackParamList } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { accessToken, isAuthenticated, isAdmin } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]); // Estado para posts filtrados
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para o campo de busca

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://blog-posts-hori.onrender.com/post", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setPosts(res.data);
      setFilteredPosts(res.data); // Inicializa os posts filtrados com todos os posts
    } catch (err) {
      console.error("Erro ao buscar posts", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredPosts(posts); // Mostra todos os posts se o campo de busca estiver vazio
    } else {
      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.author.toLowerCase().includes(query.toLowerCase()) ||
        post.intro.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPosts(filtered);
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

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} size="large" color={"#007AFF"} />;

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.title}>Postagens</Text>
      
      <View style={homeStyles.searchContainer}>
      <View style={homeStyles.searchWrapper}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/622/622669.png" }} // Ícone de lupa
          style={homeStyles.searchIcon}
        />
        <TextInput
          style={homeStyles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Buscar por título, autor ou introdução"
        />
      </View>
    </View>

      <FlatList
        data={filteredPosts} // Usa os posts filtrados
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={homeStyles.postCard}
            onPress={() => navigation.navigate("PostDetail", { id: item._id })}
          >
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
                  <AntDesign name="delete" size={24} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("EditPostScreen", { postId: item._id })}>
                  <AntDesign name="edit" size={24} color="blue" />
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}