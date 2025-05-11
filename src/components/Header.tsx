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
      <TouchableOpacity onPress={toggleMenu}>
        <Text style={styles.menuButton}>☰ Menu</Text>
      </TouchableOpacity>
      

      {menuVisible && (
        <View style={styles.menu}>
          {/* <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate("Home" as never);
            }}
          >
            <Text style={styles.menuText}>Home</Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              navigation.navigate("Blog" as never);
            }}
          >
            <Text style={styles.menuText}>Blog</Text>
          </TouchableOpacity> */}

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

          

          {isAdmin && (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate("Users" as never);
              }}
            >
              <Text style={styles.menuText}>Usuários</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  menuButton: {
    color: "#fff",
    fontSize: 18,
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
    fontSize: 16,
    color: "#007AFF",
  },
});