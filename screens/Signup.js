import React from "react";
import { View, StyleSheet, Text, ImageBackground, Button, Image, Platform, StatusBar, Animated, FlatList, Dimensions, ScrollView } from "react-native";
import { useForm, Controller, useWatch } from "react-hook-form";
import Field from "./Field";

const Signup = () => {
  
  const {control, handleSubmit, formState: { errors }} = useForm();
  const onSubmit = (data) => console.log(data, "data");
  const password = useWatch({ control, name: "password", defaultValue: "" });
  
  return (
    <ScrollView>
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
        <Controller
            control={control}
            rules={{
              required: 'Name is required'
            }}
            render={({ field: { onChange, value } }) => (
              <Field
                placeholder="Name"
                keyboardType={"default"}
                onChangeText={onChange}
                value={value}
                defaultValue=""
              />
            )}
            name="name"
          />
          {errors && errors.name && <Text>{errors.name.message}</Text>}

        <Text style={styles.label}>Enter your email</Text>
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
          name="email"
        />
        {errors && errors.email && <Text>{errors.email.message}</Text>}

        {/* <Text style={styles.label}>Create a Username</Text>
        <Controller
            control={control}
            rules={{
              required: 'Username is required'
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
          {errors && errors.username && <Text>{errors.username.message}</Text>} */}

        <Text style={styles.label}>Create a Password</Text>
        <Controller
          control={control}
          rules={{
            required: 'Password is required',
            minLength: { value: 8, message: 'Minimum length is 8 characters' },
            validate: (value) => value === password || 'Passwords do not match',
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
          name="password"
        />
        {errors && errors.password && (<Text>{errors.password.message}</Text>)}

        <Text style={styles.label}>Confirm Password</Text>
        <Controller
          control={control}
          rules={{
            required: 'Password is required',
            minLength: { value: 8, message: 'Minimum length is 8 characters' },
            validate: (value) => value === password || 'Passwords do not match',
          }}
          render={({ field: { onChange, value } }) => (
          <Field
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={onChange}
            value={value}
            defaultValue=""
          />
          )}
          name="confirmPassword"
        />
        {errors && errors.confirmPassword && (<Text>{errors.confirmPassword.message}</Text>)}

        <Text style={styles.label}>Enter your CNIC number</Text>
        <Controller
          control={control}
          rules={{
            required: 'CNIC is required',
            pattern: {
              value: /^\d{5}\d{7}\d{1}$/,
              message: 'Invalid CNIC format. Use XXXXXXXXXXXXX format.',
            }
          }}
          render={({ field: { onChange, value } }) => (
          <Field
            placeholder="XXXXXXXXXXXXX"
            keyboardType={"numeric"}
            onChangeText={onChange}
            value={value}
          />
          )}
          name="cnic"
        />
        {errors.cnic && <Text>{errors.cnic.message}</Text>}

        <Text style={styles.label}>Enter your Address</Text>
        <Controller
            control={control}
            rules={{
              required: 'Address is required'
            }}
            render={({ field: { onChange, value } }) => (
              <Field
                placeholder="Address"
                keyboardType={"default"}
                onChangeText={onChange}
                value={value}
                defaultValue=""
              />
            )}
            name="address"
          />
          {errors && errors.address && <Text>{errors.address.message}</Text>}

        <Text style={styles.label}>Enter your Phone Number</Text>
        <Controller
          control={control}
          rules={{
            required: 'Phone number is required',
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

        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
