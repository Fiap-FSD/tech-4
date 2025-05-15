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
     togglePassword: {
    marginTop: -32,
    marginBottom: 16,
    alignSelf: "flex-end",
  },
  togglePasswordText: {
    color: "#007BFF",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -9 }],
    padding: 5,
    zIndex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  toggleButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  toggleButtonText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  passwordWrapper: {
    position: "relative",
    justifyContent: "center",
    marginBottom: 10,
  },
  showPasswordSymbol: {
    fontSize: 20,
  },
  });