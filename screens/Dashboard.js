import React, {useRef, useState} from "react";
import { View, StyleSheet, Text, ImageBackground, Button, Image, Platform, StatusBar, Animated, FlatList, Dimensions } from "react-native";
import Carousel from "./Carousel.js";
import tw from 'twrnc';


const Dashboard = () => {

    return(
        <View style={styles.container}>
            <View style={tw.style('flex-row','justify-between', 'bg-teal-900','items-center', 'px-4')}>
                <Image source={require("../assets/Dashboard/menu2.png")} style={styles.headerIcons}/>
                <Text style={styles.headerText}>SWYFTBAGS</Text>
                <Image source={require("../assets/Dashboard/bell2.png")} style={styles.headerIcons}/>
            </View>    
            <View style={styles.slider}>
              <Carousel />
            </View>
            <View style={tw.style("flex-1 flex-row justify-center items-center")}>
               <View style={tw.style("flex-row w-2/3 h-8 mt-5 bg-white rounded-full")}>
               <Image style={tw.style("mt-1 ml-1")} source={require("../assets/Dashboard/wallet.png")} />
               <Text style={tw.style("mt-1 ml-1")}>Wallet</Text>
                <Image style={tw.style("ml-auto mt-2")} source={require("../assets/Dashboard/arrow.jpeg")} />
              </View>
            </View>
            
            <View style={tw.style("flex-1 flex-row justify-evenly items-center")}>
              <Image source={require("../assets/Dashboard/history.png")}/>
              <Image source={require("../assets/Dashboard/chats.png")}/>
              
            </View>
            <View style={tw.style("flex-1 flex-row justify-evenly items-center")}>
              <Image source={require("../assets/Dashboard/currenttrips.png")}/>
              <Image source={require("../assets/Dashboard/newtrip.png")}/>
            </View>
            <View style={tw.style("flex-row p-1 justify-evenly items-center bg-teal-900")}>
            <Text style={tw`text-white text-sm pr-4`}>swyftbags ltd.</Text>
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