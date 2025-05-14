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
  
});
