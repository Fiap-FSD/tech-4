// src/components/Footer.tsx
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Footer() {
  const navigation = useNavigation();
  const route = useRoute();

  const isHome = route.name === "Home";
  const isProfile = route.name === "Profile"; // nome da rota de logout

  return (
    <View style={{
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      paddingVertical: 10,
      backgroundColor: "#fff",
      borderTopWidth: 1,
      borderTopColor: "#ccc",
    }}>
      <TouchableOpacity onPress={() => navigation.navigate("Home" as never)}>
        <Ionicons name="home" size={28} color={isHome ? "#007AFF" : "#aaa"} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Profile" as never)}>
        <Ionicons name="person" size={28} color={isProfile ? "#007AFF" : "#aaa"} />
      </TouchableOpacity>
    </View>
  );
}
