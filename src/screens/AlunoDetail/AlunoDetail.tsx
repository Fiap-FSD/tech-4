import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, Alert, useWindowDimensions } from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthContext";
import { alunoDetailStyles } from "./styles";
import { WebView } from "react-native-webview";
import { IUser } from "../../types";

export default function AlunoDetailScreen() {
  const route = useRoute();
  const { id } = route.params as { id: string };
  const { accessToken } = useAuth();
  const [aluno, setAluno] = useState<IUser>();
  const [loading, setLoading] = useState(true);

  const fetchAluno = async () => {
    try {
      const res = await axios.get(`https://blog-posts-hori.onrender.com/user/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setAluno(res.data);
    } catch (err) {
      console.error("Erro ao buscar Aluno:", err);
      Alert.alert("Erro", "Não foi possível carregar as informações do Aluno.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAluno();
  }, []);

  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;
  

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} size="large" color={"#007AFF"} />;
  if (!aluno) return <Text style={{ marginTop: 40, textAlign: "center" }}>Aluno não encontrado</Text>;

  

  return (
    <ScrollView contentContainerStyle={alunoDetailStyles.container}>
      <View style={[alunoDetailStyles.contentWrapper, isLargeScreen && alunoDetailStyles.row]}>
        <View style={[alunoDetailStyles.textSection, isLargeScreen && alunoDetailStyles.textSectionLarge]}>
          <Text style={alunoDetailStyles.name}>{aluno.name}</Text>
          <Text style={alunoDetailStyles.email}>{aluno.email}</Text>
          <Text style={alunoDetailStyles.role}>Aluno</Text>
        </View>        
      </View>
    </ScrollView>
  );
}
