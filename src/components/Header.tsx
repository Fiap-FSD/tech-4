import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const navigation = useNavigation();
  const { isAdmin } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.header}>

      <View style={styles.headerRow}></View>

        <View style={{ flex: 1 }} /> {/* Espaço à esquerda */}

        <Text style={styles.title}>Blog Posts</Text>

        <TouchableOpacity onPress={toggleMenu} style={styles.buttonContainer}>
          <Text style={styles.textButton}>☰</Text>
        </TouchableOpacity>

      <View />
      

      {menuVisible && (
        <View style={styles.menu}>
          
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate("Home" as never);
            }}
          >
            <Text style={styles.menuText}>Blog</Text>
          </TouchableOpacity>

          {/* {isAdmin && ( */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate("NewPost" as never);
              }}
            >
              <Text style={styles.menuText}>Novo Post</Text>
            </TouchableOpacity>
          {/* )} */}

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate("Profile" as never);
            }}
          >
            <Text style={styles.menuText}>Perfil</Text>
          </TouchableOpacity>

          

          {/* {isAdmin && ( */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate("Users" as never);
              }}
            >
              <Text style={styles.menuText}>Usuários</Text>
            </TouchableOpacity>
          {/* )} */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    position: 'absolute',
    top: 15,
    right: 15
  },
  textButton: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  menu: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuText: {    
    textAlign: "center",
    fontSize: 16,
    color: "#007AFF",
  },
});