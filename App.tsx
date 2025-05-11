import 'react-native-gesture-handler'; // deve vir no topo
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/Login/Login';
import { AuthProvider } from './src/contexts/AuthContext';
import HomeScreen from './src/screens/Home/Home';
import ProfileScreen from './src/screens/Profile/Profile';
import NewPostScreen from './src/screens/NewPost/NewPost';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          {/* <Stack.Screen name="Blog" component={BlogScreen} /> */}
          {/* <Stack.Screen name="Users" component={UsersScreen} /> */}
          <Stack.Screen name="NewPost" component={NewPostScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
