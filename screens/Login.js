import React from "react";
import { View, StyleSheet, Text, ImageBackground, Button, Image, Platform, StatusBar, Animated, FlatList, Dimensions } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Background from "./background";
import Field from "./Field";
import Btn from "./btn";

const Login = () => {
  const {control, handleSubmit, formState: { errors }} = useForm();
  const onSubmit = (data) => console.log(data, "data");
  
  return (
    <ImageBackground
      source={require('../assets/bng.png')}
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <Controller
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: 'Invalid email address',
            }
          }}
          render={({ field: { onChange, value } }) => (
          <Field
            placeholder="Email"
            keyboardType={"email-address"}
            onChangeText={onChange}
            value={value}
            defaultValue=""
          />
          )}
        name="Email"
        />
        {errors && errors.Email && (<Text>{errors.Email.message}</Text>)}

        <Controller
          control={control}
          rules={{
            required: 'Password is required',
            minLength: { value: 8, message: 'Minimum length is 8 characters' }
          }}
          render={({ field: { onChange, value } }) => (
          <Field
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={onChange}
            value={value}
            defaultValue=""
          />
          )}
          name="Password"
        />
        {errors && errors.Password && (<Text>{errors.Password.message}</Text>)}

        <View style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </View>
        {/* <Btn
          bgColor='#47ADB8'
          textColor='black'
          btnLabel="Login"
          Press={() => handleSubmit(onSubmit)}
        />  */}
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
