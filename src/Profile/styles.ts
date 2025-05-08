import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4', 
  },
  userCard: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#e0e0e0', 
    borderRadius: 10,
  },
  userText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333', 
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },
  editButton: {
    backgroundColor: '#2c3e50', 
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
    alignItems: 'center', 
  },
  editText: {
    color: '#fff', 
    fontWeight: 'bold',
  },
});
