import React, { useState, useEffect } from "react";
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
  Pressable,
} from "react-native";
import { useForm, Controller, useWatch, handleSubmit } from "react-hook-form";
import Field from "./Field";
import tw from "twrnc";
import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-native-modern-datepicker";
import { useNavigation } from "@react-navigation/native";

const NewTrip = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const navigation = useNavigation();

  const [userData, setUserData] = useState("");
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [transportMode, setTransportMode] = useState("");
  const [departureVisible, setDepartureVisible] = useState(false);
  const [arrivalVisible, setArrivalVisible] = useState(false);
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");

  const [arrivalText, setArrivalText] = useState("Select Arrival Date/Time");
  const [departureText, setDepartureText] = useState(
    "Select Departure Date/Time"
  );

  const generateDepartureText = () => {
    if (departureDate != "" && departureTime != "") {
      setDepartureText(departureDate + "  " + departureTime);
      console.log(departureText);
    }
  };

  const generateArrivalText = () => {
    if (arrivalDate != "" && arrivalTime != "") {
      setArrivalText(arrivalDate + "  " + arrivalTime);
      console.log(arrivalText);
    }
  };

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const setArrivalVisibleFunc = () => {
    arrivalVisible ? setArrivalVisible(!arrivalVisible) : arrivalVisible;
  };

  const formatDate = () => {
    // Get the year, month, and day from the date object
    date = new Date();
    const year = date.getFullYear();
    // Month is zero-based, so add 1 to get the correct month
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    // Return the formatted date as a string in "YYYY-MM-DD" format
    return `${year}-${month}-${day}`;
  };

  function getNextMonthDate() {
    const today = new Date();

    // Get the current month and year
    let year = today.getFullYear();
    let month = today.getMonth() + 1; // Adding 1 because January is 0

    // Adjust if it's December
    if (month === 12) {
      year++;
      month = 1; // Reset to January
    } else {
      month++;
    }

    // Get the last day of the next month
    const lastDayNextMonth = new Date(year, month, 0).getDate();

    // Format the date
    const nextMonthDate = `${year}-${month
      .toString()
      .padStart(2, "0")}-${lastDayNextMonth.toString().padStart(2, "0")}`;

    return nextMonthDate;
  }

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log(token);
      axios
        .get(Constants.expoConfig.extra.IP_ADDRESS + `/userData/${token}`)
        .then((response) => {
          setUserData(response.data.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = (data) => {
    if (
      departureCity == "Departure City" &&
      arrivalCity == "Arrival City" &&
      transportMode == "Set Transport" &&
      arrivalDate == "" &&
      arrivalTime == "" &&
      departureDate == "" &&
      departureTime == ""
    ) {
      alert("Complete all fields.");
      return;
    }

    data.email = userData.email;
    data.start = departureCity;
    data.destination = arrivalCity;
    data.tmode = transportMode;
    data.startdate = departureDate;
    data.starttime = departureTime;
    data.enddate = arrivalDate;
    data.endtime = arrivalTime;
    axios
      .post(Constants.expoConfig.extra.IP_ADDRESS + "/NewTrip", data)
      .then((res) => {
        console.log(res.data);
        if (res.data.status == "ok") {
          Alert.alert("Trip Posted!");
          navigation.navigate("CurrentTrips");
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

          <Text style={styles.label}>Where are you travelling to?</Text>

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

          <TouchableOpacity
            style={tw.style(
              `items-center py-4 px-5`,
              {
                marginVertical: 5,
                backgroundColor: "#1D4246",
                width: (Dimensions.get("screen").width * 70) / 100,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: "black",
              },
              {
                //marginBottom: Dimensions.get("screen").height * 10/100,
                //marginLeft: Dimensions.get("screen").width * 1/100,
              }
            )}
            onPress={() => setDepartureVisible(true)}
          >
            <Text
              style={tw.style({
                fontSize: 15,
                color: "#47ADB8",
                fontWeight: "bold",
              })}
            >
              {departureText}
            </Text>
          </TouchableOpacity>

          <Modal
            style={styles.modal}
            transparent={true}
            visible={departureVisible}
            animationType="fade"
            onRequestClose={() => setDepartureVisible(false)}
          >
            <DatePicker
              onSelectedChange={(date) => {
                const [dateString, timeString] = date.split(" ");
                setDepartureDate(dateString);
                setDepartureTime(timeString);
                console.log(departureDate);
                console.log(departureTime);
                generateDepartureText();
              }}
              options={{
                backgroundColor: "#fff",
                textHeaderColor: "#478086",
                textDefaultColor: "#44A5B0",
                selectedTextColor: "#fff",
                mainColor: "#204A4E",
                textSecondaryColor: "#AAD5D9",
                borderColor: "rgba(122, 146, 165, 0.1)",
              }}
              minuteInterval={5}
              minimumDate={formatDate()}
              maximumDate={getNextMonthDate()}
              mode="datepicker"
              style={styles.datepicker}
            />
            <Pressable
              style={styles.modalclosebutton}
              onPress={() => setDepartureVisible(false)}
            >
              <Text style={styles.modalclosebuttontext}>Close</Text>
            </Pressable>
          </Modal>

          <Text style={styles.label}>When is your arrival?</Text>

          <TouchableOpacity
            style={tw.style(
              `items-center py-4 px-5`,
              {
                marginVertical: 5,
                backgroundColor: "#1D4246",
                width: (Dimensions.get("screen").width * 70) / 100,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: "black",
              },
              {
                //marginBottom: Dimensions.get("screen").height * 10/100,
                //marginLeft: Dimensions.get("screen").width * 1/100,
              }
            )}
            onPress={() => setArrivalVisible(true)}
          >
            <Text
              style={tw.style({
                fontSize: 15,
                color: "#47ADB8",
                fontWeight: "bold",
              })}
            >
              {arrivalText}
            </Text>
          </TouchableOpacity>

          <Modal
            style={(width = "10%")}
            transparent={true}
            visible={arrivalVisible}
            animationType="fade"
            onRequestClose={() => setArrivalVisible(false)}
          >
            <DatePicker
              onSelectedChange={(date) => {
                const [dateString1, timeString1] = date.split(" ");
                setArrivalDate(dateString1);
                setArrivalTime(timeString1);
                console.log(arrivalDate);
                console.log(arrivalTime);
                generateArrivalText();
              }}
              options={{
                backgroundColor: "#fff",
                textHeaderColor: "#478086",
                textDefaultColor: "#44A5B0",
                selectedTextColor: "#fff",
                mainColor: "#204A4E",
                textSecondaryColor: "#AAD5D9",
                borderColor: "rgba(122, 146, 165, 0.1)",
              }}
              minuteInterval={5}
              minimumDate={formatDate()}
              mode="datepicker"
              style={styles.datepicker}
            />
            <Pressable
              style={styles.modalclosebutton}
              onPress={() => setArrivalVisible(false)}
            >
              <Text style={styles.modalclosebuttontext}>Close</Text>
            </Pressable>
          </Modal>

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

          <Text style={[styles.label, { width: "43%" }]}>
            What is your buyout price?
          </Text>
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

          <Text style={[styles.label, { width: "68%" }]}>
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

          <Text style={[styles.label, { width: "67%" }]}>
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
                  marginBottom: (Dimensions.get("screen").height * 12) / 100,
                  marginLeft: (Dimensions.get("screen").width * 60) / 100,
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
    backgroundColor: "#1D4246",
    padding: 6,
    borderRadius: 10,
  },
  picker: {
    width: (Dimensions.get("screen").width * 70) / 100,
    height: 40,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 100,
    //marginBottom: 25,
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
  datepicker: {
    marginTop: Dimensions.get("screen").height / 5,
    borderRadius: 20,
  },
  modal: {
    width: 20,
  },
  modalclosebutton: {
    alignSelf: "center",
    backgroundColor: "#44A5B0",
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
  },
  modalclosebuttontext: {
    color: "white",
    fontWeight: "bold",
  },
});

export default NewTrip;
