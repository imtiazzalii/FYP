import React from "react";
import { StyleSheet, TextInput } from "react-native";

const Field = (props) => {
  return (
    <TextInput
      {...props}
      style={styles.input}
      placeholderTextColor={"#47ADB8"}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 100,
    color: "#47ADB8",
    width: "60%",
    paddingVertical: 5,
    fontWeight: "bold",
    paddingHorizontal: 5,
    borderWidth: 2,
    marginVertical: 5,
    borderColor: "black",
    backgroundColor: "#1D4246",
  },
});

export default Field;
