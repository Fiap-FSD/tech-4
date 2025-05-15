import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4f46e5',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#e0e0e0',
        textAlign: 'center',
        marginBottom: 30,
    },
    form: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    input: {
        backgroundColor: '#f3f4f6',
        borderRadius: 6,
        padding: 12,
        marginBottom: 10,
        fontSize: 16,
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
        color: '#dc2626',
        fontSize: 13,
        marginBottom: 5,
    },
    link: {
        color: '#fff',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 14,
        textDecorationLine: 'underline',
    },
     showPasswordButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  showPasswordText: {
    color: '#007BFF',
    fontSize: 14,
  },

  eyeIcon: {
  position: 'absolute',
  right: 10,
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
},
passwordWrapper: {
  position: 'relative',
  justifyContent: 'center',
  marginBottom: 10,
},
});