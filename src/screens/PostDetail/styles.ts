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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937", // tw-title-text
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: "#6b7280", // tw-subtitle-text
    marginBottom: 12,
  },
  intro: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 12,
  },
  content: {
    fontSize: 18,
    color: "#111827",
    lineHeight: 24,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  videoLink: {
    marginTop: 20,
    fontSize: 16,
    color: "#3b82f6",
    textAlign: "center",
  },
  videoContainer: {
    marginTop: 16,
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 8,
    overflow: "hidden",
  },
  video: {
    flex: 1,
  },
});
