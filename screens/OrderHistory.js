import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Button,
  Image,
  Platform,
  StatusBar,
  Animated,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const Content1 = ({ myOrders }) => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.card}>
      {/* Departure and Arrival Section */}
      {myOrders
        .filter((data) => data.status != "pending")
        .map((data, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate("Status", { selectedTripData: data })
            }
          >
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
                {/* Adjust the arrow icon styles */}
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

            {/* Item Weight and Status Section */}
            <View style={styles.section}>
              <Text style={styles.label}>Item Weight</Text>
              <Text style={styles.label}>Status</Text>
            </View>
            <View style={styles.section}>
              <View style={styles.infoContainer}>
                <Image
                  source={require("../assets/OrderHistory/suitcase.png")}
                  style={styles.iconW}
                />
                <Text style={styles.infoText}>{data.trip.capacity} KG</Text>
              </View>
              <Text style={styles.statusText}>{data.trip.status}</Text>
            </View>

            <View style={styles.divider} />

            {/* Sender Section */}
            <View style={styles.section}>
              <Text style={styles.label}>Sender</Text>
            </View>
            <View style={styles.section}>
              <View style={styles.infoContainer}>
                <Image
                  source={{ uri: data.user.profilePic }}
                  style={styles.icon}
                />
                <View>
                  <Text style={styles.infoText}>{data.user.username}</Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.infoText}>{data.user.rating}</Text>
                    <Image
                      source={require("../assets/OrderHistory/star.png")}
                      style={styles.iconstar}
                    />
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate("AllChats")}>
                <Image
                  source={require("../assets/OrderHistory/chat.png")}
                  style={styles.icon}
                />
                <Text style={styles.chatText}>Open Chat</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

const Content2 = ({ trips }) => {
  const navigation = useNavigation();
  console.log(trips);
  return (
    <ScrollView style={styles.card}>
      {/* Departure and Arrival Section */}
      {trips
        .filter((data) => data.status != "pending")
        .map((data, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate("Status", { selectedTripData: data })
            }
          >
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
              <Text style={styles.label}>Status</Text>
            </View>
            <View style={styles.section}>
              <View style={styles.infoContainer}>
                <Image
                  source={require("../assets/OrderHistory/suitcase.png")}
                  style={styles.iconW}
                />
                <Text style={styles.infoText}>{data.trip.capacity} KG</Text>
              </View>
              <Text style={styles.statusText}>{data.trip.status}</Text>
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
                  <Text style={styles.infoText}> {data.user.username}</Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.infoText}> {data.user.rating}</Text>
                    <Image
                      source={require("../assets/OrderHistory/star.png")}
                      style={styles.iconstar}
                    />
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

const OrderHistory = () => {
  const [selectedButton, setSelectedButton] = useState("myOrders");
  const [myOrders, setMyOrders] = useState([]);
  const [trips, setTrips] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleButtonPress = (button) => {
    setSelectedButton(button);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getData(); // Fetch data from backend
    setRefreshing(false); // Set refreshing to false after data is fetched
  };

  const navigation = useNavigation();

  const getData = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");

      await axios
        .get(Constants.expoConfig.extra.IP_ADDRESS + `/myOrders/${userId}`)
        .then((response) => {
          setMyOrders(response.data.data);
          console.log("MY ORDERS: ", myOrders);
        })
        .catch((error) => {
          console.error(error);
        });

      await axios
        .get(Constants.expoConfig.extra.IP_ADDRESS + `/Trips/${userId}`)
        .then((response1) => {
          setTrips(response1.data.data);
          console.log("TRIPS: ", trips);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log(error);
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={require("../assets/Dashboard/menu2.png")}
                style={styles.headerIcons}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>History</Text>
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
              onPress={() => handleButtonPress("myOrders")}
              style={[
                styles.toggleButton,
                selectedButton === "myOrders" && styles.toggleButtonSelected,
              ]}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  selectedButton === "myOrders" &&
                    styles.toggleButtonTextSelected,
                ]}
              >
                My Orders
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

          {selectedButton === "myOrders" ? (
            myOrders.length > 0 ? (
              <Content1 myOrders={myOrders} />
            ) : (
              <Text style={styles.noTripsText}>No trips available</Text>
            )
          ) : trips.length > 0 ? (
            <Content2 trips={trips} />
          ) : (
            <Text style={styles.noTripsText}>No trips available</Text>
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
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
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
  noTripsText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#47ADB8",
  },

  toggleButtonsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    width: "60%",
    height: "10%",
    marginVertical: 20,
    backgroundColor: "#E8F9FD",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#B0E0E6",
    minHeight: 40,
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
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default OrderHistory;
