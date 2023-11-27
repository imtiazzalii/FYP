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
    
    
    return(
    <ImageBackground source={require('../assets/AllChats/Background.png')}
    style={ tw.style('h-full', {marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,})}>
    <ScrollView>
    <View style={styles.container}>
        
        {/* nav bar */}
        <View style={tw.style('flex-row','justify-between', 'bg-teal-900','items-center', 'px-4')}>
        <TouchableOpacity onPress={() => {
            navigation.openDrawer();
            }}><Image source={require("../assets/Dashboard/menu2.png")} style={styles.headerIcons}/></TouchableOpacity>
            <Text style={styles.headerText}>Notifications</Text>
            <Image source={require("../assets/Dashboard/bell2.png")} style={styles.headerIcons}/>
            </View>   
        




            {/* Notifications rounded border justify center teal 900*/}
            <TouchableOpacity onPress={() => navigation.navigate("Chat")}><View>
                <Text>Zaki Imran sent you a message</Text>
                <Text>8:00pm</Text>
            </View></TouchableOpacity>

            <View>
                <Text>You have a new bid!!!</Text>
                <Text>6:00pm</Text>
            </View>

            <View>
                <Text>Your bid has won!!!</Text>
                <Text>8:00pm</Text>
            </View>

            
            {/* footer */}
            <View style={tw.style("flex-row p-1 justify-evenly items-center bg-teal-900")}>
            <Text style={tw`text-white text-sm pr-4`}>swyftbags ltd.</Text>
            </View>

        </View>
    </ScrollView>
    </ImageBackground>
    );
   

        
};




const styles =StyleSheet.create({

    container: {    
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    //backgroundColor:"",
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
export default Notifications;