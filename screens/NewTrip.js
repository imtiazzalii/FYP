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
  Modal,
} from "react-native";
import { useForm, Controller, useWatch, handleSubmit } from "react-hook-form";
import Field from "./Field";
import tw from "twrnc";
import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import DatePicker from 'react-native-modern-datepicker';

const NewTrip = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [userData, setUserData] = useState("");
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [transportMode, setTransportMode] = useState("");
  // const [visible, setVisible] = useState(false);
  // const [selectedDate, setSelectedDate] = useState('');

  // const show = () => setVisible(true);
  // const hide = () => setVisible(false);

  // const formatDate = () => {
  //   // Get the year, month, and day from the date object
  //   date = new Date();
  //   const year = date.getFullYear();
  //   // Month is zero-based, so add 1 to get the correct month
  //   const month = String(date.getMonth() + 1).padStart(2, '0'); 
  //   const day = String(date.getDate()).padStart(2, '0');
    
  //   // Return the formatted date as a string in "YYYY-MM-DD" format
  //   return `${year}-${month}-${day}`;
  // };

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
    // console.log(selectedDate);
  }, []);

  const onSubmit = (data) => {
    if (
      departureCity == "Departure City" &&
      arrivalCity == "Arrival City" &&
      transportMode == "Set Transport"
    ) {
      alert("Complete all fields.");
      return;
    }

    data.email = userData.email;
    data.start = departureCity;
    data.destination = arrivalCity;
    data.tmode = transportMode;
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
          {/* <Controller
            control={control}
            rules={{
              required: "Start point  is required",
            }}
            render={({ field: { onChange, value } }) => ( */}
          {/* // <Field
              //   placeholder="City, Country"
              //   keyboardType={"default"}
              //   onChangeText={onChange}
              //   width="90%"
              //   value={value}
              //   defaultValue=""
              // /> */}
          <Picker
            selectedValue={departureCity}
            onValueChange={(itemValue) => setDepartureCity(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Departure City" value="Departure City" />
            <Picker.Item label="Karachi" value="Karachi" />
            <Picker.Item label="Lahore" value="Lahore" />
            <Picker.Item label="Islamabad" value="Islamabad" />
            <Picker.Item label="Peshawar" value="Peshawar" />
            <Picker.Item label="Multan" value="Multan" />
            <Picker.Item label="Quetta" value="Quetta" />
            <Picker.Item label="Faisalabad" value="Faisalabad" />
          </Picker>
          {/* )}
            name="start"
          />
          {errors && errors.start && <Text>{errors.start.message}</Text>} */}

          <Text style={styles.label}>Where are you travelling to?</Text>
          {/* <Controller
            control={control}
            rules={{
              required: "Destination  is required",
            }}
            render={({ field: { onChange, value } }) => (
              // <Field
              //   placeholder="City, Country"
              //   keyboardType={"default"}
              //   width="90%"
              //   onChangeText={onChange}
              //   value={value}
              //   defaultValue=""
              // /> */}
          <Picker
            selectedValue={arrivalCity}
            onValueChange={(itemValue) => setArrivalCity(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Arrival City" value="Arrival City" />
            <Picker.Item label="Karachi" value="Karachi" />
            <Picker.Item label="Lahore" value="Lahore" />
            <Picker.Item label="Islamabad" value="Islamabad" />
            <Picker.Item label="Peshawar" value="Peshawar" />
            <Picker.Item label="Multan" value="Multan" />
            <Picker.Item label="Quetta" value="Quetta" />
            <Picker.Item label="Faisalabad" value="Faisalabad" />

            {/* Add your city options here */}
          </Picker>
          {/* )}
            name="destination"
          />
          {errors && errors.destination && (
            <Text>{errors.destination.message}</Text>
          )} */}
          <Text style={styles.label}>Your transport mode?</Text>
          <Picker
            selectedValue={transportMode}
            onValueChange={(itemValue) => setTransportMode(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Set Transport" value="Set Transport" />
            <Picker.Item label="By Road" value="By Road" />
            <Picker.Item label="By Train" value="By Train" />
            <Picker.Item label="By Aeroplane" value="By Aeroplane" />
          </Picker>
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

          {/* <Button title="Show" onPress={show} />
          <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={hide}
          ><DatePicker
          onSelectedChange={date => setSelectedDate(date)}
          options={{
            backgroundColor: 'white',
            textHeaderColor: 'black',
            textDefaultColor: 'black',
            selectedTextColor: 'white',
            mainColor: 'blue',
            textSecondaryColor: 'lightblue',
            borderColor: 'rgba(122, 146, 165, 0.1)',
          }}
          minuteInterval={5}
          minimumDate={formatDate()}
          mode="time"
          style={{ borderRadius: 10 }}
        />
        </Modal> */}

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
  picker: {
    width: "60%",
    height: 40,
    borderRadius: 100,
    marginBottom: 25,
    color: "#47ADB8",
    paddingVertical: 5,
    fontWeight: "bold",
    paddingHorizontal: 5,
    borderWidth: 2,
    marginVertical: 5,
    borderColor: "black",
    backgroundColor: "#1D4246",
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
