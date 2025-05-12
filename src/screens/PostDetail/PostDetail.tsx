import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

export default function PostDetailsScreen({ route }: any) {
  const { post } = route.params; // Recebe o post selecionado da Home

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.author}>Por: {post.author}</Text>
      <Image
        source={{ uri: post.imageUrl || "https://via.placeholder.com/300" }}
        style={styles.image}
      />
      <Text style={styles.intro}>{post.intro}</Text>
      <Text style={styles.content}>{post.content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  intro: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
});