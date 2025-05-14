import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#fff",
    },
    heading: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 6,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
    },
    button: {
      backgroundColor: '#3b82f6',
      borderRadius: 6,
      padding: 12,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
    },
    error: {
      color: "red",
      fontSize: 12,
      marginBottom: 8,
    },
  });