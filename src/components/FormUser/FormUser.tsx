import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, ScrollView } from "react-native";
import { styles } from "./styles";
import { UserFormProps } from "../../types";


export default function PostForm({ initialData, onSubmit }: UserFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [role, setRole] = useState(initialData?.role || "");
  const [senha, setSenha] = useState(initialData?.senha || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !role || !senha ) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        name,
        email,
        role,
        senha,
      });
      Alert.alert("Sucesso", initialData ? "Usuário atualizado com sucesso!" : "Usupario criado com sucesso!");
    } catch (error) {
      console.error("Erro:", error);
      Alert.alert("Erro", "Não foi possível criar o usuário.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        {initialData ? "Editar Usuário" : "Novo Usuário"}
      </Text>

      {[
        { label: "Nome", value: name, setter: setName },
        { label: "Email", value: email, setter: setEmail },
        { label: "Role", value: role, setter: setRole },
        { label: "Senha", value: senha, setter: setSenha }
      ].map(({ label, value, setter }) => (
        <View key={label}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={setter}
            placeholder={`Digite ${label.toLowerCase()}`}
          />
        </View>
      ))}

      <Button
        title={isSubmitting ? "Salvando..." : "Salvar"}
        onPress={handleSubmit}
        disabled={isSubmitting}
      />
    </ScrollView>
  );
}


