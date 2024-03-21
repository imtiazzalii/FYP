import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
  ImageBackground,
  Alert
} from "react-native";
import tw from "twrnc";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";

const Bidding = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Access the current route to get parameters

  // Assuming `tripData` contains the user data directly or nested within
  const { selectedTripData } = route.params;

  const [bidAmount, setBidAmount] = useState(
    parseInt(selectedTripData.trip.startbid)
  );
  const [capacity, setCapacity] = useState(1);

  const increaseBid = () => {
    setBidAmount(bidAmount + 10);
  };

  const decreaseBid = () => {
    if (bidAmount > parseInt(selectedTripData.trip.startbid)) {
      // Assuming the bid can't go below minimum bid set by traveler
      setBidAmount(bidAmount - 10);
    }
  };

  const increaseCapacity = () => {
    setCapacity(capacity + 1);
  };

  const decreaseCapacity = () => {
    if (capacity > 1) {
      // Assuming the bid can't go below 1
      setCapacity(capacity - 1);
    }
  };

  const makeBid = async () => {
    const data = {};
    data.id = selectedTripData.trip._id;
    data.bid = bidAmount;
    data.capacity = capacity;
    data.token = await AsyncStorage.getItem("token");
    console.log(data);

    await axios
      .post(Constants.expoConfig.extra.IP_ADDRESS + "/bid", data)
      .then((res) => {
        console.log(res.data);
        if (res.data.status == "ok") {
          Alert.alert("Bid submitted!", "press ok");
        }
      })
      .catch((e) => console.log(e));
  };

  

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
            <Text style={styles.headerText}>Bidding</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Notifications")}
            >
              <Image
                source={require("../assets/Dashboard/bell2.png")}
                style={styles.headerIcons}
              />
            </TouchableOpacity>
          </View>

          {/* Content similar to Content1 */}
          <View style={styles.card}>
            <View style={styles.userInfoContainer}>
              <Image
                source={{ uri: selectedTripData.user.profilePic }}
                style={styles.dp}
              />
              <View style={styles.userInfo}>
                <Text style={tw.style("font-bold text-white mt-4 ml-1")}>
                  {selectedTripData.user.username}
                </Text>
                <Image source={require("../assets/CurrentTrips/star.png")} />
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
                      {selectedTripData.trip.start}
                    </Text>
                    <Text style={tw.style("text-xs", { color: "#47ADB8" })}>
                      {selectedTripData.trip.startdate}
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
                      {selectedTripData.trip.destination}
                    </Text>
                    <Text style={tw.style("text-xs", { color: "#47ADB8" })}>
                      {selectedTripData.trip.enddate}
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
                  {selectedTripData.trip.capacity} KG
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
                  {selectedTripData.trip.tmode}
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
                <Text style={tw.style("text-white")}>
                  Rs. {selectedTripData.trip.buyout}
                </Text>
                <Text style={tw.style("text-white")}>
                  Rs. {selectedTripData.trip.startbid}
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
              <Text style={tw.style("text-white")}>
                {selectedTripData.trip.description}
              </Text>
            </View>
          </View>
        </View>
        <View style={tw`flex-col`}>
          <View style={tw`flex-row justify-center my-2`}>
            <View style={tw`flex-row items-center justify-center my-2`}>
              <TouchableOpacity
                onPress={decreaseBid}
                style={tw`bg-blue-200 p-2 rounded-full mx-2`}
              >
                <Text style={tw`text-blue-900 text-xl font-semibold`}>-</Text>
              </TouchableOpacity>

              <View style={tw`mx-1 p-2 bg-white rounded-lg`}>
                <Text style={tw`text-center text-lg font-semibold`}>
                  {bidAmount} Rs.
                </Text>
              </View>

              <TouchableOpacity
                onPress={increaseBid}
                style={tw`bg-blue-200 p-2 rounded-full mx-2`}
              >
                <Text style={tw`text-blue-900 text-xl font-semibold`}>+</Text>
              </TouchableOpacity>
            </View>

            <View style={tw`flex-row items-center justify-center my-2`}>
              <TouchableOpacity
                onPress={decreaseCapacity}
                style={tw`bg-blue-200 p-2 rounded-full mx-2`}
              >
                <Text style={tw`text-blue-900 text-xl font-semibold`}>-</Text>
              </TouchableOpacity>

              <View style={tw`mx-1 p-2 bg-white rounded-lg`}>
                <Text style={tw`text-center text-lg font-semibold`}>
                  {capacity} KG
                </Text>
              </View>

              <TouchableOpacity
                onPress={increaseCapacity}
                style={tw`bg-blue-200 p-2 rounded-full mx-2`}
              >
                <Text style={tw`text-blue-900 text-xl font-semibold`}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={tw`bg-cyan-600 px-7 py-2 rounded-full self-center mb-4`}
            onPress={makeBid}
          >
            <Text style={tw`text-white text-lg font-bold text-center`}>
              Place Bid
            </Text>
          </TouchableOpacity>
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

// Use the styles from the previous component. Add or remove as necessary.
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
});

export default Bidding;
