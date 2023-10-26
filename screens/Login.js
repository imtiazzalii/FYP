import React from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import Background from "./background";
import Field from "./Field";
import Btn from "./btn";

const Login = () => {
  return (
    <ImageBackground
      source={require('../assets/bng.png')}
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <Field placeholder="Username" keyboardType={"email-address"} />
        <Field placeholder="Password" secureTextEntry={true} />
        <View style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
        </View>
        <Btn
          bgColor='#47ADB8'
          textColor='black'
          btnLabel="Login"
          Press={() => alert("Logged In")}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    height: '100%',
  },
  container: {
    alignItems: 'center',
    width: 400,
  },
  title: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 20,
  },
  welcomeText: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 100,
    marginBottom: 30,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    width: '70%',
    paddingRight: 16,
  },
  forgotPasswordText: {
    color: "black",
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default Login;
