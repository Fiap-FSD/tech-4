import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, Alert, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { styles } from "./styles";
import { IFormRegisterUser } from "../../types";
import { Picker } from "@react-native-picker/picker";


const validationSchema = Yup.object({
    name: Yup.string()
        .min(3, "O nome deve possuir pelo menos 3 caracteres")
        .required("Por favor, informe o seu nome"),
    email: Yup.string()
        .email("Por favor, informe um e-mail válido")
        .required("Por favor, informe o seu email"),
    role: Yup.string()
        .required("Por favor, informe o seu cargo"),
    password: Yup.string()
        .min(8, "A senha deve possuir pelo menos 8 caracteres")
        .required("Por favor, informe sua senha"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "As senhas devem ser iguais!")
        .required("Confirme sua senha!"),
});

export default function Register({ navigation }: any) {
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleRegister = async (
        values: IFormRegisterUser,
        { resetForm }: { resetForm: () => void }
    ) => {
        const { confirmPassword, ...user } = values;
        setError("");

        try {
            await axios.post("https://blog-posts-hori.onrender.com/auth/register", user);
            Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
            resetForm();
        } catch (err: any) {
            const msg = err.response?.data?.message || "Erro ao cadastrar usuário.";
            setError(msg);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1}}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={10} // ajuste se necessário conforme sua UI
        >
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.heading}>Crie sua Conta</Text>
                <Text style={styles.subheading}>Junte-se a nós e compartilhe suas ideias!</Text>

                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        role: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                        isSubmitting,
                        isValid,
                    }) => (
                        <View>
                            {/* Campo Nome */}
                            <View style={styles.field}>
                                <Text style={styles.label}>Nome</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Digite seu nome"
                                    onChangeText={handleChange("name")}
                                    onBlur={handleBlur("name")}
                                    value={values.name}
                                />
                                {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}
                            </View>

                            {/* Campo Email */}
                            <View style={styles.field}>
                                <Text style={styles.label}>E-mail</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Digite seu e-mail"
                                    onChangeText={handleChange("email")}
                                    onBlur={handleBlur("email")}
                                    value={values.email}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                                {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
                            </View>
                            {/* Campo Role */}
                            <View style={styles.field}>
                                <Text style={styles.label}>Cargo</Text>
                                <View style={styles.pickerWrapper}>
                                    <Picker
                                        selectedValue={values.role}
                                        onValueChange={(itemValue) => {
                                            handleChange("role")(itemValue);
                                        }}
                                        onBlur={handleBlur("role")}
                                    >
                                        <Picker.Item label="Selecione um cargo" value="" />
                                        <Picker.Item label="Professor" value="admin" />
                                        <Picker.Item label="Aluno" value="user" />
                                    </Picker>
                                </View>
                                {touched.role && errors.role && <Text style={styles.error}>{errors.role}</Text>}
                            </View>


                            {/* Campo Senha */}
                            <View style={styles.field}>
                                <Text style={styles.label}>Senha</Text>
                                <View style={styles.passwordWrapper}>
                                <TextInput
                                    style={styles.inputSenha}
                                    placeholder="Digite sua senha"
                                    secureTextEntry={!showPassword}
                                    onChangeText={handleChange("password")}
                                    onBlur={handleBlur("password")}
                                    value={values.password}
                                />
                                <TouchableOpacity
                                    onPress={() => setShowPassword((prev) => !prev)}
                                    style={styles.eyeIcon}
                                >
                                    <Text style={styles.eyeText}>{showPassword ? "Mostrar" : "Ocultar"}</Text>
                                </TouchableOpacity>
                                </View>
                                {touched.password && errors.password && (
                                    <Text style={styles.error}>{errors.password}</Text>
                                )}
                            </View>

                            {/* Campo Confirmar Senha */}
                            <View style={styles.passwordWrapper}>
                            {/* <Text style={styles.label}>Confirme sua senha</Text> */}

                            <TextInput
                                style={styles.inputSenha}
                                placeholder="Confirme sua senha"
                                secureTextEntry={!showConfirmPassword}
                                onChangeText={handleChange("confirmPassword")}
                                onBlur={handleBlur("confirmPassword")}
                                value={values.confirmPassword}
                            />

                            <TouchableOpacity
                                onPress={() => setShowConfirmPassword((prev) => !prev)}
                                style={styles.eyeIcon}
                            >
                                <Text style={styles.eyeText}>{showConfirmPassword ? "Mostrar" : "Ocultar"}</Text>
                            </TouchableOpacity>

                            {touched.confirmPassword && errors.confirmPassword && (
                                <Text style={styles.error}>{errors.confirmPassword}</Text>
                            )}
                            </View>

                            {error ? <Text style={styles.error}>{error}</Text> : null}

                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    (!isValid || isSubmitting) && { backgroundColor: "#aaa" }, // estilo de botão desativado
                                ]}
                                onPress={() => handleSubmit()}
                                disabled={isSubmitting || !isValid}
                            >
                                {isSubmitting ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.buttonText}>Cadastrar</Text>
                                )}
                            </TouchableOpacity>


                            {isSubmitting && <ActivityIndicator style={{ marginTop: 10 }} color="#00cc99" />}
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
