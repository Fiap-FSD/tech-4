import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Formik } from "formik";
import * as Yup from "yup";
import { styles } from "./styles";
import { UserFormProps } from "../../types";



const validationSchema = Yup.object({
  name: Yup.string().required("Nome é obrigatório"),
  currentPassword: Yup.string(),
  password: Yup.string()
    .min(6, "A nova senha deve ter pelo menos 6 caracteres")
    .when("currentPassword", {
      is: (val: string) => !!val?.length, // se currentPassword estiver preenchida
      then: (schema) => schema.required("Nova senha é obrigatória"),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export default function UserForm({ initialData, onSubmit }: UserFormProps) {

  const [showPasswords, setShowPasswords] = useState({
  currentPassword: false,
  password: false,
});
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        {initialData ? "Editar Usuário" : "Novo Usuário"}
      </Text>

      <Formik
        initialValues={{
          name: initialData?.name || "",
          currentPassword: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await onSubmit(values);
            Alert.alert("Sucesso", initialData ? "Usuário atualizado com sucesso!" : "Usuário criado com sucesso!");
            resetForm();
          } catch (error) {
            console.error("Erro:", error);
            Alert.alert("Erro", "Não foi possível salvar o usuário.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <View>
            {[
              { label: "Nome", name: "name" as const },
              { label: "Senha Atual", name: "currentPassword" as const, secure: true },
              { label: "Nova Senha", name: "password" as const, secure: true },
            ].map(({ label, name, secure }) => (
              <View key={name} style={secure ? styles.passwordWrapper : undefined}>
                <Text style={styles.label}>{label}</Text>

                <TextInput
                  style={styles.input}
                  value={values[name]}
                  onChangeText={handleChange(name)}
                  onBlur={handleBlur(name)}
                  placeholder={`Digite ${label.toLowerCase()}`}
                  secureTextEntry={secure ? !showPasswords[name] : false}
                />

                {secure && (
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        [name]: !prev[name],
                      }))
                    }
                  >
                    <MaterialCommunityIcons
                      name={showPasswords[name]? 'eye-off' : 'eye'}
                      style={styles.showPasswordSymbol}
                      size={24}
                      color="#111827" 
                  /> 
                  </TouchableOpacity>
                )}

                {touched[name] && errors[name] && (
                  <Text style={styles.error}>{errors[name]}</Text>
                )}
              </View>
            ))}

            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()} disabled={isSubmitting}>
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Salvar</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}
