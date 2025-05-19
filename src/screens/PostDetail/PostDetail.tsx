import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, Alert, useWindowDimensions } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthContext";
import { postDetailStyles } from "./styles";
import { WebView } from "react-native-webview";
import usePosts from "../../hooks/usePosts";

export default function PostDetailScreen() {
  const route = useRoute();
  const { id } = route.params as { id: string };
  const { accessToken } = useAuth();
  const [post, setPost] = useState<any>(null);
  const { getPostById, loading, error } = usePosts(accessToken || "");
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;

  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPost = await getPostById(id);
      setPost(fetchedPost);
    };

    if (id && accessToken) {
      fetchPost();
    }
  }, [id, accessToken, getPostById]);

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} size="large" color={"#007AFF"} />;
  if (error) return <Text style={{ marginTop: 40, textAlign: "center" }}>Erro ao carregar o post.</Text>;
  if (!post) return <Text style={{ marginTop: 40, textAlign: "center" }}>Post não encontrado</Text>;

  return (
    <ScrollView contentContainerStyle={postDetailStyles.container}>
      <View style={[postDetailStyles.contentWrapper, isLargeScreen && postDetailStyles.row]}>
        <View style={[postDetailStyles.textSection, isLargeScreen && postDetailStyles.textSectionLarge]}>
          <Text style={postDetailStyles.title}>{post.title}</Text>
          <Text style={postDetailStyles.author}>{post.author}</Text>
          <Text style={postDetailStyles.intro}>{post.intro}</Text>
          <Text style={postDetailStyles.content}>{post.content}</Text>
        </View>

        <View style={[postDetailStyles.mediaSection, isLargeScreen && postDetailStyles.mediaSectionLarge]}>
          {post.imageUrl && (
            <Image
              source={{ uri: post.imageUrl }}
              style={postDetailStyles.image}
              resizeMode="cover"
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}