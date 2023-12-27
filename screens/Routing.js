import React from "react";
import { View, StyleSheet, Text, ImageBackground, Button, Image, Platform, StatusBar, Animated, FlatList, Dimensions, ScrollView } from "react-native";
import Btn from "./btn";

const Routing = (props) => {
    return(
        <ScrollView>
        <View style={styles.buttons}>
            
            <Btn
                bgColor="#47ADB8"
                textColor="black"
                btnLabel="Home"
                Press={() => props.navigation.navigate("Home")}
            />
            <Btn
                bgColor="#47ADB8"
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
            <Btn
                bgColor="#47ADB8"
                textColor="#000101"
                btnLabel="Dashboard"
                Press={() => props.navigation.navigate("Dashboard")}
            />

            <Btn
                bgColor="#47ADB8"
                textColor="black"
                btnLabel="New Trip"
                Press={() => props.navigation.navigate("NewTrip")}
            />
            <Btn
                bgColor="#47ADB8"
                textColor="black"
                btnLabel="Order History"
                Press={() => props.navigation.navigate("OrderHistory")}
            />
            <Btn
                bgColor="#47ADB8"
                textColor="black"
                btnLabel="Current Trips"
                Press={() => props.navigation.navigate("CurrentTrips")}
            />

            <Btn
                bgColor="#47ADB8"
                textColor="black"
                btnLabel="Chat"
                Press={() => props.navigation.navigate("Chat")}
            />

            <Btn
                bgColor="#47ADB8"
                textColor="black"
                btnLabel="AllChats"
                Press={() => props.navigation.navigate("AllChats")}
            />
            <Btn
                bgColor="#47ADB8"
                textColor="black"
                btnLabel="Wallet"
                Press={() => props.navigation.navigate("Wallet")}
            />

            <Btn
                bgColor="#47ADB8"
                textColor="black"
                btnLabel="Notifications"
                Press={() => props.navigation.navigate("Notifications")}
            />
             <Btn
                bgColor="#47ADB8"
                textColor="black"
                btnLabel="EditProfile"
                Press={() => props.navigation.navigate("EditProfile")}
            />

            <Btn
                bgColor="#47ADB8"
                textColor="black"
                btnLabel="ChangePassword"
                Press={() => props.navigation.navigate("ChangePassword")}
            />

        <Btn
                bgColor="#47ADB8"
                textColor="black"
                btnLabel="Status"
                Press={() => props.navigation.navigate("Status")}
            />
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    buttons: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
});

export default Routing;