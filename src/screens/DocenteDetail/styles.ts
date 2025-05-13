import { StyleSheet } from "react-native";

export const postDetailStyles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  contentWrapper: {
    flexDirection: "column",
    gap: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textSection: {
    width: "100%",
  },
  textSectionLarge: {
    width: "70%",
    paddingRight: 16,
  },
  mediaSection: {
    width: "100%",
    alignItems: "center",
  },
  mediaSectionLarge: {
    width: "30%",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937", 
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#6b7280", 
    marginBottom: 12,
  },
  role: {
    fontSize: 18,
    color: "#111827",
    lineHeight: 24,
  },
});
