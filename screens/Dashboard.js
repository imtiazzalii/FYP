import React, {useRef, useState} from "react";
import { View, StyleSheet, Text, ImageBackground, Button, Image, Platform, StatusBar, Animated, FlatList, Dimensions } from "react-native";
import Carousel from "./Carousel.js";

const Dashboard = () => {

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require("../assets/Dashboard/sidebar.png")} style={styles.headerIcons}/>
                <Text style={styles.headerText}>SWYFTBAGS</Text>
                <Image source={require("../assets/Dashboard/notif.png")} style={styles.headerIcons}/>
            </View>    
            <View style={styles.slider}>
              <Carousel />
            </View>
            <View style={styles.contentbox1}>
              <View style={styles.wallet}>
                <Image source={require("../assets/Dashboard/wallet.png")}/>
                <Text>Wallet</Text>
                <Image source={require("../assets/Dashboard/arrow.jpeg")}/>
              </View>
            </View>
            <View style={styles.contentbox2}>
              <Image source={require("../assets/Dashboard/history.png")}/>
              <Image source={require("../assets/Dashboard/chats.png")}/>
              
            </View>
            <View style={styles.contentbox3}>
              <Image source={require("../assets/Dashboard/currenttrips.png")}/>
              <Image source={require("../assets/Dashboard/newtrip.png")}/>
            </View>
            <View style={styles.footer}>
              <Text>swyftbags ltd.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    headerIcons: {
      width: 20,
      height: 20,
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
    },

    wallet: {
      flexDirection: "row",
      width: (2/3)*(Dimensions.get("window").width), 
      height: 35, 
      //marginLeft: ((1/3)/2)*(Dimensions.get("window").width),
      marginTop: 10,
      backgroundColor: "grey",
      borderRadius: 60,
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
      justifyContent: "flex-end",
      alignItems: "center",
    },
  });

export default Dashboard;