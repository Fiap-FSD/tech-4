import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {loginStyles} from './styles';

const validationSchema = Yup.object({
  email: Yup.string().email('E-mail inválido').required('Informe o e-mail'),
  password: Yup.string().required('Informe a senha'),
});

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth(); // use isso dentro do componente

  const handleLogin = async (values: { email: string; password: string }) => {
    setError('');
    try {
      const response = await axios.post('https://blog-posts-hori.onrender.com/auth/login', values);
      const token = response.data?.access_token;
  
      if (token) {
        await login(token); // usa o contexto
        navigation.replace('Home');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Erro ao fazer login');
      console.error(err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1}}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={10}
    >
      <ScrollView
        contentContainerStyle={loginStyles.container}
        keyboardShouldPersistTaps="handled"
      >
        
          <Text style={loginStyles.title}>Bem-vindo ao Blog Posts</Text>
          <Text style={loginStyles.subtitle}>
            Descubra histórias incríveis, novidades do mundo tech e muito mais!
          </Text>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
      <View style={loginStyles.form}>
        <TextInput
          style={loginStyles.input}
          placeholder="E-mail"
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {touched.email && errors.email && (
          <Text style={loginStyles.error}>{errors.email}</Text>
        )}

        {/* Campo de senha com botão embutido */}
        <View style={loginStyles.passwordWrapper}>
          <TextInput
            style={loginStyles.input}
            placeholder="Senha"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={loginStyles.eyeIcon}
            onPress={() => setShowPassword((prev) => !prev)}
          >            
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off' : 'eye'}
              style={loginStyles.showPasswordSymbol}
              size={24}
              color="#111827" 
            />            
          </TouchableOpacity>
        </View>
        {touched.password && errors.password && (
          <Text style={loginStyles.error}>{errors.password}</Text>
        )}

        {error ? <Text style={loginStyles.error}>{error}</Text> : null}

          <TouchableOpacity style={loginStyles.button} onPress={() => handleSubmit()} disabled={isSubmitting}>
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={loginStyles.buttonText}>Entrar</Text>
            )}
          </TouchableOpacity>
        </View>
        )}
      </Formik>
        
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;


