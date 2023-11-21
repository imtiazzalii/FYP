import React from "react";
import { View, StyleSheet, Text, ImageBackground, Button, Image, Platform, StatusBar, Animated, FlatList, Dimensions,TouchableOpacity } from "react-native";
import { useForm, Controller, handleSubmit } from "react-hook-form";
import Background from "./background";
import Field from "./Field";
import Btn from "./btn";
import tw from 'twrnc';


const Login = () => {
  const {control, handleSubmit, formState: { errors }} = useForm();
  const onSubmit = (data) => console.log(data, "data");

  return (

    <ImageBackground
      source={require('../assets/loginbg.jpeg')}
      style={ tw.style('h-full', {marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,})}
    >
      
      <View style={styles.container}>
            <View style={tw.style('flex-row','bg-teal-900','items-center','w-full','absolute')}>
            <Image source={require("../assets/login/arrow-left.png")} style={styles.headerIcons}/>
                <Text style={styles.headerText}>Login</Text>
            </View> 

        
       <View style={tw.style('items-center w-100',{marginTop:Dimensions.get('window').height /3,marginEnd:'10%',})}> 
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
            marginBottom={0}
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
            marginBottom={0}
            onChangeText={onChange}
            value={value}
            defaultValue=""
          />
          )}
          name="Password"
        />
        {errors && errors.Password && (<Text>{errors.Password.message}</Text>)}

        <View style={tw.style('items-end w-70 pr-4')}>
          <Text style={tw.style('text-black font-bold text-xs')}>Forgot Password?</Text>
        </View>
        <View style={tw.style('mt-6', 'items-center', 'justify-center')}>
        <TouchableOpacity
          style={tw.style(`rounded-full items-center w-32 py-4 px-5 my-5 mx-5`,{backgroundColor:'#47ADB8'})}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={tw.style('text-black', 'text-lg','font-bold',{fontSize:22})}>Login</Text>
        </TouchableOpacity>
      </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    height: '100%',
    marginTop:Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    
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
  headerIcons: {
    width: 20,
    height: 20,
    marginLeft:10
  },
  headerText: {
    fontSize: 20,
    textAlign:'center',
    fontWeight: 'bold',
    marginLeft:Dimensions.get('window').width /3,
    color:'#47ADB8',
    padding:5,

  },
 
  contentContainer: {
    alignItems: 'center',
    width: 400, // Adjust the width as needed
    marginTop:Dimensions.get('window').height /3,

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
