import React, {useRef, useState} from "react";
import { View, StyleSheet, Text, ImageBackground, Button, Image, Platform, StatusBar, Animated, FlatList } from "react-native";
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

    slider: {

    }
  });

export default Dashboard;