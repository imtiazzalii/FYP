import React, { useRef, useState, useEffect } from "react";
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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants';
import Carousel from "./Carousel";
import tw from "twrnc";

const Dashboard = (props) => {
  const navigation = useNavigation();

  const checkAndCreateWallet = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const token = await AsyncStorage.getItem('token');
    if (userId && token) {
      try {
        const response = await axios.post(`${Constants.expoConfig.extra.IP_ADDRESS}/wallet/create`, {
          userId: userId
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response.data.message); // Log the server response
      } catch (error) {
        console.error("Failed to check/create wallet:", error);
        Alert.alert("Error", "Could not check/create wallet");
      }
    }
  };

  useEffect(() => {
    checkAndCreateWallet();
  }, []);


  return (
    <ImageBackground
      source={require("../assets/Dashboard/dashbg.jpeg")}
      style={tw.style("h-full")}
    >
      <View style={styles.container}>
        <View
          style={tw.style(
            "flex-row",
            "justify-between",
            "bg-teal-900",
            "items-center",
            "px-1",
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

          <Text style={styles.headerText}>SWYFTBAGS</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
          >
            <Image
              source={require("../assets/Dashboard/bell2.png")}
              style={styles.headerIcons}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.slider}>
          <Carousel />
        </View>

        <View style={tw.style("flex-1 flex-row justify-center items-center")}>
          <View
            style={tw.style("flex-row w-2/3 h-8 mt-5 bg-white rounded-full")}
          >
            <Image
              style={tw.style("mt-1 ml-1")}
              source={require("../assets/Dashboard/wallet.png")}
            />
            <Text style={tw.style("mt-1 ml-1")}>Wallet</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Wallet")}>
              <Image
                style={tw.style("ml-38 mt-2")}
                source={require("../assets/Dashboard/arrow.jpeg")}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={tw.style("flex-1 flex-row justify-evenly items-center")}>
          <TouchableOpacity onPress={() => navigation.navigate("OrderHistory")}>
            <Image source={require("../assets/Dashboard/history.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("AllChats")}>
            <Image source={require("../assets/Dashboard/chats.png")} />
          </TouchableOpacity>
        </View>
        <View style={tw.style("flex-1 flex-row justify-evenly items-center")}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CurrentTrips");
            }}
          >
            <Image source={require("../assets/Dashboard/currenttrips.png")} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("NewTrip");
            }}
          >
            <Image source={require("../assets/Dashboard/newtrip.png")} />
          </TouchableOpacity>
        </View>
        <View
          style={tw.style(
            "flex-row p-1 justify-evenly items-center bg-teal-900"
          )}
        >
          <Text style={tw`text-white text-sm pr-4`}>swyftbags ltd.</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  imageBackground: {
    height: "100%",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#47ADB8",
    padding: 5,
  },

  wallet: {
    flexDirection: "row",
    width: (2 / 3) * Dimensions.get("window").width,
    height: 35,
    //marginLeft: ((1/3)/2)*(Dimensions.get("window").width),
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 60,
  },
  walletIcon: {
    marginTop: 5,
  },

  walletText: {
    marginTop: 5,
    marginLeft: 2,
  },

  arrow: {
    marginLeft: 180,
    marginTop: 10,
  },
  contentbox1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  contentbox2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  contentbox3: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    padding: 4,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#1D4246",
  },
  footerText: {
    color: "white",
    fontSize: 12,
    textAlign: "right",
    paddingLeft: 300,
  },
});

export default Dashboard;
