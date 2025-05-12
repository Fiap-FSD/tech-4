// src/screens/styles.ts
import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
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
  postCard: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  postImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  postAuthor: {
    fontSize: 14,
    color: '#555',
  },
  postIntro: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },
  postActions: {
    justifyContent: 'center',
    marginLeft: 8,
  },

  editText: {
    color: 'blue',
    fontSize: 12,
    marginTop: 4,
  },
  editButton: {
    backgroundColor: "#007BFF",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  removeText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  removeButton: {
    backgroundColor: "#007BFF",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
 removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
