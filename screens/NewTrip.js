import React, { useState } from "react";
//import DatePicker from "react-date-picker";
import { View, StyleSheet, Text, ImageBackground,ScrollView, Button, Image, Platform, StatusBar, Animated, FlatList, Dimensions } from "react-native";
import { useForm, Controller, useWatch } from "react-hook-form";
import Field from "./Field";
import tw from 'twrnc';

const NewTrip = () => {
  
  const {control, handleSubmit, register,  formState: { errors }} = useForm();
  const onSubmit = (data) => console.log(data, "data");
  const password = useWatch({ control, name: "password", defaultValue: "" });
  
  
  
  return (
    <ScrollView>
    <ImageBackground
      source={require('../assets/bng.png')}
      style={styles.imageBackground}
    >
      <View style={styles.container}>
         <View style={tw.style('flex-row','justify-between', 'bg-teal-900','items-center', 'px-4')}>
                <Image source={require("../assets/Dashboard/menu2.png")} style={styles.headerIcons}/>
                <Text style={styles.headerText}>New Trip</Text>
                <Image source={require("../assets/Dashboard/bell2.png")} style={styles.headerIcons}/>
            </View>
        </View>
        
    <View style={tw.style('items-center mt-5')}>
      <View style={styles.formContainer}>
        <Text style={styles.formHeading}>Enter Details</Text>
      </View>

        <Text style={styles.label}>Where are u travelling from?</Text>
        <Controller
            control={control}
            rules={{
              required: 'Start point  is required'
            }}
            render={({ field: { onChange, value } }) => (
              <Field
                placeholder="City, Country"
                keyboardType={"default"}
                onChangeText={onChange}
                value={value}
                defaultValue=""
              />
            )}
            name="start"
          />
          {errors && errors.start && <Text>{errors.start.message}</Text>}


          <Text style={styles.label}>Where are u travelling to?</Text>
        <Controller
            control={control}
            rules={{
              required: 'Destination  is required'
            }}
            render={({ field: { onChange, value } }) => (
              <Field
                placeholder="City, Country"
                keyboardType={"default"}
                onChangeText={onChange}
                value={value}
                defaultValue=""
              />
            )}
            name="destination"
          />
          {errors && errors.destination && <Text>{errors.destination.message}</Text>}


        

          <Text style={styles.label}>When do you leave?</Text>
        <Controller
          control={control}
          rules={{
            required: 'Date is required',
            pattern: {
              value: /^[0-9]{8}$/,
              message: 'Invalid date format. Use DDMMYYYY format.',
            }
          }}
          render={({ field: { onChange, value } }) => (
          <Field
            placeholder="DDMMYYYY"
            keyboardType={"numeric"}
            onChangeText={onChange}
            value={value}
          />
          )}
          name="startdate"
        />
        {errors.startdate && <Text>{errors.startdate.message}</Text>}


        <Text style={styles.label}>Time?</Text>
        <Controller
          control={control}SSS
          rules={{
            pattern: {
              value: /^[0-9]{3,4}$/,
              message: 'Invalid time format. Use 24hr format.',
            }
          }}
          render={({ field: { onChange, value } }) => (
          <Field
            placeholder="0300"
            width="30%"
            keyboardType={"numeric"}
            onChangeText={onChange}
            value={value}
          />
          )}
          name="starttime"
        />
        {errors.starttime && <Text>{errors.starttime.message}</Text>}



        <Text style={styles.label}>When is your arrival?</Text>
        <Controller
          control={control}
          rules={{
            pattern: {
              value: /^[0-9]{8}$/,
              message: 'Invalid date format. Use DDMMYYYY format.',
            }
          }}
          render={({ field: { onChange, value } }) => (
          <Field
            placeholder="DDMMYYYY"
            keyboardType={"numeric"}
            onChangeText={onChange}
            value={value}
          />
          )}
          name="enddate"
        />
        {errors.enddate && <Text>{errors.enddate.message}</Text>}


        <Text style={styles.label}>Time?</Text>
        <Controller
          control={control}
          rules={{
            pattern: {
              value: /^[0-9]{3,4}$/,
              message: 'Invalid time format. Use 24hr format. ',
            }
          }}
          render={({ field: { onChange, value } }) => (
          <Field
            placeholder="0300"
            width="30%"
            keyboardType={"numeric"}
            onChangeText={onChange}
            value={value}
          />
          )}
          name="endtime"
        />
        {errors.endtime && <Text>{errors.endtime.message}</Text>}



        <View style={styles.formContainer}>
        <Text style={styles.formHeading}>Pricing</Text></View>

        <Text style={styles.label}>What is your starting bid?</Text>
        <Controller
          control={control}
          rules={{
            required: 'Starting bid is required',
            pattern: {
            value: /^[0-9]{3,9}$/,
            message: 'Invalid amount, Please enter numerical value',
            }
          }}
          render={({ field: { onChange, value } }) => (
          <Field
            placeholder="100"
            keyboardType={"numeric"}
            onChangeText={onChange}
            value={value}
          />
          )}
          name="startbid"
        />
        {errors && errors.startbid && <Text>{errors.startbid.message}</Text>}

        <Text style={styles.label}>What is your buyout price?</Text>
        <Controller
          control={control}
          rules={{
            required: 'Buyout price is required',
            pattern: {
            value: /^[0-9]{3,9}$/,
            message: 'Invalid amount, Please enter numerical value',
            }
          }}
          render={({ field: { onChange, value } }) => (
          <Field
            placeholder="100"
            keyboardType={"numeric"}
            onChangeText={onChange}
            value={value}
          />
          )}
          name="buyout"
        />
        {errors && errors.buyout && <Text>{errors.buyout.message}</Text>}

        <Text style={styles.label}>Do u want to add any other description?</Text>
        <Controller
            control={control}
            rules={{
            }}
            render={({ field: { onChange, value } }) => (
              <Field
                placeholder="Write Description here.."
                height={120}
                borderRadius={30}
                keyboardType={"default"}
                onChangeText={onChange}
                value={value}
                defaultValue=""
              />
            )}
            name="description"
          />
          {errors && errors.description && <Text>{errors.description.message}</Text>}

          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
    </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    height: '100%',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
  
    
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
    fontSize: 20,
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
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 5,
  },
  formHeading: {   color: "black",
  fontSize: 20,
  fontWeight: "bold",
  marginVertical: 20,
  marginLeft:10,
  },
});

export default NewTrip;