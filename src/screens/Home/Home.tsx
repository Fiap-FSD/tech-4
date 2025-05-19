import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Alert, ActivityIndicator, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthContext";
import { homeStyles } from "./styles"; 
import { RootStackParamList } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";
import usePosts from "../../hooks/usePosts";

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { accessToken, isAdmin } = useAuth();
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]); 
  const [searchQuery, setSearchQuery] = useState("");
  const { fetchPosts, deletePost, posts, loading, filterPosts } = usePosts(accessToken || "");

  useEffect(() => {
    if (accessToken) {
      fetchPosts();
    }
  }, [accessToken, fetchPosts]);

  useEffect(() => {
    setFilteredPosts(posts); 
  }, [posts]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const results = filterPosts(query);
    setFilteredPosts(results);
  };

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
                <TouchableOpacity onPress={() => deletePost(item._id)}>
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