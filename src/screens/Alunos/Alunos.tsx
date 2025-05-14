import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Alert, ActivityIndicator, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { RootStackParamList } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";

import { alunosStyles } from "./styles";

export default function AlunosScreen() { 
  
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  const { accessToken, isAdmin } = useAuth();
  const [alunos, setAlunos] = useState<any[]>([]);
  const [filteredAlunos, setFilteredAlunos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); 

  const fetchAlunos = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://blog-posts-hori.onrender.com/user", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const onlyAlunos = res.data.filter((user: any) => user.role === "user");
      
      setAlunos(onlyAlunos);
      setFilteredAlunos(onlyAlunos);
    } catch (err) {
      console.error("Erro ao buscar posts", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredAlunos(alunos);
    } else {
      const filtered = alunos.filter((aluno) =>
        aluno.name?.toLowerCase().includes(query.toLowerCase()) ||
        aluno.email?.toLowerCase().includes(query.toLowerCase()) ||
        aluno.role?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredAlunos(filtered);
    }
  };

  const handleRemove = async (id: string) => {
    Alert.alert("Remover Aluno?", "Essa ação não pode ser desfeita.", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`https://blog-posts-hori.onrender.com/user/${id}`, {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            fetchAlunos();
          } catch (error) {
            console.error("Erro ao remover:", error);
            Alert.alert("Erro", "Erro ao remover o aluno.");
          }
        },
      },
    ]);
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} size="large" color={"#007AFF"} />;

  
  return (
    <View style={alunosStyles.container}>
      <Text style={alunosStyles.title}>Alunos</Text>
          
      <View style={alunosStyles.searchContainer}>
        <View style={alunosStyles.searchWrapper}>
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/622/622669.png" }} 
            style={alunosStyles.searchIcon}
          />
          <TextInput
            style={alunosStyles.searchInput}
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Buscar por Aluno"
          />
        </View>
      </View>
    
        <FlatList
          data={filteredAlunos}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={alunosStyles.alunoCard}
              onPress={() => navigation.navigate("AlunoDetail", { id: item._id })}
            >
              <View style={{ flex: 1 }}>
                <Text style={alunosStyles.alunoName}>{item.name}</Text>
                <Text style={alunosStyles.alunoEmail}>{item.email}</Text>
                <Text numberOfLines={2} style={alunosStyles.alunoRole}>
                  Aluno
                </Text>
              </View>
  
              {isAdmin && (
                <View style={alunosStyles.alunoActions}>
                  <TouchableOpacity onPress={() => handleRemove(item._id)}>
                    <AntDesign name="delete" size={24} color="red" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate("EditAlunoScreen", { alunoId: item._id })}>
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