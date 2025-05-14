import React from "react";
import { useAuth } from "../../contexts/AuthContext";

import axios from "axios";
import { IPost } from "../../types";
import PostForm from "../../components/FormPost/FormPost";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function NewPostScreen() {
  const { accessToken } = useAuth();
  const navigation = useNavigation();

  const handleSubmit = async (values: IPost) => {
    try {
      // Enviando os dados do post para a API usando axios
      await axios.post("https://blog-posts-hori.onrender.com/post", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      navigation.goBack();
    } catch (err) {
      console.error("Erro ao criar post:", err);
      Alert.alert("Erro", "Não foi possível criar o post. Tente novamente.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={10} // ajuste se necessário
    >
      <PostForm onSubmit={handleSubmit} />
    </KeyboardAvoidingView>
  );
}
