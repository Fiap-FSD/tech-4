// src/screens/styles.ts
import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 40, // margem no topo
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
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
  removeText: {
    color: 'red',
    fontSize: 12,
  },
  editText: {
    color: 'blue',
    fontSize: 12,
    marginTop: 4,
  },
});
