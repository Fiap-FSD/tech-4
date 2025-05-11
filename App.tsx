import 'react-native-gesture-handler'; // deve vir no topo
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/Login/Login';
import { AuthProvider } from './src/contexts/AuthContext';
import HomeScreen from './src/screens/Home/Home';
import ProfileScreen from './src/screens/Profile/Profile';
import NewPostScreen from './src/screens/NewPost/NewPost';
import Header from './src/components/Header';
import UsersScreen from './src/screens/Users/Users';

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
            name="Users" 
            component={UsersScreen}
            options={({ navigation }) => ({
              header: () => <Header />
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
