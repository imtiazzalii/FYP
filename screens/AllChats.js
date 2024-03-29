import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const AllChats = () => {
  const navigation = useNavigation();
  const [acceptedFriends, setAcceptedFriends] = useState([]);

  const getData = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(token);

    await axios
      .get(Constants.expoConfig.extra.IP_ADDRESS + `/accepted-friends/${token}`)
      .then((response) => {
        setAcceptedFriends(response.data.data);
        console.log(acceptedFriends);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  useEffect(() => {
    getData();
  }, []);
  
  return (
    <ImageBackground
      source={require("../assets/AllChats/Background.png")}
      style={tw.style("h-full", {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      })}
    >
      <ScrollView>
        <View style={styles.container}>
          {/* NavBar */}
          <View style={styles.navBar}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={require("../assets/Dashboard/menu2.png")}
                style={styles.headerIcons}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>Chats</Text>
            <Image
              source={require("../assets/Dashboard/bell2.png")}
              style={styles.headerIcons}
            />
          </View>

          {/* Chat Items */}
          {acceptedFriends.map((item, index) => (<View key={index} style={styles.chatItemsContainer}>
            {/* First Chat Item */}
            <TouchableOpacity 
              style={styles.chatItem}
              onPress={() => navigation.navigate("Chat")}
            >
              <Image
                source={{ uri: item.profilePic }}
                style={styles.userIcon}
              />
              <View style={styles.chatTextContainer}>
                <Text style={styles.userName}>{item.name}</Text>
                <View style={styles.timeAndStatusContainer}>
                  <Text style={styles.messageText}>
                    Hello Ahad how much space do you have?
                  </Text>
                  <Image
                    source={require("../assets/AllChats/Tick.png")}
                    style={styles.statusIcon}
                  />
                </View>
                <Text style={styles.messageTime}>8:00pm</Text>
              </View>
            </TouchableOpacity>
          {/* Footer */}
        </View>))}
        </View>
      </ScrollView>
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>swyftbags ltd.</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent", // Assuming the ImageBackground covers the entire container
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1D4246", // Adjust the color to match your design
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerIcons: {
    width: 24,
    height: 24,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#47ADB8", // Adjust the color to match your design
  },
  chatItemsContainer: {
    paddingTop: "4%",
  },
  chatItem: {
    flexDirection: "row",
    backgroundColor: "#1D4246", // Use the background color of your chat item
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 10,
    alignItems: "center",
  },
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatTextContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white", // Use your username color here
    marginBottom: 5,
    marginTop: 5,
  },
  messageText: {
    fontSize: 14,
    color: "white",
    marginRight: 4, // Add space for the tick icon
  },
  timeAndStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageTime: {
    fontSize: 12,
    color: "white", // Use your message time color here
    marginRight: 4, // Add space between time and tick icon
  },
  statusIcon: {
    width: 16,
    height: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1D4246", // Adjust the color to match your design
    padding: 8,
    marginBottom: "9%",
  },
  footerText: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
});

export default AllChats;
