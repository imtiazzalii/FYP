import React, { useState, useEffect } from "react";
//import DatePicker from "react-date-picker";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  ScrollView,
  Button,
  Image,
  Platform,
  StatusBar,
  Animated,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";
import { useForm, Controller, useWatch, handleSubmit } from "react-hook-form";
import Field from "./Field";
import tw from "twrnc";
import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NewTrip = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [userData, setUserData] = useState("");

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log(token);
      const response = await axios.post(
        Constants.expoConfig.extra.IP_ADDRESS + "/userData",
        { token: token }
      );
      setUserData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const onSubmit = (data) => {
    data.email = userData.email;
    axios
      .post(Constants.expoConfig.extra.IP_ADDRESS + "/NewTrip", data)
      .then((res) => {
        console.log(res.data);
        if (res.data.status == "ok") {
          Alert.alert("Trip Posted!");
        }
      })
      .catch((e) => console.log(e));
  };
  const password = useWatch({ control, name: "password", defaultValue: "" });

  return (
    <ImageBackground
      source={require("../assets/loginbg.png")}
      style={tw.style("h-full", {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      })}
    >
      <View style={styles.container}>
        <View
          style={tw.style(
            "flex-row",
            "justify-between",
            "bg-teal-900",
            "items-center",
            "px-2",
            "pt-1",
            "pb-1"
          )}
        >
          <Image
            source={require("../assets/Dashboard/menu2.png")}
            style={styles.headerIcons}
          />
          <Text style={styles.headerText}>New Trip</Text>
          <Image
            source={require("../assets/Dashboard/bell2.png")}
            style={styles.headerIcons}
          />
        </View>
      </View>

      <ScrollView>
        <View style={tw.style("ml-4 mt-8")}>
          <View style={styles.formContainer}></View>

          <Text style={styles.label}>Where are you travelling from?</Text>
          <Controller
            control={control}
            rules={{
              required: "Start point  is required",
            }}
            render={({ field: { onChange, value } }) => (
              <Field
                placeholder="City, Country"
                keyboardType={"default"}
                onChangeText={onChange}
                width="90%"
                value={value}
                defaultValue=""
              />
            )}
            name="start"
          />
          {errors && errors.start && <Text>{errors.start.message}</Text>}

          <Text style={styles.label}>Where are you travelling to?</Text>
          <Controller
            control={control}
            rules={{
              required: "Destination  is required",
            }}
            render={({ field: { onChange, value } }) => (
              <Field
                placeholder="City, Country"
                keyboardType={"default"}
                width="90%"
                onChangeText={onChange}
                value={value}
                defaultValue=""
              />
            )}
            name="destination"
          />
          {errors && errors.destination && (
            <Text>{errors.destination.message}</Text>
          )}

          <Text style={styles.label}>When do you leave?</Text>
          <Controller
            control={control}
            rules={{
              required: "Date is required",
              pattern: {
                value: /^[0-9]{8}$/,
                message: "Invalid date format. Use DDMMYYYY format.",
              },
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
                message: "Invalid time format. Use 24hr format.",
              },
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
                message: "Invalid date format. Use DDMMYYYY format.",
              },
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
                message: "Invalid time format. Use 24hr format. ",
              },
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

          <Text style={styles.label}>What is your starting bid?</Text>
          <Controller
            control={control}
            rules={{
              required: "Starting bid is required",
              pattern: {
                value: /^[0-9]{3,9}$/,
                message: "Invalid amount, Please enter numerical value",
              },
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
              required: "Buyout price is required",
              pattern: {
                value: /^[0-9]{3,9}$/,
                message: "Invalid amount, Please enter numerical value",
              },
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

          <Text style={styles.label}>
            Enter the maximum capacity you can take:
          </Text>
          <Controller
            control={control}
            rules={{
              required: "capacity is required",
              pattern: {
                value: /^[0-9]/,
                message: "Invalid amount, Please enter numerical value",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Field
                placeholder="100"
                keyboardType={"numeric"}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="capacity"
          />
          {errors && errors.capacity && <Text>{errors.capacity.message}</Text>}

          <Text style={styles.label}>
            Do you want to add any other description?
          </Text>
          <Controller
            control={control}
            rules={{}}
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
          {errors && errors.description && (
            <Text>{errors.description.message}</Text>
          )}

          <View style={tw.style("mt-6", "items-center", "justify-center")}>
            <TouchableOpacity
              style={tw.style(
                `rounded-full items-center w-30 py-3 px-5 my-5 mx-5`,
                {
                  backgroundColor: "#1D4246",
                  marginBottom: "10%",
                  marginLeft: "60%",
                }
              )}
              onPress={handleSubmit(onSubmit)}
            >
              <Text
                style={tw.style("text-white", "text-lg", "font-bold", {
                  fontSize: 22,
                })}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    height: "100%",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1D4246",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerIcons: {
    width: 20,
    height: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#47ADB8",
    padding: 5,
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
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
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
    marginBottom: 5,
    marginRight: Dimensions.get("screen").width / 2,
  },
});

export default NewTrip;
