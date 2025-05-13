// src/screens/styles.ts
import { StyleSheet } from 'react-native';

export const alunosStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 10, // margem no topo
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
   searchContainer: {
    marginBottom: 16,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: "#888", // Cor da lupa
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 8,
  },
  alunoCard: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  alunoName: {
    fontSize: 16,
    fontWeight: '600',
  },
  alunoEmail: {
    fontSize: 14,
    color: '#555',
  },
  alunoRole: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },
  alunoActions: {
    justifyContent: 'center',
    marginLeft: 8,
    gap: 16,
  }
});
