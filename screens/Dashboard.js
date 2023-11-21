import React, {useRef, useState} from "react";
import { View, StyleSheet, Text, ImageBackground, Button, Image, Platform, StatusBar, Animated, FlatList, Dimensions, TouchableOpacity } from "react-native";
import {useNavigation} from '@react-navigation/native';
import Carousel from "./Carousel.js";

const Dashboard = (props) => {
    const navigation = useNavigation()
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                  navigation.openDrawer();
                }}><Image source={require("../assets/Dashboard/sidebar.png")} style={styles.headerIcons}/></TouchableOpacity>
                <Text style={styles.headerText}>SWYFTBAGS</Text>
                <Image source={require("../assets/Dashboard/notif.png")} style={styles.headerIcons}/>
            </View>    
            <View style={styles.slider}>
              <Carousel />
            </View>
            <View style={styles.contentbox1}>
              <View style={styles.wallet}>
                <Image style={styles.walletIcon} source={require("../assets/Dashboard/wallet.png")}/>
                <Text style={styles.walletText}>Wallet</Text>
                <Image style={styles.arrow} source={require("../assets/Dashboard/arrow.jpeg")}/>
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
              <Text style={styles.footerText}>swyftbags ltd.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      backgroundColor:"#BCE3E7",
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor:'#1D4246',
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
      color:'#47ADB8',
      padding:5,

    },

    wallet: {
      flexDirection: "row",
      width: (2/3)*(Dimensions.get("window").width), 
      height: 35, 
      //marginLeft: ((1/3)/2)*(Dimensions.get("window").width),
      marginTop: 10,
      backgroundColor: "white",
      borderRadius: 60,
    },
    walletIcon: {
      marginTop:5,
    },

    walletText: {
      marginTop:5,
      marginLeft:2, 
    },

    arrow: {
      marginLeft:180,
      marginTop:10,
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
      padding:4,
      justifyContent: "space-evenly",
      alignItems: "center",
      backgroundColor:'#1D4246',
    },
    footerText: {
      color:'white',
      fontSize:12,
      textAlign:'right',
      paddingLeft:300,
    },
  });

export default Dashboard;