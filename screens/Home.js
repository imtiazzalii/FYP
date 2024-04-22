import React, { useEffect } from 'react';
import { View, StyleSheet, Text, ImageBackground, Button, Image, Platform, StatusBar, Animated, FlatList, Dimensions } from "react-native";
import Background from "./background";
import * as Notifications from 'expo-notifications';
import tw from 'twrnc';
import Btn from "./btn";


async function registerForPushNotificationsAsync() {
  let token;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;

  // Here you can send the token to your backend to store it for later use
  console.log(token);

  return token;
}

const Home = (props) => {

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  
  return (
    <Background>
      <View style={tw.style('mx-6','items-center',{marginTop:Dimensions.get('window').height /3,})}>
        <Text style={tw.style('text-white', 'text-5xl' , 'font-bold', 'shadow-md', 'mb-2' ,'my-2')}>
          SWYFTBAGS
        </Text>
     
        <Text style={tw.style('text-black','text-center','text-5xl','font-bold')}>
          YOUR BAGS, ON THE{'\n'} GO!
        </Text>
        <View style={tw.style('flex-row','justify-center','my-8')}>
          <Btn
            bgColor="#A9C1C4"
            textColor="black"
            btnLabel="Signup"
            Press={() => props.navigation.navigate("Signup")}
          />
          <Btn
            bgColor="#47ADB8"
            textColor="#000101"
            btnLabel="Login"
            Press={() => props.navigation.navigate("Login")}
          />
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 40,
    marginVertical: 180,
    alignItems: "center",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  title: {
    color: 'white',
    fontSize: 52,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
  },
  subtitle: {
    color: 'black',
    fontSize: 46,
    fontWeight: 'bold',
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 40,
  },
});

export default Home;
