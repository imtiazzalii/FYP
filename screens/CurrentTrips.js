import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  Platform,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const Content1 = ({ userData, tripData, navigation }) => {
  return (
    <ScrollView>
      {Array.isArray(tripData) &&
        tripData.map((trip, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate("BiddingOptions", { trip: trip })
            }
            style={tw`mb-4`}
          >
            <View key={index} style={styles.card}>
              <View style={styles.userInfoContainer}>
                <Image
                  source={{ uri: userData.profilePic }}
                  style={styles.dp}
                />
                <View style={styles.userInfo}>
                  <Text style={tw.style("font-bold text-white mt-4 ml-1")}>
                    {userData.name}
                  </Text>
                  <Text style={tw.style("font-bold text-white mt-1 ml-1")}>
                    {userData.rating} ⭐
                  </Text>
                </View>
              </View>
              <View style={styles.divider2} />
              <View>
                <View style={styles.userInfoContainer}>
                  <View>
                    <Image
                      source={require("../assets/CurrentTrips/blackarrow.png")}
                    />
                  </View>
                  <View style={tw.style("ml-2", { flexDirection: "column" })}>
                    <View>
                      <Text style={tw.style("font-bold text-white")}>
                        Departure
                      </Text>
                      <Text style={tw.style("text-white text-xs")}>
                        {trip.start}
                      </Text>
                      <Text style={tw.style("text-xs", { color: "#47ADB8" })}>
                        {trip.startdate}
                      </Text>
                    </View>
                    <View>
                      <Image
                        source={require("../assets/CurrentTrips/Airplane.png")}
                      />
                    </View>
                    <View>
                      <Text style={tw.style("font-bold text-white")}>
                        Arrival
                      </Text>
                      <Text style={tw.style("text-white text-xs")}>
                        {trip.destination}
                      </Text>
                      <Text style={tw.style("text-xs", { color: "#47ADB8" })}>
                        {trip.enddate}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.divider2} />
              <View>
                <Text style={tw.style("font-bold text-white mb-1")}>
                  Capacity
                </Text>
                <View style={tw.style("mb-2", { flexDirection: "row" })}>
                  <Image
                    source={require("../assets/CurrentTrips/suitcase.png")}
                  />
                  <Text
                    style={tw.style("font-bold text-white text-xs ml-1 mt-1")}
                  >
                    {trip.capacity} KG
                  </Text>
                </View>
              </View>
              <View>
                <Text style={tw.style("font-bold text-white mb-1")}>
                  Transport Mode
                </Text>
                <View style={tw.style("mb-2", { flexDirection: "row" })}>
                  <Text
                    style={tw.style("font-bold text-white text-xs ml-1 mt-1")}
                  >
                    {trip.tmode}
                  </Text>
                </View>
              </View>
              <View>
                <Image source={require("../assets/CurrentTrips/line.png")} />
              </View>
              <Text style={tw.style("font-bold text-white")}>Bids</Text>
              <View style={styles.section}>
                <View>
                  <Text style={tw.style("text-white")}>Current bids:</Text>
                  <Text style={tw.style("text-white")}>Buyout:</Text>
                  <Text style={tw.style("text-white")}>Starting bid:</Text>
                </View>
                <View style={tw.style({ marginRight: "10%" })}>
                  <Text style={tw.style("text-white")}>Rs. 250</Text>
                  <Text style={tw.style("text-white")}>Rs. {trip.buyout}</Text>
                  <Text style={tw.style("text-white")}>
                    Rs. {trip.startbid}
                  </Text>
                </View>
              </View>
              <View>
                <Image source={require("../assets/CurrentTrips/line.png")} />
              </View>
              <View style={tw.style({ marginBottom: "10%" })}>
                <Text style={tw.style("font-bold text-white mt-1")}>
                  Description
                </Text>
                <Text style={tw.style("text-white")}>{trip.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

const Filters = ({ fetchTripsWithFilters, onApplyFilters }) => {
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [weight, setWeight] = useState("");
  const [cost, setCost] = useState(100);
  const [transportMode, setTransportMode] = useState("By Road");

  const applyFilters = () => {
    fetchTripsWithFilters({ departureCity, arrivalCity, weight, cost, transportMode });
    onApplyFilters();
  };


  return (
    <View style={styles.filcontainer}>
      <Text style={styles.filheading}>Filters</Text>
      <Image
        source={require("../assets/CurrentTrips/broadline.png")}
        style={styles.filterline}
      />

      {/* Departure City Dropdown */}
      <View style={styles.filterContainer1}>
        <Picker
          selectedValue={departureCity}
          onValueChange={(itemValue) => setDepartureCity(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Karachi" value="Karachi" />
          <Picker.Item label="Lahore" value="Lahore" />
          <Picker.Item label="Islamabad" value="Islamabad" />
          <Picker.Item label="Peshawar" value="Peshawar" />
          <Picker.Item label="Multan" value="Multan" />
          <Picker.Item label="Quetta" value="Quetta" />
          <Picker.Item label="Faisalabad" value="Faisalabad" />
          <Picker.Item label="Departure City" value="Departure City" />
        </Picker>
      </View>

      {/* Arrival City Dropdown */}
      <View style={styles.filterContainer1}>
        <Picker
          selectedValue={arrivalCity}
          onValueChange={(itemValue) => setArrivalCity(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Karachi" value="Karachi" />
          <Picker.Item label="Lahore" value="Lahore" />
          <Picker.Item label="Islamabad" value="Islamabad" />
          <Picker.Item label="Peshawar" value="Peshawar" />
          <Picker.Item label="Multan" value="Multan" />
          <Picker.Item label="Quetta" value="Quetta" />
          <Picker.Item label="Faisalabad" value="Faisalabad" />
          <Picker.Item label="Arrival City" value="Arrival City" />
          {/* Add your city options here */}
        </Picker>
      </View>

      {/* Weight Input Field */}
      <View style={styles.filter1Container}>
        <Text style={styles.filterLabel}>Weight:</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Enter weight (KG)"
          keyboardType="numeric"
          value={weight}
          onChangeText={(text) => setWeight(text)}
        />
      </View>

      {/* Cost Slider */}
      <View style={styles.filter1Container}>
        <Text style={styles.filterLabel}>Cost:</Text>
        <Slider
          style={styles.slider}
          minimumValue={100}
          maximumValue={10000}
          step={1}
          value={cost}
          onValueChange={(value) => setCost(value)}
        />
        <Text style={tw.style("text-white text-sm font-bold")}>{cost}</Text>
      </View>

      {/* Transport Mode Dropdown */}
      <Text style={styles.filterLabel}>Transport Mode:</Text>
      <View style={styles.filterContainer1}>
        <Picker
          selectedValue={transportMode}
          onValueChange={(itemValue) => setTransportMode(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="By Road" value="By Road" />
          <Picker.Item label="By Train" value="By Train" />
          <Picker.Item label="By Aeroplane" value="By Aeroplane" />
        </Picker>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.setButton} onPress={applyFilters}>
          <Text style={styles.setText}>Set</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Content22 = ({ userData, tripData, allTripsResponse, navigation }) => {
  return (
    <ScrollView>
      {allTripsResponse.map((data, index) => (
        <TouchableOpacity
          key={index}
          onPress={() =>
            navigation.navigate("Bidding", { selectedTripData: data })
          }
        >
          <View key={index} style={styles.card}>
            {/* Departure and Arrival Section */}
            <View style={styles.section}>
              <Text style={styles.label}>Departure</Text>
              <Text style={styles.label}>Arrival</Text>
            </View>
            <View style={styles.section}>
              <View style={styles.infoContainer1}>
                <Text style={styles.infoText}>{data.trip.start}</Text>
                <Text style={styles.dateText}>{data.trip.startdate}</Text>
              </View>

              <View style={styles.arrowContainer}>
                <Image
                  source={require("../assets/OrderHistory/arrow.png")}
                  style={styles.arrowIcon}
                />
              </View>

              <View style={styles.infoContainer1}>
                <Text style={styles.infoText}>{data.trip.destination}</Text>
                <Text style={styles.dateText}>{data.trip.enddate}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Capacity and Cost Section */}
            <View style={styles.section}>
              <Text style={styles.label}>Capacity</Text>
              <Text style={styles.label}>Transport Mode</Text>
            </View>
            <View style={styles.section}>
              <View style={styles.infoContainer}>
                <Image
                  source={require("../assets/OrderHistory/suitcase.png")}
                  style={styles.iconW}
                />
                <Text style={styles.infoText}> {data.trip.capacity} KG</Text>
              </View>
              <Text style={styles.infoText}>{data.trip.tmode}</Text>
            </View>

            <View style={styles.divider} />

            {/* Traveller Section */}
            <View style={styles.section}>
              <Text style={styles.label}>Traveller</Text>
            </View>
            <View style={styles.section}>
              <View style={styles.infoContainer}>
                <Image
                  source={{ uri: data.user.profilePic }}
                  style={styles.icon}
                />
                <View>
                  <Text style={styles.infoText}>{data.user.username}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const Content2 = ({ userData, tripData, allTripsResponse, navigation,fetchTripsWithFilters }) => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <View style={styles.box}>
      <View style={[tw.style("ml-3", "mb-2")]}>
        <TouchableOpacity onPress={toggleFilters}>
          <Image
            source={require("../assets/CurrentTrips/filters.png")}
            style={[styles.filters, showFilters && { tintColor: "#47ADB8" }]}
          />
        </TouchableOpacity>
      </View>

      <View>
        {showFilters === true ? <Filters fetchTripsWithFilters={fetchTripsWithFilters} onApplyFilters={toggleFilters} /> : null}
        {showFilters === false ? (
          <Content22
            userData={userData}
            tripData={tripData}
            allTripsResponse={allTripsResponse}
            navigation={navigation}
          />
        ) : null}
      </View>
    </View>
  );
};

const CurrentTrips = () => {
  const [selectedButton, setSelectedButton] = useState("Details");
  const [userData, setUserData] = useState("");
  const [tripData, setTripData] = useState("");
  const [allTripsResponse, setAllTripsResponse] = useState([]);

  const handleButtonPress = (button) => {
    setSelectedButton(button);
  };

  const navigation = useNavigation();

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log(token);

      await axios
        .get(Constants.expoConfig.extra.IP_ADDRESS + `/userData/${token}`)
        .then((response) => {
          setUserData(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });

      await axios
        .get(Constants.expoConfig.extra.IP_ADDRESS + `/tripData/${token}`)
        .then((response1) => {
          setTripData(response1.data.data);
        })
        .catch((error) => {
          console.error(error);
        });

      axios
        .get(Constants.expoConfig.extra.IP_ADDRESS + `/allTrips`)
        .then((response2) => {
          setAllTripsResponse(response2.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTripsWithFilters = async (filters) => {
    try {
      const response = await axios.get(`${Constants.expoConfig.extra.IP_ADDRESS}/allTrips`, {
        params: filters
      });
      console.log(response.data.data)
      setAllTripsResponse(response.data.data);
    } catch (error) {
      console.error("Error fetching trips with filters:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/Dashboard/dashbg.jpeg")}
      style={tw.style("h-full")}
    >
      <ScrollView>
        <View
          style={tw.style({
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          })}
        >
          <View
            style={tw.style(
              "flex-row",
              "justify-between",
              "bg-teal-900",
              "items-center",
              "px-2",
              "pt-2",
              "pb-1"
            )}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}
            >
              <Image
                source={require("../assets/Dashboard/menu2.png")}
                style={styles.headerIcons}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>Current Trips</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Notifications")}
            >
              <Image
                source={require("../assets/Dashboard/bell2.png")}
                style={styles.headerIcons}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.toggleButtonsContainer}>
            <TouchableOpacity
              onPress={() => handleButtonPress("Details")}
              style={[
                styles.toggleButton,
                selectedButton === "Details" && styles.toggleButtonSelected,
              ]}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  selectedButton === "Details" &&
                    styles.toggleButtonTextSelected,
                ]}
              >
                Details
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleButtonPress("trips")}
              style={[
                styles.toggleButton,
                selectedButton === "trips" && styles.toggleButtonSelected,
              ]}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  selectedButton === "trips" && styles.toggleButtonTextSelected,
                ]}
              >
                Trips
              </Text>
            </TouchableOpacity>
          </View>

          {selectedButton === "Details" ? (
            <Content1
              userData={userData}
              tripData={tripData}
              navigation={navigation}
            />
          ) : (
            <Content2
              userData={userData}
              tripData={tripData}
              allTripsResponse={allTripsResponse}
              navigation={navigation}
              fetchTripsWithFilters={fetchTripsWithFilters}
            />
          )}
        </View>
      </ScrollView>
      <View
        style={tw.style("flex-row p-1 justify-evenly items-center bg-teal-900")}
      >
        <Text style={tw`text-white text-sm pr-4`}>swyftbags ltd.</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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

  toggleButtonsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    width: "60%",
    marginVertical: 20,
    backgroundColor: "#E8F9FD",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#B0E0E6",
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 0,
  },
  toggleButtonSelected: {
    backgroundColor: "#1D4246",
  },
  toggleButtonText: {
    color: "#47ADB8",
    fontWeight: "bold",
    textAlign: "center",
  },
  toggleButtonTextSelected: {
    color: "#FFFFFF",
  },
  card: {
    backgroundColor: "#1D4246",
    borderRadius: 20,
    padding: 16,
    marginVertical: 8,
    margin: "5%",
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    color: "white",
  },
  infoContainer: {
    flexDirection: "row", // Stack date below the text
    alignItems: "flex-start",
  },
  infoContainer1: {
    flexDirection: "column", // Stack date below the text
    alignItems: "flex-start",
  },

  infoText: {
    color: "white",
    marginTop: 2, // Add some space between text and date
    marginLeft: 2,
    fontSize: 14,
  },
  dateText: {
    color: "#47ADB8",
  },
  arrowContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6, // Adjust the marginTop to ensure visibility
  },
  arrowIcon: {
    width: 80, // Adjust the width of the arrow icon
    height: 50, // Adjust the height of the arrow icon
    resizeMode: "contain", // Make sure the arrow icon fits into the container
  },
  iconW: {
    width: 20,
    height: 20,
  },
  iconstar: {
    width: 12,
    height: 15,
    marginTop: 3,
    marginLeft: 3,
  },

  icon: {
    width: 35,
    height: 35,
    borderRadius: 35,
  },
  statusText: {
    color: "#2D9CDB", // Change as needed to match status color
  },
  chatText: {
    color: "#2D9CDB",
    textAlign: "center",
  },
  divider: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  divider2: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dp: {
    height: 50,
    width: 50,
    borderRadius: 60,
  },
  filters: {
    width: 30,
    height: 30,
  },
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  line: {
    height: 2,
    backgroundColor: "#CCCCCC",
    marginBottom: 20,
  },
  filterContainer: {
    marginBottom: 20,
  },

  userInfoContainer: {
    flexDirection: "row",
  },
  userInfo: {
    // Add styles for user info container
    flexDirection: "col",
    alignItems: "center",
  },
  userName: {
    // Add styles for user name
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
    marginBottom: 5, // Add margin to lower the text
  },
  filcontainer: {
    flex: 1,
    padding: 20,
    height: "100%",
    backgroundColor: "#47ADB8",
    width: "70%",
    borderRadius: 25,
    overflow: "hidden",
    marginHorizontal: "15%",
  },
  filheading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  filterline: {
    height: 2,
    backgroundColor: "#e0e0e0",
    marginBottom: 20,
  },
  filterContainer1: {
    marginBottom: 10,
    padding: 0,
    borderRadius: 25,
    overflow: "hidden",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  filterContainer: {
    marginBottom: "10%",
    padding: 0,
    borderRadius: 25,
    overflow: "hidden",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  filterLabel: {
    fontSize: 18,
    color: "white",
    marginTop: 10,
    fontWeight: "bold",
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: "100%",
    color: "black",
    backgroundColor: "white",
    borderRadius: 20,
  },
  inputField: {
    height: 50,
    width: "100%",
    color: "black",
    borderColor: "gray",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    fontSize: 9,
    fontWeight: "bold",
    color: "#333",
  },
  slider: {
    width: "100%",
    height: 15,
    borderRadius: 5,
    backgroundColor: "white", // You can adjust the color accordingly
  },
  buttonView: {
    alignItems: "flex-end", // Center the text horizontally
    justifyContent: "center",
    marginTop: 0,
  },
  setButton: {
    backgroundColor: "#1D4246", // Set button color
    padding: 5, // Set padding for the button
    width: "50%",
    alignItems: "center", // Center the text horizontally
    justifyContent: "center", // Center the text vertically
    marginTop: 0, // Add space above the button
    borderRadius: 30,
  },
  setText: {
    color: "white", // Set text color to white
    fontWeight: "bold", // Make the text bold
    fontSize: 18, // Increase font size
  },
  stickyHeader: {
    position: "sticky",
    top: 0,
    zIndex: 999, // Adjust the zIndex to ensure the header stays on top of other content
  },
});

export default CurrentTrips;
