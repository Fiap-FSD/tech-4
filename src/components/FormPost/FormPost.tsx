import React from "react";
import { View, Text, TextInput, Button, ScrollView, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { styles } from "./styles";
import { PostFormProps } from "../../types";

// Esquema de validação com Yup
const validationSchema = Yup.object({
  title: Yup.string().min(3, "O título deve ter pelo menos 3 caracteres").required("Título é obrigatório"),
  author: Yup.string().required("Autor é obrigatório"),
  intro: Yup.string().max(150, "A introdução deve ter no máximo 150 caracteres").required("Introdução é obrigatória"),
  content: Yup.string().min(10, "O conteúdo deve ter pelo menos 10 caracteres").required("Conteúdo é obrigatório"),
  imageUrl: Yup.string(),
  videoUrl: Yup.string(),
});

export default function PostForm({ initialData, onSubmit }: PostFormProps) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        {initialData ? "Editar Post" : "Novo Post"}
      </Text>

      <Formik
        initialValues={{
          title: initialData?.title || "",
          author: initialData?.author || "",
          intro: initialData?.intro || "",
          content: initialData?.content || "",
          imageUrl: initialData?.imageUrl || "",
          videoUrl: initialData?.videoUrl || "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await onSubmit(values);
            Alert.alert("Sucesso", initialData ? "Post atualizado com sucesso!" : "Post criado com sucesso!");
            resetForm();
          } catch (error) {
            console.error("Erro:", error);
            Alert.alert("Erro", "Não foi possível salvar o post.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <View>
            {/* Campos de texto */}
            {[
              { label: "Título", name: "title" as const },
              { label: "Autor", name: "author" as const },
              { label: "Introdução", name: "intro" as const },
              { label: "URL da Imagem", name: "imageUrl" as const },
              { label: "URL do Vídeo", name: "videoUrl" as const },
            ].map(({ label, name }) => (
              <View key={name}>
                <Text style={styles.label}>{label}</Text>
                <TextInput
                  style={styles.input}
                  value={values[name]}
                  onChangeText={handleChange(name)}
                  onBlur={handleBlur(name)}
                  placeholder={`Digite ${label.toLowerCase()}`}
                />
                {touched[name] && errors[name] && (
                  <Text style={styles.error}>{errors[name]}</Text>
                )}
              </View>
            ))}

            {/* Campo conteúdo */}
            <Text style={styles.label}>Conteúdo</Text>
            <TextInput
              style={[styles.input, { height: 100 }]}
              value={values.content}
              onChangeText={handleChange("content")}
              onBlur={handleBlur("content")}
              placeholder="Digite o conteúdo"
              multiline
            />
            {touched.content && errors.content && (
              <Text style={styles.error}>{errors.content}</Text>
            )}

            <Button
              title={isSubmitting ? "Salvando..." : "Salvar"}
              onPress={handleSubmit as any}
              disabled={isSubmitting}
            />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}
