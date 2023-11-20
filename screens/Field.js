import React from "react";
import { View, StyleSheet,TextInput, Text, ImageBackground, Button, Image, Platform, StatusBar, Animated, FlatList, Dimensions } from "react-native";

const screenWidth = Dimensions.get('window').width;
const Field = (props) => {

  const inputsize = screenWidth > 360 ? '20%' : '80%';



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
    width: '60%',
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
