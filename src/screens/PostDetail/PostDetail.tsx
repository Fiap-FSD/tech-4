import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, Alert, useWindowDimensions } from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthContext";
import { postDetailStyles } from "./styles";
import { WebView } from "react-native-webview";

export default function PostDetailScreen() {
  const route = useRoute();
  const { id } = route.params as { id: string };
  const { accessToken } = useAuth();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`https://blog-posts-hori.onrender.com/post/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setPost(res.data);
    } catch (err) {
      console.error("Erro ao buscar post:", err);
      Alert.alert("Erro", "Não foi possível carregar o post.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;

  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
    const videoId = match ? match[1] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} size="large" />;
  if (!post) return <Text style={{ marginTop: 40, textAlign: "center" }}>Post não encontrado</Text>;

  const videoEmbedUrl = post.videoUrl ? getYouTubeEmbedUrl(post.videoUrl) : null;

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
          <Image
            source={{ uri: post.imageUrl || "https://via.placeholder.com/300" }}
            style={postDetailStyles.image}
            resizeMode="cover"
          />

          {videoEmbedUrl && (
            <View style={postDetailStyles.videoContainer}>
              <WebView
                source={{ uri: videoEmbedUrl }}
                style={postDetailStyles.video}
                allowsFullscreenVideo
              />
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
