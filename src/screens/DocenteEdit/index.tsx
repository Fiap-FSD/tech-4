import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { IUser } from "../../types";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import UserForm from "../../components/FormUser/FormUser";
import { ActivityIndicator, Alert } from "react-native";

export default function EditDocenteScreen() {
  const { accessToken } = useAuth();
  const route = useRoute<RouteProp<{ params: { professorId: string } }, 'params'>>();
  const { professorId } = route.params; 
  const [professor, setProfessor] = useState<IUser | null>(null);
  const navigation = useNavigation();

  
  const loadProfessor = async () => {
    try {
      const response = await axios.get(`https://blog-posts-hori.onrender.com/user/${professorId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setProfessor(response.data); 
    } catch (err) {
      console.error("Erro ao carregar o professor:", err);
      Alert.alert("Erro", "Não foi possível carregar as informações do professor.");
    }
  };

  
  useEffect(() => {
    loadProfessor();
  }, [professorId]);

  const handleSubmit = async (values: IUser) => {
    try {
      
      await axios.put(`https://blog-posts-hori.onrender.com/user/${professorId}`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      navigation.goBack();
    } catch (err) {
      console.error("Erro ao editar professor:", err);
      Alert.alert("Erro", "Não foi possível editar as informações do professor. Tente novamente.");
    }
  };

 
  if (!professor) {    
    return <ActivityIndicator style={{ marginTop: 40 }} size="large" color={"#007AFF"} />;  
  }

  return <UserForm initialData={professor} onSubmit={handleSubmit} />;
}
