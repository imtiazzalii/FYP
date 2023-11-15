import React from "react";
import { View, StyleSheet, Text, ImageBackground, Button, Image, Platform, StatusBar, Animated, FlatList, Dimensions } from "react-native";
import Btn from "./btn";

const Routing = (props) => {
    return(
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
                btnLabel="NewTrip"
                Press={() => props.navigation.navigate("NewTrip")}
            />
        </View>
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