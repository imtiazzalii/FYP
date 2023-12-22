import { View, StyleSheet, Text, ImageBackground, Button, Image, Platform, StatusBar, Animated, FlatList, Dimensions, TouchableOpacity, ScrollView, TextInput }  from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {useNavigation} from '@react-navigation/native';
import { useForm, Controller, handleSubmit } from "react-hook-form";
import Field from "./Field";
import tw from 'twrnc';
import { RollInRight } from "react-native-reanimated";
//import { TextInput } from "react-native-gesture-handler";


const Notifications = () =>{
    const flatlistRef = useRef();
    const navigation = useNavigation();
    const {control, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = (data) => console.log(data, "data");
    
    
    return (
      <View style={styles.flexContainer}>
      <ImageBackground source={require('../assets/AllChats/Background.png')}
           style={styles.imageBackground}>
          <ScrollView>
              <View style={styles.container}>
                  {/* Nav bar */}
                  <View style={styles.header}>
                      <TouchableOpacity onPress={() => navigation.openDrawer()}>
                          <Image source={require("../assets/Dashboard/menu2.png")} style={styles.headerIcons}/>
                      </TouchableOpacity>
                      <Text style={styles.headerText}>Notifications</Text>
                      <Image source={require("../assets/Dashboard/bell2.png")} style={styles.headerIcons}/>
                  </View>   
                  <ScrollView style={styles.container}>
                  {/* Notification items */}
                  <View style={styles.notificationContainer}>
                      <TouchableOpacity onPress={() => navigation.navigate("Chat")} style={styles.notificationItem}>
                          <Text style={styles.notificationText}>Zaki Imran sent you a message.</Text>
                          <Text style={styles.notificationTime}>8:00pm</Text>
                      </TouchableOpacity>

                      <View style={styles.notificationItem}>
                          <Text style={styles.notificationText}>You have a new bid!!</Text>
                          <Text style={styles.notificationTime}>6:00pm</Text>
                      </View>

                      <View style={styles.notificationItem}>
                          <Text style={styles.notificationText}>Your bid has won!!</Text>
                          <Text style={styles.notificationTime}>5:40pm</Text>
                      </View>
                  </View>
                  </ScrollView>
                  {/* Footer */}
                  <View style={styles.footer}>
                      <Text style={styles.footerText}>swyftbags ltd.</Text>
                  </View>
              </View>
          </ScrollView>
      </ImageBackground>
      </View>
  );
};




const styles = StyleSheet.create({
  flexContainer: {
    flex: 1, // This will fill the height of the screen
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
},
imageBackground: {
    flex: 1, // This will fill the flexContainer
    width: '100%', // Ensure it fills the width
},
container: {
    flex: 1, // Ensures the scroll view fills the space between header and footer
},
header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1D4246',
    alignItems: 'center',
    paddingHorizontal: '3%',
    paddingTop: '2%',
    paddingBottom: '2%',
},
  headerIcons: {
    width: 20,
    height: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color:'#47ADB8',
    padding:5,

  },
  notificationContainer: {
      marginTop: 16,
      paddingHorizontal: 16,
  },
  notificationItem: {
      backgroundColor: '#1D4246',
      borderRadius: 10,
      padding: 16,
      marginBottom: 16,
  },
  notificationText: {
      fontSize: 16,
      color: 'white',
      marginBottom: 5,
  },
  notificationTime: {
      fontSize: 14,
      color: 'white',
      alignSelf: 'flex-end',
  },
  footer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#1D4246',
      padding: 10,
  },
  footerText: {
      color: 'white',
      fontSize: 12,
  },
});

export default Notifications;