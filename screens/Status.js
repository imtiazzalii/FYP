import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useRoute } from "@react-navigation/native";

const Status = () => {
  const [selectedStep, setSelectedStep] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const status1 = useRef(new Animated.Value(0)).current;
  const status2 = useRef(new Animated.Value(0)).current;
  const status3 = useRef(new Animated.Value(0)).current;
  const status4 = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedTripData, setSelectedTripData] = useState(route.params.selectedTripData);
  const [senderName, setSenderName] = useState("");

  useEffect(() => {
    if (!selectedTripData) return;

    switch (selectedTripData.trip.status) {
      case "accepted":
        //start1();
        setSelectedStep(1);
        break;
      case "reached inspector 1":
        setSelectedStep(1);
        start1();
        setSelectedStep(2);
        break;
      case "dispatched":
        setSelectedStep(1);
        start1();
        setSelectedStep(2);
        start2();
        setSelectedStep(3);
        break;
      case "reached inspector 2":
        setSelectedStep(1);
        start1();
        setSelectedStep(2);
        start2();
        setSelectedStep(3);
        start3();
        setSelectedStep(4);
        break;
      case "completed":
        setSelectedStep(1);
        start1();
        setSelectedStep(2);
        start2();
        setSelectedStep(3);
        start3();
        setSelectedStep(4);
        start4();
        setSelectedStep(5);
        break;
      default:
        break;
    }
  }, [selectedTripData]);

  useEffect(() => {
    getData();
    console.log(senderName);
  }, []);

  const getData = async () => {
    try {
      const response1 = await axios.get(`${Constants.expoConfig.extra.IP_ADDRESS}/senderName/${selectedTripData.trip._id}`);
        setSenderName(response1.data.name);
    } catch (error) {
      console.error("Failed to fetch trip details:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false); // Set refreshing to false after data is fetched
  };

  const start1 = () => {
    Animated.timing(status1, {
      toValue: 60,
      duration: 0,
      useNativeDriver: false,
    }).start();
  };

  const start2 = () => {
    Animated.timing(status2, {
      toValue: 60,
      duration: 0,
      useNativeDriver: false,
    }).start();
  };

  const start3 = () => {
    Animated.timing(status3, {
      toValue: 60,
      duration: 0,
      useNativeDriver: false,
    }).start();
  };

  const start4 = () => {
    Animated.timing(status4, {
      toValue: 60,
      duration: 0,
      useNativeDriver: false,
    }).start();
  };
  return (
    <ImageBackground
      source={require("../assets/Dashboard/dashbg.jpeg")}
      style={tw.style("h-full")}
    >
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
          <Text style={styles.headerText}>Trip Status</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Notifications");
            }}
          >
            <Image
              source={require("../assets/Dashboard/bell2.png")}
              style={styles.headerIcons}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.contentbox}>
          <View style={styles.contentboxleft}>
            <Text style={styles.contentboxheading}>From</Text>
            <View style={styles.content}>
              <Image source={require("../assets/Status/User.png")} />
              <Text> {senderName}</Text>
            </View>
            <View style={styles.content}>
              <Image source={require("../assets/Status/Placeholder.png")} />
              <Text> {selectedTripData.trip.start}</Text>
            </View>
            <View style={styles.content}>
              <Image source={require("../assets/Status/Calendar.png")} />
              <Text> {selectedTripData.trip.startdate}</Text>
            </View>
          </View>
          <View style={styles.contentboxright}>
            <Text style={styles.contentboxheading}>To</Text>
            <View style={styles.content}>
              <Image source={require("../assets/Status/User.png")} />
              <Text> Ahad</Text>
            </View>
            <View style={styles.content}>
              <Image source={require("../assets/Status/Placeholder.png")} />
              <Text> Lahore, Pakistan</Text>
            </View>
            <View style={styles.content}>
              <Image source={require("../assets/Status/Calendar.png")} />
              <Text> 18-Nov-2023</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                top: 30,
                marginLeft: 15,
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 30,
                  backgroundColor: selectedStep > 0 ? "#85C2C9" : "#f2f2f2",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <Text style={{ color: "#fff" }}>1</Text> */}
                <Image
                  source={require("../assets/Status/Law.png")}
                  style={{ width: 30, height: 30 }}
                />
              </View>
              <View
                style={{
                  width: 6,
                  height: 60,
                  backgroundColor: "#f2f2f2",
                  marginLeft: 21,
                }}
              ></View>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 30,

                  backgroundColor: selectedStep > 1 ? "#85C2C9" : "#f2f2f2",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <Text style={{ color: "#fff" }}>2</Text> */}
                <Image
                  source={require("../assets/Status/Search.png")}
                  style={{ width: 30, height: 30 }}
                />
              </View>
              <View
                style={{
                  width: 6,
                  height: 60,
                  backgroundColor: "#f2f2f2",
                  marginLeft: 21,
                }}
              ></View>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 30,
                  backgroundColor: selectedStep > 2 ? "#85C2C9" : "#f2f2f2",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <Text style={{ color: "#fff" }}>3</Text> */}
                <Image
                  source={require("../assets/Status/Points.png")}
                  style={{ width: 30, height: 30 }}
                />
              </View>
              <View
                style={{
                  width: 6,
                  height: 60,
                  backgroundColor: "#f2f2f2",
                  marginLeft: 21,
                }}
              ></View>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 30,
                  backgroundColor: selectedStep > 3 ? "#85C2C9" : "#f2f2f2",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <Text style={{ color: "#fff" }}>4</Text> */}
                <Image
                  source={require("../assets/Status/Search.png")}
                  style={{ width: 30, height: 30 }}
                />
              </View>
              <View
                style={{
                  width: 6,
                  height: 60,
                  backgroundColor: "#f2f2f2",
                  marginLeft: 21,
                }}
              ></View>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 30,
                  backgroundColor: selectedStep > 4 ? "#85C2C9" : "#f2f2f2",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <Text style={{ color: "#fff" }}>5</Text> */}
                <Image
                  source={require("../assets/Status/delivery.png")}
                  style={{ width: 30, height: 30 }}
                />
              </View>
            </View>
            <View
              style={{
                alignItems: "flex-start",
                justifyContent: "center",
                padding: 20,
                paddingLeft: 0,
                position: "absolute",
                top: 10,
                marginLeft: 15,
              }}
            >
              <Animated.View
                style={{
                  width: 6,
                  height: status1,
                  marginTop: 50,
                  backgroundColor: "#85C2C9",
                  marginLeft: 21,
                }}
              ></Animated.View>

              <Animated.View
                style={{
                  width: 6,
                  height: status2,
                  marginTop: 50,
                  backgroundColor: "#85C2C9",
                  marginLeft: 21,
                }}
              ></Animated.View>
              <Animated.View
                style={{
                  width: 6,
                  height: status3,
                  marginTop: 50,
                  backgroundColor: "#85C2C9",
                  marginLeft: 21,
                }}
              ></Animated.View>
              <Animated.View
                style={{
                  width: 6,
                  height: status4,
                  marginTop: 50,
                  backgroundColor: "#85C2C9",
                  marginLeft: 21,
                }}
              ></Animated.View>
            </View>
          </View>
          <View>
            <View
              style={{ flexDirection: "column", marginTop: 45, marginLeft: 10 }}
            >
              <Text style={{ top: 3, fontWeight: "bold" }}>Bid accepted</Text>
            </View>
            <View
              style={{ flexDirection: "column", marginTop: 85, marginLeft: 10 }}
            >
              <Text style={{ top: 3, fontWeight: "bold" }}>
                Parcel cleared by inspector of departure city
              </Text>
            </View>
            <View
              style={{ flexDirection: "column", marginTop: 90, marginLeft: 10 }}
            >
              <Text style={{ top: 3, fontWeight: "bold" }}>
                Parcel in transit
              </Text>
            </View>
            <View
              style={{ flexDirection: "column", marginTop: 90, marginLeft: 10 }}
            >
              <Text style={{ top: 3, fontWeight: "bold" }}>
                Parcel cleared by inspector of arrival city
              </Text>
            </View>
            <View
              style={{ flexDirection: "column", marginTop: 90, marginLeft: 10 }}
            >
              <Text style={{ top: 3, fontWeight: "bold" }}>
                Parcel collected by the receiver
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            height: 50,
            width: 200,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            alignSelf: "center",
          }}
          
        >
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerIcons: {
    width: 20,
    height: 20,
  },
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#47ADB8",
    padding: 5,
  },
  contentbox: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#44A5B0",
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  contentboxleft: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  contentboxright: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 3,
  },
  contentboxheading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
});

export default Status;
