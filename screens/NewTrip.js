import React, { useState } from "react";
//import DatePicker from "react-date-picker";
import { View, StyleSheet, Text, ImageBackground, ScrollView, Button } from "react-native";
import { useForm, Controller, useWatch } from "react-hook-form";
import Field from "./Field";

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
        <Text style={styles.title}>New Trip</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formHeading}>Enter Details</Text></View>

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
          control={control}
          rules={{
            pattern: {
              value: /^[0-9]{3,4}$/,
              message: 'Invalid time format. Use 24hr format.',
            }
          }}
          render={({ field: { onChange, value } }) => (
          <Field
            placeholder="0300"
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

    </ImageBackground>
    </ScrollView>
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
  formHeading: {   color: "black",
  fontSize: 24,
  fontWeight: "bold",
  marginVertical: 20
  },
});

export default NewTrip;
