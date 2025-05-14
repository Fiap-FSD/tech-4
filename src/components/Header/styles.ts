import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  header: {
    backgroundColor: "#007AFF",
    paddingTop: 50, // margem superior aumentada
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 16,
  },
  textButton: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.4)", // fundo opaco
    zIndex: 1,
  },
  menuContainer: {
    position: "absolute",
    top: 90, // ou ajuste conforme o visual exato do header
    bottom: 0,
    height: Dimensions.get("window").height - 90,
    width: SCREEN_WIDTH * 0.6,
    backgroundColor: "#fff",
    padding: 20,
    zIndex: 2,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },  
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuText: {
    fontSize: 18,
    color: "#007AFF",
  },
});
