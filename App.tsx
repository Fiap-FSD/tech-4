import 'react-native-gesture-handler'; // deve vir no topo
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/Login/Login';
import { AuthProvider } from './src/contexts/AuthContext';

import Header from './src/components/Header/Header';

import HomeScreen from './src/screens/Home/Home';
import ProfileScreen from './src/screens/Profile/Profile';
import NewPostScreen from './src/screens/NewPost/NewPost';
import PostDetailScreen from './src/screens/PostDetail/PostDetail';
import EditPostScreen from './src/screens/Edit';
import DocentesScreen from './src/screens/Docentes/Docentes';
import AlunosScreen from './src/screens/Alunos/Alunos';
import DocenteDetailScreen from './src/screens/DocenteDetail/DocenteDetail';
import AlunoDetailScreen from './src/screens/AlunoDetail/AlunoDetail';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" >
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={({ navigation }) => ({
              header: () => <Header />
            })}
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options={({ navigation }) => ({
              header: () => <Header />
            })}
          />          
          <Stack.Screen 
            name="NewPost" 
            component={NewPostScreen}
            options={({ navigation }) => ({
              header: () => <Header />
            })}  
          />          
          <Stack.Screen 
            name="PostDetail" 
            component={PostDetailScreen}
            options={({ navigation }) => ({
              header: () => <Header />
            })}
          />
         <Stack.Screen
            name="EditPostScreen"
            component={EditPostScreen}
            options={({ navigation }) => ({
              header: () => <Header />
            })}
          />
          <Stack.Screen 
            name="Docentes" 
            component={DocentesScreen}
            options={({ navigation }) => ({
              header: () => <Header />
            })}
          />
          <Stack.Screen 
            name="Alunos" 
            component={AlunosScreen}
            options={({ navigation }) => ({
              header: () => <Header />
            })}
          />
          <Stack.Screen 
            name="DocenteDetail" 
            component={DocenteDetailScreen}
            options={({ navigation }) => ({
              header: () => <Header />
            })}
          />
          <Stack.Screen 
            name="AlunoDetail" 
            component={AlunoDetailScreen}
            options={({ navigation }) => ({
              header: () => <Header />
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
