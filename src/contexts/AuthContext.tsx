// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from "jwt-decode";
import { IAuthContextProps } from "../types";

const AuthContext = createContext<IAuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        setAccessToken(token);
        decodeAndSetUserInfo(token);
      } else {
        // Se não houver token, você pode fazer algo aqui, como limpar os dados de usuário
        setAccessToken(null);
        setName(null);
        setIsAdmin(false);
      }
    };
    loadToken();
  }, [accessToken]);  // O useEffect será disparado sempre que o accessToken mudar

  const decodeAndSetUserInfo = (token: string) => {
    const decoded: any = jwtDecode(token);
    const isAdmin = decoded.role === "admin";
    setName(decoded.name); 
    console.log("Decoded token:", decoded);
    console.log("Is admin:", isAdmin);
    setIsAdmin(isAdmin);
  };

  const login = async (token: string) => {
    await AsyncStorage.setItem("accessToken", token);
    setAccessToken(token);
  };

  const logout = async () => {
    await AsyncStorage.clear(); // Limpa todos os dados do AsyncStorage
    console.log("Token removed from AsyncStorage");
    setAccessToken(null);
    setName(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, isAuthenticated: !!accessToken, login, logout, isAdmin, name }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};