import React from "react";
import { View, StyleSheet, Text, ImageBackground,TouchableOpacity, Button, Image, Platform, StatusBar, Animated, FlatList, Dimensions, ScrollView } from "react-native";
import { useForm, Controller, useWatch } from "react-hook-form";
import Field from "./Field";
import tw from 'twrnc';

const EditProfile = () => {
  
  const {control, handleSubmit, formState: { errors }} = useForm();
  const onSubmit = (data) => console.log(data, "data");
  const password = useWatch({ control, name: "password", defaultValue: "" });
  
  return (
    <ImageBackground
     source={require('../assets/bng.png')}
     style={ tw.style('h-full', {marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,})}
   >
            <View style= {tw.style('flex-row', 'items-center','bg-teal-900','px-1','pb-1','pt-1')}>
               <Image source={require("../assets/login/arrow-left.png")} style={styles.headerIcons}/>
               <View style={tw.style('justify-center','items-center', 'pl-30')}>
               <Text style={styles.headerText}>Edit Profile</Text>  
           </View>
           </View>
      

        <View style={styles.layoutContainer}>
        <Text style={styles.formTitle}>Only enter the field you want to change</Text>

        <Text style={styles.label}>Enter new email</Text>
        <Controller
          control={control}
          rules={{
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
          name="email"
        />
        {errors && errors.email && <Text>{errors.email.message}</Text>}

         <Text style={styles.label}>Enter new Username</Text>
        <Controller
            control={control}
            rules={{
            }}
            render={({ field: { onChange, value } }) => (
              <Field
                placeholder="Username"
                keyboardType={"default"}
                onChangeText={onChange}
                value={value}
                defaultValue=""
              />
            )}
            name="username"
          />
          {errors && errors.username && <Text>{errors.username.message}</Text>} 


        <Text style={styles.label}>Enter new Phone Number</Text>
        <Controller
          control={control}
          rules={{
            pattern: {
            value: /^03[0-9]{2}[0-9]{7}$/,
            message: 'Invalid phone number format. Use 03XXXXXXXX format.',
            }
          }}
          render={({ field: { onChange, value } }) => (
          <Field
            placeholder="03XXXXXXXX"
            keyboardType={"numeric"}
            onChangeText={onChange}
            value={value}
          />
          )}
          name="phoneNumber"
        />
        {errors && errors.phoneNumber && <Text>{errors.phoneNumber.message}</Text>}

        <View style={tw.style('mt-6', 'items-center', 'justify-center')}>
        <TouchableOpacity
          style={tw.style(`rounded-full items-center w-30 py-3 px-5 my-5 mx-5`,{backgroundColor:'#47ADB8'})}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={tw.style('text-white', 'text-lg','font-bold',{fontSize:22})}>Confirm</Text>
        </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    height: '100%',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  layoutContainer: { // Takes up all available space
    justifyContent: 'center', // Centers children vertically in the container
    alignItems: 'center', // Centers children horizontally in the container
    paddingHorizontal: 20, // Add some horizontal padding
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:'#1D4246',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerIcons: {
    width: 20,
    height: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color:'#47ADB8',
    padding:5,

  },
  title: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 20,
  },
  formContainer: {
    width: 400,
    marginStart: 5,
  },
  formTitle: {
    color: "white",
    fontSize: 20,
    fontWeight:'bold',
    marginVertical: 25,
    marginTop:'10%',
    marginBottom:'20%'
  },
  label: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
    marginVertical: 0,
  },
  formHeading: {  
  color: "black",
  fontSize: 18,
  fontWeight: "bold",
  marginBottom:5,
  marginRight:Dimensions.get('screen').width/ 2,
  },
});
export default EditProfile;
