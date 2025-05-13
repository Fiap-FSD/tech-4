import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TouchableWithoutFeedback, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthContext";
import { styles } from "./styles";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Header() {
  const navigation = useNavigation();
  const { isAdmin } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-SCREEN_WIDTH * 0.8)); // Animação inicial fora da tela

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(slideAnim, {
        toValue: -SCREEN_WIDTH * 0.8,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleNavigation = (route: string) => {
    toggleMenu();
    navigation.navigate(route as never);
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={toggleMenu}>
            <Text style={styles.textButton}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Blog Posts</Text>
        </View>
      </View>

      {menuVisible && (
        <>
          {/* Fundo opaco */}
          <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>

          {/* Menu lateral */}
          <Animated.View style={[styles.menuContainer, { left: slideAnim }]}>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation("Home")}>
              <Text style={styles.menuText}>Blog</Text>
            </TouchableOpacity>

            {isAdmin && (
              <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation("NewPost")}>
                <Text style={styles.menuText}>Novo Post</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation("Profile")}>
              <Text style={styles.menuText}>Perfil</Text>
            </TouchableOpacity>

            {isAdmin && (
              <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation("Docentes")}>
                <Text style={styles.menuText}>Professores</Text>
              </TouchableOpacity>
            )}

            {isAdmin && (
              <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation("Alunos")}>
                <Text style={styles.menuText}>Alunos</Text>
              </TouchableOpacity>
            )}
          </Animated.View>
        </>
      )}
    </>
  );
}
