import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { IUser, IUserEdit } from "../../types";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native"; 
import UserForm from "../../components/FormUser/FormUser";
import { ActivityIndicator, Alert } from "react-native";

export default function EditAlunoScreen() {
  const { accessToken } = useAuth();
  const route = useRoute<RouteProp<{ params: { alunoId: string } }, 'params'>>();
  const { alunoId } = route.params; 
  const [aluno, setAluno] = useState<IUser | null>(null);
  const navigation = useNavigation();

  const loadAluno = async () => {
    try {
      const response = await axios.get(`https://blog-posts-hori.onrender.com/user/${alunoId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setAluno(response.data); 
    } catch (err) {
      console.error("Erro ao carregar o aluno:", err);
      Alert.alert("Erro", "Não foi possível carregar as informações do aluno.");
    }
  };

  
  useEffect(() => {
    loadAluno();
  }, [alunoId]);

  const handleSubmit = async (values: IUserEdit) => {
    try {
      
      await axios.put(`https://blog-posts-hori.onrender.com/user/${alunoId}`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      navigation.goBack();
    } catch (err) {
      console.error("Erro ao editar aluno:", err);
      Alert.alert("Erro", "Não foi possível editar as informações do aluno. Tente novamente.");
    }
  };
  

  if (!aluno) {
    return <ActivityIndicator style={{ marginTop: 40 }} size="large" color={"#007AFF"} />;
  }

  return <UserForm initialData={aluno} onSubmit={handleSubmit} />;
}
