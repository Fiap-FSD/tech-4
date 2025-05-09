import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const { logout, name } = useAuth();
  const navigation = useNavigation<{
    reset: (state: { index: number; routes: { name: "Login" }[] }) => void;
  }>();

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Olá, {name}!</Text>
      <TouchableOpacity
        style={{ backgroundColor: "red", padding: 12, borderRadius: 8 }}
        onPress={handleLogout}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
