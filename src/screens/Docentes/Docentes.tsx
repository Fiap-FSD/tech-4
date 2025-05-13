import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Alert, ActivityIndicator, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { RootStackParamList } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";

import { docentesStyles } from "./styles";


export default function DocentesScreen() { 
  
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  const { accessToken, isAuthenticated, isAdmin } = useAuth();
  const [professores, setProfessores] = useState<any[]>([]);
  const [filteredProfessores, setFilteredProfessores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); 

  const fetchProfessores = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://blog-posts-hori.onrender.com/user", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const onlyProfessores = res.data.filter((user: any) => user.role === "admin");

      setProfessores(onlyProfessores);
      setFilteredProfessores(onlyProfessores);
    } catch (err) {
      console.error("Erro ao buscar posts", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredProfessores(professores);
    } else {
      const filtered = professores.filter((professore) =>
        professore.name?.toLowerCase().includes(query.toLowerCase()) ||
        professore.email?.toLowerCase().includes(query.toLowerCase()) ||
        professore.role?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProfessores(filtered);
    }
  };

  const handleRemove = async (id: string) => {
    Alert.alert("Remover Professor?", "Essa ação não pode ser desfeita.", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`https://blog-posts-hori.onrender.com/user/${id}`, {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            fetchProfessores();
          } catch (error) {
            console.error("Erro ao remover:", error);
            Alert.alert("Erro", "Erro ao remover o professor.");
          }
        },
      },
    ]);
  };

  useEffect(() => {
    fetchProfessores();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} size="large" color={"#007AFF"} />;

  
  return (
      <View style={docentesStyles.container}>
        <Text style={docentesStyles.title}>Professores</Text>
            
        <View style={docentesStyles.searchContainer}>
          <View style={docentesStyles.searchWrapper}>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/622/622669.png" }} // Ícone de lupa
              style={docentesStyles.searchIcon}
            />
            <TextInput
              style={docentesStyles.searchInput}
              value={searchQuery}
              onChangeText={handleSearch}
              placeholder="Buscar por Professor"
            />
          </View>
        </View>
      
          <FlatList
            data={filteredProfessores} // Usa os posts filtrados
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={docentesStyles.professorCard}
                onPress={() => navigation.navigate("DocenteDetail", { id: item._id })}
              >
                <View style={{ flex: 1 }}>
                  <Text style={docentesStyles.professorName}>{item.name}</Text>
                  <Text style={docentesStyles.professorEmail}>{item.email}</Text>
                  <Text numberOfLines={2} style={docentesStyles.professorRole}>
                    Professor
                  </Text>
                </View>
    
                {isAdmin && (
                  <View style={docentesStyles.professorActions}>
                    <TouchableOpacity onPress={() => handleRemove(item._id)}>
                      <AntDesign name="delete" size={24} color="red" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("EditDocenteScreen", { professorId: item._id })}>
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