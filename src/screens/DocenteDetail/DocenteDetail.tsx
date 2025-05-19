import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, Alert, useWindowDimensions } from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthContext";
import { postDetailStyles } from "./styles";
import { IUser } from "../../types";

export default function DocenteDetailScreen() {
  const route = useRoute();
  const { id } = route.params as { id: string };
  const { accessToken } = useAuth();
  const [professor, setProfessor] = useState<IUser>();
  const [loading, setLoading] = useState(true);

  const fetchProfessor = async () => {
    try {
      const res = await axios.get(`https://blog-posts-hori.onrender.com/user/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setProfessor(res.data);
    } catch (err) {
      console.error("Erro ao buscar professor:", err);
      Alert.alert("Erro", "Não foi possível carregar as informações do Professor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessor();
  }, []);

  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;


  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} size="large" color={"#007AFF"} />;
  if (!professor) return <Text style={{ marginTop: 40, textAlign: "center" }}>Professor não encontrado</Text>;


  return (
    <ScrollView contentContainerStyle={postDetailStyles.container}>
      <View style={[postDetailStyles.contentWrapper, isLargeScreen && postDetailStyles.row]}>
        <View style={[postDetailStyles.textSection, isLargeScreen && postDetailStyles.textSectionLarge]}>
          <Text style={postDetailStyles.name}>{professor.name}</Text>
          <Text style={postDetailStyles.email}>{professor.email}</Text>
          <Text style={postDetailStyles.role}>Professor</Text>
        </View>

        <View style={[postDetailStyles.mediaSection, isLargeScreen && postDetailStyles.mediaSectionLarge]}>
          
        </View>
      </View>
    </ScrollView>
  );
}
