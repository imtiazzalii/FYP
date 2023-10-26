import React from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import Field from "./Field";

const Signup = () => {
  return (
    <ImageBackground
      source={require('../assets/bng.png')}
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Sign up</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Enter Your Details</Text>

        <Text style={styles.label}>Enter your name</Text>
        <Field placeholder="Name" keyboardType={"default"} />

        <Text style={styles.label}>Enter your email</Text>
        <Field placeholder="abc@gmail.com" keyboardType={"email-address"} />

        <Text style={styles.label}>Create a Username</Text>
        <Field placeholder="Username" keyboardType={"default"} />

        <Text style={styles.label}>Create a Password</Text>
        <Field placeholder="password" secureTextEntry={true} />

        <Text style={styles.label}>Re-Enter Password</Text>
        <Field placeholder="password" secureTextEntry={true} />

        <Text style={styles.label}>Enter your CNIC number</Text>
        <Field placeholder="XXXXX-XXXXXXX-X" keyboardType={"numeric"} />

        <Text style={styles.label}>Enter your Address</Text>
        <Field placeholder="Address" keyboardType={"default"} />

        <Text style={styles.label}>Enter your Phone Number</Text>
        <Field placeholder="Phone Number" keyboardType={"numeric"} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    height: '100%',
  },
  container: {
    alignItems: "center",
    width: 400,
  },
  title: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 20,
  },
  formContainer: {
    width: 400,
    marginStart: 20,
  },
  formTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  label: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
});

export default Signup;
