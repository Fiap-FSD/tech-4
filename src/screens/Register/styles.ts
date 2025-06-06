import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        flexGrow: 1,
        justifyContent: "center",
    },
    heading: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        color: "#000",
        marginBottom: 10,
    },
    subheading: {
        fontSize: 16,
        textAlign: "center",
        color: "#000",
        marginBottom: 20,
    },
    field: {
        marginBottom: 15,
    },
    label: {
        marginBottom: 5,
        color: "#333",
        fontWeight: "500",
    },
    input: {
        backgroundColor: "#f0f0f0",
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    error: {
        marginTop: 4,
        color: "red",
        fontSize: 12,
    },
    pickerWrapper: {
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        marginBottom: 10,
    },
    picker: {
        height: 30,
        width: "100%",
        color: "#333",
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
    passwordWrapper: {
        flexDirection: "row",        
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        marginBottom: 10,
    },
    inputSenha: {
        height: 50,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingLeft: 10,
        paddingRight: 40, 
  },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    showPasswordSymbol: {
        fontSize: 20,
    },
});
