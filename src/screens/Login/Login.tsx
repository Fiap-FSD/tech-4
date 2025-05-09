import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import {loginStyles} from './styles';

const validationSchema = Yup.object({
  email: Yup.string().email('E-mail inválido').required('Informe o e-mail'),
  password: Yup.string().required('Informe a senha'),
});

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [error, setError] = useState('');

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
    <View style={loginStyles.container}>
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
            {touched.email && errors.email && <Text style={loginStyles.error}>{errors.email}</Text>}

            <TextInput
              style={loginStyles.input}
              placeholder="Senha"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && <Text style={loginStyles.error}>{errors.password}</Text>}

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

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={loginStyles.link}>Não tem uma conta? Cadastre-se aqui</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;


