import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { IPost, RootStackParamList } from "../../types";
import PostForm from "../../components/FormPost/FormPost";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import usePosts from "../../hooks/usePosts";

export default function NewPostScreen() {
  const { accessToken } = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { createPost, error } = usePosts(accessToken || "");

  const handleSubmit = async (values: IPost) => {
    await createPost(values);
    if (!error) {
      navigation.navigate("Home");
    } else {
      Alert.alert("Erro", "Não foi possível criar o post. Tente novamente.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={10}
    >
      <PostForm onSubmit={handleSubmit} />
    </KeyboardAvoidingView>
  );
}