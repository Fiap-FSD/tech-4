import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/Home";
import Footer from "./src/Components/Footer";
import Header from "./src/Components/Header";
import Login from "./src/Login";
import UserProfile from "./src/Profile";

const StackNavigation = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigation.Navigator initialRouteName="Login">
          <StackNavigation.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        <StackNavigation.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            header: () => <Header title="Home" onMenuPress={() => {}} />,
          })}
        />
        <StackNavigation.Screen
          name="Profile"
          component={UserProfile}
          options={{
            header: () => <Header title="Perfil" onMenuPress={() => {}} />,
          }}
        />
      </StackNavigation.Navigator>
      <Footer />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
});
